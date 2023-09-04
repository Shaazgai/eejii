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

      console.log(input)
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
});
