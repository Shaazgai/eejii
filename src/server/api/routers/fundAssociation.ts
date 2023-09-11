import { z } from 'zod';

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
      let query = ctx.db.selectFrom('FundAssociation').selectAll();

      console.log(input)
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
      ctx.db
        .updateTable('FundAssociation')
        .where('id', '=', input.id)
        .set({
          status: input.status,
        })
        .returning('id')
        .execute();
      return { message: 'Success' };
    }),
  inviteToFundraising: privateProcedure // Owner of the fund will invite partner
    .input(
      z.object({
        id: z.string(),
        userId: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      ctx.db
        .insertInto('FundAssociation')
        .values({
          status: 'pending',
          type: 'invitation',
          userId: input.userId,
          fundraisingId: input.id,
        })
        .returning('id')
        .executeTakeFirstOrThrow();
      return { message: 'Success' };
    }),
  sendRequest: privateProcedure
    .input(z.object({ fundraisingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const fundraising = await ctx.db
        .selectFrom('Fundraising')
        .select('id')
        .where('id', '=', input.fundraisingId)
        .executeTakeFirstOrThrow();

      const fundraisingPartner = await ctx.db
        .insertInto('FundAssociation')
        .values(({ selectFrom }) => ({
          fundraisingId: fundraising.id,
          userId: selectFrom('User').where('User.id', '=', ctx.userId),
          status: 'pending',
        }))
        .returningAll()
        .executeTakeFirstOrThrow();
      return fundraisingPartner;
    }),
});
