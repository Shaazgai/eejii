import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

import { UserType } from '@/lib/db/enums';
import { sendNotification } from '../helper/notification';
import { createTRPCRouter, privateProcedure } from '../trpc';

export const fundAssociationRouter = createTRPCRouter({
  findAll: privateProcedure
    .input(
      z.object({
        type: z.string().nullish(),
        status: z.string().nullish(),
        userId: z.string().nullish(),
        fundsOwnerId: z.string().nullish(),
        fundId: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      let query = ctx.db
        .selectFrom('FundAssociation')
        .select([
          'FundAssociation.id',
          'FundAssociation.type',
          'FundAssociation.userId',
          'FundAssociation.status',
          'FundAssociation.fundraisingId',
        ])
        .select(eb => [
          jsonObjectFrom(
            eb
              .selectFrom('Fundraising')
              .selectAll()
              .whereRef('Fundraising.id', '=', 'FundAssociation.fundraisingId')
          ).as('Fundraising'),
        ]);
      if (input.type) {
        query = query.where('FundAssociation.type', '=', input.type);
      }

      if (input.status) {
        query = query.where('FundAssociation.status', '=', input.status);
      }

      if (input.userId) {
        query = query.where('FundAssociation.userId', '=', input.userId);
      }

      if (input.fundsOwnerId) {
        query = query
          .leftJoin('Fundraising', join =>
            join.onRef('Fundraising.id', '=', 'FundAssociation.fundraisingId')
          )
          .where('Fundraising.ownerId', '=', input.fundsOwnerId);
      }

      if (input.fundId) {
        query = query.where('FundAssociation.fundraisingId', '=', input.fundId);
      }

      const result = await query.execute();
      return result;
    }),
  handleFundRequest: privateProcedure // Owner of the fund will handle the request of it's invitation
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const fundAssociation = await ctx.db
        .updateTable('FundAssociation')
        .where('id', '=', input.id)
        .set({
          status: input.status,
        })
        .returning(expressionBuilder => [
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('Fundraising')
              .select(['id', 'title'])
              .select(eb => [
                jsonObjectFrom(
                  eb
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'Fundraising.ownerId')
                ).as('Owner'),
              ])
              .whereRef('Fundraising.id', '=', 'FundAssociation.fundraisingId')
          ).as('Fundraising'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'FundAssociation.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();

      const fundraisingTitle = fundAssociation.Fundraising
        ? fundAssociation.Fundraising.title
        : 'your project';
      const fundId = fundAssociation.Fundraising
        ? fundAssociation.Fundraising.id
        : null;

      sendNotification({
        title: `Your request to join ${fundraisingTitle} has been ${
          input.status === 'APPROVED' ? 'approved' : 'denied'
        }`,
        body: null,
        link: `/fundraising/${fundId}`,
        receiverId: fundAssociation.User?.id as string,
        senderId: ctx.userId,
        type: 'join_request',
      });
      return { message: 'Success' };
    }),
  inviteToFundraising: privateProcedure // Owner of the fund will invite partner
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const fundAssociation = await ctx.db
        .insertInto('FundAssociation')
        .values({
          status: 'pending',
          type: 'invitation',
          userId: input.userId,
          fundraisingId: input.id,
        })
        .returning(expressionBuilder => [
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('Fundraising')
              .select(['id', 'title', 'description'])
              .select(eb => [
                jsonObjectFrom(
                  eb
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'Fundraising.ownerId')
                ).as('Owner'),
              ])
              .whereRef('Fundraising.id', '=', 'FundAssociation.fundraisingId')
          ).as('Fundraising'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'FundAssociation.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();
      const ownerName = fundAssociation.Fundraising?.Owner
        ? fundAssociation.Fundraising.Owner.organization
        : 'User';
      const fundraisingTitle = fundAssociation.Fundraising
        ? fundAssociation.Fundraising.title
        : 'your project';
      const fundDetail = fundAssociation.Fundraising
        ? fundAssociation.Fundraising.description
        : null;

      const link =
        fundAssociation.User?.type === UserType.USER_PARTNER
          ? '/p/collabration'
          : fundAssociation.User?.type === UserType.USER_SUPPORTER
            ? '/s/collabration'
            : 'unknown';
      sendNotification({
        title: `'${ownerName}' wants you to join '${fundraisingTitle}'`,
        body: fundDetail,
        link: link,
        receiverId: input.userId as string,
        senderId: ctx.userId,
        type: 'invite_request',
      });
      return { message: 'Success' };
    }),
  sendRequest: privateProcedure
    .input(z.object({ fundraisingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const fundAssociation = await ctx.db
        .insertInto('FundAssociation')
        .values(({ selectFrom }) => ({
          type: 'request',
          fundraisingId: selectFrom('Fundraising')
            .select('id')
            .where('Fundraising.id', '=', input.fundraisingId),
          userId: selectFrom('User')
            .select('id')
            .where('User.id', '=', ctx.userId),
          status: 'pending',
        }))
        .returning(expressionBuilder => [
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('Fundraising')
              .select(['id', 'title'])
              .select(eb => [
                jsonObjectFrom(
                  eb
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'Fundraising.ownerId')
                ).as('Owner'),
              ])
              .whereRef('Fundraising.id', '=', 'FundAssociation.fundraisingId')
          ).as('Fundraising'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'FundAssociation.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();
      const userEmail = fundAssociation.User
        ? fundAssociation.User.email
        : 'User';
      const fundraisingTitle = fundAssociation.Fundraising
        ? fundAssociation.Fundraising.title
        : 'your project';
      const fundId = fundAssociation.Fundraising
        ? fundAssociation.Fundraising.id
        : null;
      sendNotification({
        title: `${userEmail} wants to join ${fundraisingTitle}`,
        body: null,
        link: `/${
          fundAssociation.Fundraising?.Owner?.type === UserType.USER_PARTNER
            ? 'p'
            : 's'
        }/manage/${fundId}`,
        receiverId: fundAssociation.Fundraising?.Owner?.id as string,
        senderId: ctx.userId,
        type: 'join_request',
      });
      return fundAssociation;
    }),
});
