import { z } from 'zod';

import { fundraisingSchema } from '@/lib/validation/fundraising-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const grantFundraisingRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const grantFundraising = await ctx.db
      .selectFrom('GrantFundraising')
      .selectAll()
      .execute();
    return grantFundraising;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const grantFundraising = await ctx.db
        .selectFrom('GrantFundraising')
        .where('id', '=', input.id)
        .selectAll()
        .executeTakeFirstOrThrow();
      return grantFundraising;
    }),

  create: privateProcedure
    .input(fundraisingSchema)
    .mutation(async ({ input, ctx }) => {
      const fund = await ctx.db
        .insertInto('GrantFundraising')
        .values({
          title: input.title,
          description: input.description,
          contact: {
            primary_phone: input.primary_phone,
            secondary_phone: input.secondary_phone,
            email_1: input.email_1,
            email_2: input.email_2,
          },
          location: input.location,
          startTime: input.startTime,
          endTime: input.endTime,
          goalAmount: input.goalAmount,
          currentAmount: input.currentAmount,
          ownerId: ctx.userId,
        })
        .returning(['id'])
        .executeTakeFirstOrThrow();

      await ctx.db
        .insertInto('CategoryGrantFundraising')
        .values(({ selectFrom }) => ({
          categoryId: selectFrom('Category')
            .where('Category.id', '=', input.mainCategory)
            .select('Category.id'),
          grantFundraisingId: fund.id,
        }))
        .execute();
      return fund;
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
});
