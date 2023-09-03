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
      .leftJoin('FundAssociation', join =>
        join.onRef('FundAssociation.fundraisingId', '=', 'Fundraising.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'FundAssociation.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('FundAssociation.status', '=', 'approved')
      .execute();
    console.log(fundraising);
    return fundraising;
  }),
  getMyPending: privateProcedure.query(async ({ ctx }) => {
    const fundraising = await ctx.db
      .selectFrom('Fundraising')
      .selectAll('Fundraising')
      .leftJoin('FundAssociation', join =>
        join.onRef('FundAssociation.fundraisingId', '=', 'Fundraising.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'FundAssociation.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('FundAssociation.status', '=', 'pending')
      .execute();
    // console.log(fundraising);
    return fundraising;
  }),
  getNotRelated: privateProcedure.query(async ({ ctx }) => {
    const query = await sql`
        SELECT f.* FROM Fundraising f 
        LEFT JOIN FundAssociation fa ON fa.fundraisingId = f.id
        WHERE fa.userId != ${sql.raw(
          `(SELECT u1.id FROM User u1 WHERE u1.id = "${ctx.userId}")`
        )} OR fp.partnerId IS NULL
        AND f.userId != ${sql.raw(
          `(SELECT u1.id FROM User u1 WHERE u1.id = "${ctx.userId}")`
        )}
      `.execute(ctx.db);
    console.log(query.rows);
    return query.rows;
  }),
  create: privateProcedure
    .input(fundraisingSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(ctx.userId);
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
          ownerId: ctx.userId,
        })
        .returning(['id'])
        .executeTakeFirstOrThrow();

      if (input.mainCategory) {
        await ctx.db
          .insertInto('CategoryFundraising')
          .values(({ selectFrom }) => ({
            categoryId: selectFrom('Category')
              .where('Category.id', '=', input.mainCategory)
              .select('Category.id'),
            fundraisingId: fund.id,
          }))
          .execute();
      }
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
