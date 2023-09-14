import { TRPCError } from '@trpc/server';
import { sql } from 'kysely';
import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

import { eventSchema } from '@/lib/validation/event-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';
import { UserType } from '@/lib/db/enums';

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(async opts => {
    const events = await opts.ctx.db
      .selectFrom('Event')
      .selectAll()
      .select(eb => [
        jsonObjectFrom(
          eb
            .selectFrom('User')
            .selectAll()
            .whereRef('User.id', '=', 'Event.ownerId')
        ).as('Owner'),
      ])
      .execute();
    return events;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db
        .selectFrom('Event')
        .selectAll()
        .where('Event.id', '=', input.id)
        .execute();
      return event;
    }),
  getMyCollaborated: privateProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .selectFrom('Event')
      .selectAll('Event')
      .leftJoin('EventAssociation', join =>
        join.onRef('EventAssociation.eventId', '=', 'Event.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'EventAssociation.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('EventAssociation.status', '=', 'approved')
      .execute();
    console.log(events);
    return events;
  }),
  getMyPending: privateProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .selectFrom('Event')
      .selectAll('Event')
      .leftJoin('EventAssociation', join =>
        join.onRef('EventAssociation.eventId', '=', 'Event.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'EventAssociation.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('EventAssociation.status', '=', 'pending')
      .execute();
    // console.log(events);
    return events;
  }),
  getNotRelated: privateProcedure.query(async ({ ctx }) => {
    const query = await sql`
        SELECT e.* FROM "Event" e 
        LEFT JOIN "EventAssociation" ea ON ea."eventId" = e."id"
        WHERE ea."userId" != ${sql.raw(
          `(SELECT u1."id" FROM "User" u1 WHERE u1."id" = '${ctx.userId}')`
        )} OR ea."userId" IS NULL
        AND e."userId" != ${sql.raw(
          `(SELECT u1."id" FROM "User" u1 WHERE u1."id" = '${ctx.userId}')`
        )}
      `.execute(ctx.db);
    console.log(query.rows);
    return query.rows;
  }),
  findUsersToInvite: publicProcedure // Find all partners for event to invite them
    .input(z.object({ eventId: z.string(), userType: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = await sql`
        SELECT u.*
        FROM "User" u
        LEFT JOIN "EventAssociation" as ea ON ea."userId" = u."id"
        WHERE (ea."eventId" IS DISTINCT FROM ${
          input.eventId
        } OR ea."eventId" IS NULL)
        AND u."id" != ${sql.raw(
          `(SELECT e."ownerId" FROM "Event" AS e WHERE e."id" = '${input.eventId}')`
        )}
        AND u."type" = ${input.userType}
        AND u."id" != ${ctx.userId}
        `.execute(ctx.db);

      return query.rows;
    }),
  create: privateProcedure
    .input(eventSchema)
    .mutation(async ({ input, ctx }) => {
      const event = await ctx.db
        .insertInto('Event')
        .values({
          title: input.title,
          description: input.description,
          requiredTime: input.requiredTime,
          contact: {
            phone: input.contact.phone,
            email: input.contact.email,
          },
          location: input.location,
          startTime: input.startTime,
          endTime: input.endTime,
          roles: Object.assign({}, input.roles),
          ownerId: ctx.userId,
        })
        .returning(['id'])
        .executeTakeFirstOrThrow();
      return event;
    }),
  update: privateProcedure
    .input(eventSchema)
    .mutation(async ({ input, ctx }) => {
      if (!input.id) {
        throw new TRPCError({
          message: 'Not enough parameter',
          code: 'BAD_REQUEST',
        });
      }
      const event = await ctx.db
        .updateTable('Event')
        .where('id', '=', input.id)
        .set({
          title: input.title,
          description: input.description,
          requiredTime: input.requiredTime,
          contact: {
            phone_primary: input.contact.phone_primary,
            phone_secondary: input.contact.phone_secondary,
          },
          location: input.location,
          startTime: input.startTime,
          endTime: input.endTime,
          roles: Object.assign({}, input.roles),
          ownerId: ctx.userId,
        })
        .returning(['id'])
        .executeTakeFirstOrThrow();
      return event;
    }),
});
