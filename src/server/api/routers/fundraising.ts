import { sql } from 'kysely';
import { z } from 'zod';

import { fundraisingSchema } from '@/lib/validation/fundraising-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const fundraisingRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const fundraising = await ctx.db
      .selectFrom('Fundraising')
      .selectAll()
      .execute();
    return fundraising;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const fundraising = await ctx.db
        .selectFrom('Fundraising')
        .where('id', '=', input.id)
        .selectAll()
        .executeTakeFirstOrThrow();
      return fundraising;
    }),
  getMyCollaborated: privateProcedure.query(async ({ ctx }) => {
    const fundraising = await ctx.db
      .selectFrom('Fundraising')
      .selectAll('Fundraising')
      .leftJoin('FundraisingPartner', join =>
        join.onRef('FundraisingPartner.fundraisingId', '=', 'Fundraising.id')
      )
      .leftJoin('Partner', join =>
        join.onRef('Partner.id', '=', 'FundraisingPartner.partnerId')
      )
      .leftJoin('User', join => join.onRef('Partner.userId', '=', 'User.id'))
      .where('User.externalId', '=', ctx.userId)
      .where('FundraisingPartner.status', '=', 'approved')
      .execute();
    console.log(fundraising);
    return fundraising;
  }),
  getMyPending: privateProcedure.query(async ({ ctx }) => {
    const fundraising = await ctx.db
      .selectFrom('Fundraising')
      .selectAll('Fundraising')
      .leftJoin('FundraisingPartner', join =>
        join.onRef('FundraisingPartner.fundraisingId', '=', 'Fundraising.id')
      )
      .leftJoin('Partner', join =>
        join.onRef('Partner.id', '=', 'FundraisingPartner.partnerId')
      )
      .leftJoin('User', join => join.onRef('Partner.userId', '=', 'User.id'))
      .where('User.externalId', '=', ctx.userId)
      .where('FundraisingPartner.status', '=', 'pending')
      .execute();
    // console.log(fundraising);
    return fundraising;
  }),
  getNotRelated: privateProcedure.query(async ({ ctx }) => {
    const query = await sql`
        SELECT f.* FROM Fundraising f 
        LEFT JOIN FundraisingPartner fp ON fp.fundraisingId = f.id
        WHERE fp.partnerId != ${sql.raw(
          `(SELECT p1.id FROM Partner p1 LEFT JOIN User u ON u.id = p1.userId WHERE u.externalId = "${ctx.userId}")`
        )} OR fp.partnerId IS NULL
        AND f.partnerId != ${sql.raw(
          `(SELECT p1.id FROM Partner p1 LEFT JOIN User u ON u.id = p1.userId WHERE u.externalId = "${ctx.userId}")`
        )}
      `.execute(ctx.db);
    console.log(query.rows);
    return query.rows;
  }),
  create: privateProcedure
    .input(fundraisingSchema)
    .mutation(async ({ input, ctx }) => {
      const partner = await ctx.db
        .selectFrom('Partner')
        .selectAll('Partner')
        .innerJoin('User', join => join.onRef('User.id', '=', 'Partner.userId'))
        .where('User.externalId', '=', ctx.userId)
        .executeTakeFirstOrThrow();

      const fund = await ctx.db
        .insertInto('Fundraising')
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
          partnerId: partner.id,
        })
        .returning(['id'])
        .executeTakeFirstOrThrow();
      // eslint-disable-next-line unused-imports/no-unused-vars
      const categoryFund = await ctx.db
        .insertInto('CategoryFundraising')
        .values(({ selectFrom }) => ({
          categoryId: selectFrom('Category')
            .where('Category.id', '=', input.mainCategory)
            .select('Category.id'),
          fundraisingId: fund.id,
        }))
        .executeTakeFirstOrThrow();
      return fund;
    }),
  sendRequest: privateProcedure
    .input(z.object({ fundraisingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const fundraising = await ctx.db
        .selectFrom('Fundraising')
        .select('id')
        .where('id', '=', input.fundraisingId)
        .executeTakeFirstOrThrow();

      if (ctx.userType === 'partner') {
        const fundraisingPartner = await ctx.db
          .insertInto('FundraisingPartner')
          .values(({ selectFrom }) => ({
            fundraisingId: fundraising.id,
            partnerId: selectFrom('Partner')
              .leftJoin('User', 'User.id', 'Partner.userId')
              .where('User.externalId', '=', ctx.userId),
            status: 'pending',
          }))
          .returningAll()
          .executeTakeFirstOrThrow();
        return fundraisingPartner;
      } else if (ctx.userType === 'supporter') {
        const fundraisingSupporter = await ctx.db
          .insertInto('FundraisingSupporter')
          .values(({ selectFrom }) => ({
            fundraisingId: fundraising.id,
            supporterId: selectFrom('Supporter')
              .leftJoin('User', 'User.id', 'Supporter.userId')
              .where('User.externalId', '=', ctx.userId),
            status: 'pending',
          }))
          .returningAll()
          .executeTakeFirstOrThrow();
        return fundraisingSupporter;
      }
      return { message: 'User not supporter or partner' };
    }),
});
