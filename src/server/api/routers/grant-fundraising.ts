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
      const supporter = await ctx.db
        .selectFrom('Supporter')
        .selectAll('Supporter')
        .innerJoin('User', join =>
          join.onRef('User.id', '=', 'Supporter.userId')
        )
        .where('User.externalId', '=', ctx.userId)
        .executeTakeFirstOrThrow();

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
          ownerId: supporter.id,
        })
        .returning(['id'])
        .executeTakeFirstOrThrow();
      // eslint-disable-next-line unused-imports/no-unused-vars
      const categoryGrantFund = await ctx.db
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

      if (ctx.userType === 'partner') {
        const grantFundraisingPartner = await ctx.db
          .insertInto('GrantFundraisingPartner')
          .values(({ selectFrom }) => ({
            grantFundraisingId: grantFundraising.id,
            partnerId: selectFrom('Partner')
              .leftJoin('User', 'User.id', 'Partner.userId')
              .where('User.externalId', '=', ctx.userId),
            status: 'pending',
          }))
          .returningAll()
          .executeTakeFirstOrThrow();
        return grantFundraisingPartner;
      } else if (ctx.userType === 'supporter') {
        const grantFundraisingSupporter = await ctx.db
          .insertInto('GrantFundraisingSupporter')
          .values(({ selectFrom }) => ({
            grantFundraisingId: grantFundraising.id,
            supporterId: selectFrom('Supporter')
              .leftJoin('User', 'User.id', 'Supporter.userId')
              .where('User.externalId', '=', ctx.userId),
            status: 'pending',
          }))
          .returningAll()
          .executeTakeFirstOrThrow();
        return grantFundraisingSupporter;
      }

      return { message: 'User not supporter or partner' };
    }),
});
