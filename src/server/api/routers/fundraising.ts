import { TRPCError } from '@trpc/server';
import { sql } from 'kysely';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

import type { Fundraising } from '@/lib/db/types';
import { fundraisingSchema } from '@/lib/validation/fundraising-schema';

import { createPresignedUrl } from '../helper/imageHelper';
import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const fundraisingRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const fundraising = await ctx.db
      .selectFrom('Fundraising')
      .select([
        'Fundraising.id',
        'Fundraising.title',
        'Fundraising.description',
        'Fundraising.currentAmount',
        'Fundraising.goalAmount',
        'Fundraising.contact',
        'Fundraising.location',
        'Fundraising.startTime',
        'Fundraising.endTime',
        'Fundraising.createdAt',
      ])
      .select(eb => [
        jsonObjectFrom(
          eb
            .selectFrom('User')
            .selectAll()
            .whereRef('User.id', '=', 'Fundraising.ownerId')
        ).as('Owner'),
        jsonArrayFrom(
          eb
            .selectFrom('FundImage')
            .selectAll()
            .whereRef('Fundraising.id', '=', 'FundImage.ownerId')
        ).as('Images'),
      ])
      .execute();
    return fundraising;
  }),
  getMyFunds: privateProcedure.query(async ({ ctx }) => {
    const fundraisings = await ctx.db
      .selectFrom('Fundraising')
      .select([
        'Fundraising.id',
        'Fundraising.title',
        'Fundraising.description',
        'Fundraising.currentAmount',
        'Fundraising.goalAmount',
        'Fundraising.contact',
        'Fundraising.location',
        'Fundraising.startTime',
        'Fundraising.endTime',
        'Fundraising.createdAt',
      ])
      .select(eb => [
        jsonArrayFrom(
          eb
            .selectFrom('FundImage')
            .selectAll()
            .whereRef('Fundraising.id', '=', 'FundImage.ownerId')
        ).as('Images'),
      ])
      .where('ownerId', '=', ctx.userId)
      .execute();

    return fundraisings;
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const fundraising = await ctx.db
        .selectFrom('Fundraising')
        .where('id', '=', input.id)
        .select([
          'Fundraising.id',
          'Fundraising.title',
          'Fundraising.description',
          'Fundraising.currentAmount',
          'Fundraising.goalAmount',
          'Fundraising.contact',
          'Fundraising.location',
          'Fundraising.startTime',
          'Fundraising.endTime',
          'Fundraising.createdAt',
        ])
        .select(eb => [
          jsonObjectFrom(
            eb
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'Fundraising.ownerId')
          ).as('Owner'),
          jsonArrayFrom(
            eb
              .selectFrom('FundImage')
              .selectAll()
              .whereRef('Fundraising.id', '=', 'FundImage.ownerId')
          ).as('Images'),
        ])
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
        SELECT f.* FROM "Fundraising" f 
        LEFT JOIN "FundAssociation" fa ON fa."fundraisingId" = f."id"
        WHERE fa."userId" != ${sql.raw(
          `(SELECT u1."id" FROM "User" u1 WHERE u1."id" = '${ctx.userId}')`
        )} OR fa."userId" IS NULL
        AND f."ownerId" != ${sql.raw(
          `(SELECT u1."id" FROM "User" u1 WHERE u1."id" = '${ctx.userId}')`
        )}
      `.execute(ctx.db);
    return query.rows as Fundraising[];
  }),
  findUsersToInvite: publicProcedure // Find all partners for fundraising to invite them
    .input(z.object({ fundId: z.string(), userType: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = await sql`
        SELECT u.*
        FROM "User" u
        LEFT JOIN "FundAssociation" as fa ON fa."userId" = u."id"
        WHERE (fa."fundraisingId" IS DISTINCT FROM ${
          input.fundId
        } OR fa."fundraisingId" IS NULL)
        AND u."id" != ${sql.raw(
          `(SELECT f."ownerId" FROM "Fundraising" AS f WHERE f."id" = '${input.fundId}')`
        )}
        AND u."type" = ${input.userType}
        AND u."id" = ${ctx.userId}
        `.execute(ctx.db);

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
            phone: input.contact.phone,
            email: input.contact.email,
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

      return fund;
    }),
  update: privateProcedure
    .input(fundraisingSchema)
    .mutation(async ({ input, ctx }) => {
      if (!input.id) {
        throw new TRPCError({
          message: 'Not enough parameter',
          code: 'BAD_REQUEST',
        });
      }
      const fund = await ctx.db
        .updateTable('Fundraising')
        .where('id', '=', input.id as string)
        .set({
          title: input.title,
          description: input.description,
          contact: {
            phone: input.contact.phone,
            email: input.contact.email,
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

      return fund;
    }),
  createPresignedUrl: privateProcedure
    .input(
      z.object({
        fundId: z.string(),
        name: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const fundImage = await ctx.db
        .insertInto('FundImage')
        .values({
          ownerId: input.fundId,
          type: 'main',
          path: `uploads/fund/${input.name}`,
        })
        .returning(['path'])
        .executeTakeFirstOrThrow();

      return createPresignedUrl(fundImage.path, input.contentType);
    }),
});
