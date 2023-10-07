import { TRPCError } from '@trpc/server';
import { sql } from 'kysely';
import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

import { fundraisingSchema } from '@/lib/validation/fundraising-schema';

import { createPresignedUrl } from '../helper/imageHelper';
import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const grantFundraisingRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const grantFundraising = await ctx.db
      .selectFrom('GrantFundraising')
      .selectAll()
      .select(eb => [
        jsonObjectFrom(
          eb
            .selectFrom('User')
            .selectAll()
            .whereRef('User.id', '=', 'GrantFundraising.ownerId')
        ).as('Owner'),
      ])
      .execute();
    return grantFundraising;
  }),
  getMyGrants: privateProcedure.query(async ({ ctx }) => {
    const grants = await ctx.db
      .selectFrom('GrantFundraising')
      .selectAll()
      .where('ownerId', '=', ctx.userId)
      .execute();

    return grants;
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
  getMyCollaborated: privateProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .selectFrom('GrantFundraising')
      .selectAll('GrantFundraising')
      .leftJoin('GrantAssociation', join =>
        join.onRef('GrantAssociation.grantId', '=', 'GrantFundraising.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'GrantAssociation.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('GrantAssociation.status', '=', 'approved')
      .execute();
    console.log(events);
    return events;
  }),
  getMyPending: privateProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .selectFrom('GrantFundraising')
      .selectAll('GrantFundraising')
      .leftJoin('GrantAssociation', join =>
        join.onRef('GrantAssociation.grantId', '=', 'GrantFundraising.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'GrantAssociation.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('GrantAssociation.status', '=', 'pending')
      .execute();
    // console.log(events);
    return events;
  }),
  getNotRelated: privateProcedure.query(async ({ ctx }) => {
    const query = await sql`
        SELECT g.* FROM "GrantFundraising" g 
        LEFT JOIN "GrantAssociation" ga ON ga."grantId" = g."id"
        WHERE ga."userId" != ${sql.raw(
          `(SELECT u1."id" FROM "User" u1 WHERE u1."id" = '${ctx.userId}')`
        )} OR ga."userId" IS NULL
        AND g."ownerId" != ${sql.raw(
          `(SELECT u1."id" FROM "User" u1 WHERE u1."id" = '${ctx.userId}')`
        )}
      `.execute(ctx.db);
    console.log(query.rows);
    return query.rows;
  }),
  findUsersToInvite: publicProcedure // Find all partners for event to invite them
    .input(z.object({ grantId: z.string(), userType: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = await sql`
        SELECT u.*
        FROM "User" u
        LEFT JOIN "GrantAssociation" as ga ON ga."userId" = u."id"
        WHERE ga."grantId" IS DISTINCT FROM ${
          input.grantId
        } OR ga."grantId" IS NULL
        AND u."id" != ${sql.raw(
          `(SELECT g."ownerId" FROM "GrantFundraising" AS g WHERE g."id" = '${input.grantId}')`
        )}
        AND u."type" = '${input.userType}'
        `.execute(ctx.db);

      return query.rows;
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
            phone: input.contact.phone,
            email: input.contact.email,
          },
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
        .updateTable('GrantFundraising')
        .where('id', '=', input.id)
        .set({
          title: input.title,
          description: input.description,
          contact: {
            phone: input.contact.phone,
            email: input.contact.email,
          },
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
        grantId: z.string(),
        name: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const grantImage = await ctx.db
        .insertInto('GrantImage')
        .values({
          ownerId: input.grantId,
          type: 'main',
          path: `uploads/grant/${input.name}`,
        })
        .returning(['path'])
        .executeTakeFirstOrThrow();

      return createPresignedUrl(grantImage.path, input.contentType);
    }),
});
