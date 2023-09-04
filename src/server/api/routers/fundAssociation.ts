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
});
