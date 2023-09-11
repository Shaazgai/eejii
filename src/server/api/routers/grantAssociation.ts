import { z } from 'zod';

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
      let query = ctx.db.selectFrom('GrantAssociation').selectAll();

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
      const grantFundraising = await ctx.db
        .selectFrom('GrantFundraising')
        .select('id')
        .where('id', '=', input.grantFundraisingId)
        .executeTakeFirstOrThrow();

      const grantAssociation = await ctx.db
        .insertInto('GrantAssociation')
        .values(({ selectFrom }) => ({
          grantId: grantFundraising.id,
          userId: selectFrom('User').where('User.id', '=', ctx.userId),
          status: 'pending',
        }))
        .returningAll()
        .executeTakeFirstOrThrow();
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
      ctx.db
        .insertInto('GrantAssociation')
        .values({
          status: 'pending',
          type: 'invitation',
          userId: input.userId,
          grantId: input.id,
        })
        .returning('id')
        .executeTakeFirstOrThrow();
      return { message: 'Success' };
    }),
  handleGrantRequest: privateProcedure // Owner of the grant will handle the request of it's invitation
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      ctx.db
        .updateTable('GrantAssociation')
        .where('id', '=', input.id)
        .set({
          status: input.status,
        })
        .returning('id')
        .executeTakeFirstOrThrow();
      return { message: 'Success' };
    }),
});
