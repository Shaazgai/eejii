import { z } from 'zod';

import { createTRPCRouter, privateProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getMyDonations: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
      })
    )
    .query(async ({ ctx }) => {
      // const limit = input.limit ?? 50;

      const query = await ctx.db
        .selectFrom('Donation')
        .selectAll()
        .leftJoin('User', 'User.id', 'Donation.userId')
        .leftJoin('Payment', join =>
          join.onRef('Payment.donationId', '=', 'Donation.id')
        )
        .where('User.externalId', '=', ctx.userId)
        .where('Payment.status', '=', 'PAID')
        .execute();
      return query;
    }),
});
