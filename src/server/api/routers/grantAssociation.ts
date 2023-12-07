import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

import { UserType } from '@/lib/db/enums';
import { sendNotification } from '../helper/notification';
import { createTRPCRouter, privateProcedure } from '../trpc';

export const grantAssociationRouter = createTRPCRouter({
  findAll: privateProcedure
    .input(
      z.object({
        type: z.string().nullish(),
        status: z.string().nullish(),
        userId: z.string().nullish(),
        grantsOwnerId: z.string().nullish(),
        grantId: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      let query = ctx.db
        .selectFrom('GrantAssociation')
        .select([
          'GrantAssociation.id',
          'GrantAssociation.type',
          'GrantAssociation.userId',
          'GrantAssociation.status',
          'GrantAssociation.grantId',
        ])
        .select(eb => [
          jsonObjectFrom(
            eb
              .selectFrom('GrantFundraising')
              .selectAll()
              .whereRef('GrantFundraising.id', '=', 'GrantAssociation.grantId')
          ).as('Grant'),
        ]);
      if (input.type) {
        query = query.where('type', '=', input.type);
      }

      if (input.status) {
        query = query.where('status', '=', input.status);
      }

      if (input.userId) {
        query = query.where('userId', '=', input.userId);
      }

      if (input.grantsOwnerId) {
        query = query
          .leftJoin('GrantFundraising', join =>
            join.onRef('GrantFundraising.id', '=', 'GrantAssociation.grantId')
          )
          .where('GrantFundraising.ownerId', '=', input.grantsOwnerId);
      }

      if (input.grantId) {
        query = query.where('GrantAssociation.grantId', '=', input.grantId);
      }

      const result = await query.execute();
      return result;
    }),
  sendRequest: privateProcedure
    .input(z.object({ grantFundraisingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const grantAssociation = await ctx.db
        .insertInto('GrantAssociation')
        .values(({ selectFrom }) => ({
          grantId: selectFrom('GrantFundraising')
            .select('id')
            .where('GrantAssociation.id', '=', input.grantFundraisingId),
          userId: selectFrom('User')
            .select('id')
            .where('User.id', '=', ctx.userId),
          status: 'pending',
        }))
        .returning(expressionBuilder => [
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('GrantFundraising')
              .select(['id', 'title'])
              .select(eb => [
                jsonObjectFrom(
                  eb
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'GrantFundraising.ownerId')
                ).as('Owner'),
              ])
              .whereRef('GrantFundraising.id', '=', 'GrantAssociation.grantId')
          ).as('GrantFundraising'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'GrantAssociation.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();
      const userEmail = grantAssociation.User
        ? grantAssociation.User.email
        : 'User';
      const title = grantAssociation.GrantFundraising
        ? grantAssociation.GrantFundraising.title
        : 'your project';
      const grantId = grantAssociation.GrantFundraising
        ? grantAssociation.GrantFundraising.id
        : null;
      sendNotification({
        title: `${userEmail} wants to join ${title}`,
        body: null,
        link: `/${
          grantAssociation.GrantFundraising?.Owner?.type ===
          UserType.USER_PARTNER
            ? 'p'
            : 's'
        }/manage/${grantId}`,
        receiverId: grantAssociation.GrantFundraising?.Owner?.id as string,
        senderId: ctx.userId,
        type: 'join_request',
      });
      return grantAssociation;
    }),
  inviteToGrant: privateProcedure // Owner of the grant will invite partner
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const grantAssociation = await ctx.db
        .insertInto('GrantAssociation')
        .values({
          status: 'pending',
          type: 'invitation',
          userId: input.userId,
          grantId: input.id,
        })
        .returning(expressionBuilder => [
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('GrantFundraising')
              .select(['id', 'title', 'description'])
              .select(eb => [
                jsonObjectFrom(
                  eb
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'GrantFundraising.ownerId')
                ).as('Owner'),
              ])
              .whereRef('GrantFundraising.id', '=', 'GrantAssociation.grantId')
          ).as('GrantFundraising'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'GrantAssociation.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();

      const ownerName = grantAssociation.GrantFundraising?.Owner
        ? grantAssociation.GrantFundraising.Owner.organization
        : 'User';
      const title = grantAssociation.GrantFundraising
        ? grantAssociation.GrantFundraising.title
        : 'your project';
      const detail = grantAssociation.GrantFundraising
        ? grantAssociation.GrantFundraising.description
        : null;

      const link =
        grantAssociation.User?.type === UserType.USER_PARTNER
          ? '/p/collabration'
          : grantAssociation.User?.type === UserType.USER_SUPPORTER
            ? '/s/collabration'
            : null;
      sendNotification({
        title: `'${ownerName}' wants you to join '${title}'`,
        body: detail,
        link: link,
        receiverId: input.userId as string,
        senderId: ctx.userId,
        type: 'invite_request',
      });
      return { message: 'Success' };
    }),
  handleGrantRequest: privateProcedure // Owner of the grant will handle the request of it's invitation
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const grantAssociation = await ctx.db
        .updateTable('GrantAssociation')
        .where('id', '=', input.id)
        .set({
          status: input.status,
        })
        .returning(expressionBuilder => [
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('GrantFundraising')
              .select(['id', 'title', 'description'])
              .select(eb => [
                jsonObjectFrom(
                  eb
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'GrantFundraising.ownerId')
                ).as('Owner'),
              ])
              .whereRef('GrantFundraising.id', '=', 'GrantAssociation.grantId')
          ).as('GrantFundraising'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'GrantAssociation.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();
      const title = grantAssociation.GrantFundraising
        ? grantAssociation.GrantFundraising.title
        : 'your project';
      const grantId = grantAssociation.GrantFundraising
        ? grantAssociation.GrantFundraising.id
        : null;

      sendNotification({
        title: `Your request to join ${title} has been ${
          input.status === 'APPROVED' ? 'approved' : 'denied'
        }`,
        body: null,
        link: `/grant-fundraising/${grantId}`,
        receiverId: grantAssociation.User?.id as string,
        senderId: ctx.userId,
        type: 'join_request',
      });
      return { message: 'Success' };
    }),
});
