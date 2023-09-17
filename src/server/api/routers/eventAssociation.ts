import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

import { createTRPCRouter, privateProcedure } from '../trpc';

export const eventAssociationRouter = createTRPCRouter({
  findAll: privateProcedure
    .input(
      z.object({
        type: z.string().nullish(),
        status: z.string().nullish(),
        userId: z.string().nullish(),
        eventsOwnerId: z.string().nullish(),
        eventId: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      let query = ctx.db
        .selectFrom('EventAssociation')
        .select([
          'EventAssociation.id',
          'EventAssociation.type',
          'EventAssociation.userId',
          'EventAssociation.status',
          'EventAssociation.eventId',
        ])
        .select(eb => [
          jsonObjectFrom(
            eb
              .selectFrom('Event')
              .selectAll()
              .whereRef('Event.id', '=', 'EventAssociation.eventId')
          ).as('Event'),
        ]);
      if (input.type) {
        query = query.where('EventAssociation.type', '=', input.type);
      }

      if (input.status) {
        query = query.where('EventAssociation.status', '=', input.status);
      }

      if (input.userId) {
        query = query.where('EventAssociation.userId', '=', input.userId);
      }

      if (input.eventsOwnerId) {
        query = query
          .leftJoin('Event', join =>
            join.onRef('Event.id', '=', 'EventAssociation.eventId')
          )
          .where('Event.ownerId', '=', input.eventsOwnerId);
      }

      if (input.eventId) {
        query = query.where('EventAssociation.eventId', '=', input.eventId);
      }

      const result = await query.execute();
      return result;
    }),
  sendRequest: privateProcedure
    .input(z.object({ eventId: z.string(), role: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db
        .selectFrom('Event')
        .select('id')
        .where('id', '=', input.eventId)
        .executeTakeFirstOrThrow();

      const eventPartner = await ctx.db
        .insertInto('EventAssociation')
        .values(({ selectFrom }) => ({
          eventId: event.id,
          ownerId: selectFrom('User').where('User.id', '=', ctx.userId),
          status: 'pending',
        }))
        .returningAll()
        .executeTakeFirstOrThrow();
      return eventPartner;
    }),
  inviteToEvent: privateProcedure // Owner of the fund will invite partner
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      ctx.db
        .insertInto('EventAssociation')
        .values({
          status: 'pending',
          type: 'invitation',
          userId: input.userId,
          eventId: input.id,
        })
        .returning('id')
        .executeTakeFirstOrThrow();
      return { message: 'Success' };
    }),
  handleEventRequest: privateProcedure // Owner of the event will handle the request of it's invitation
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .updateTable('EventAssociation')
        .where('id', '=', input.id)
        .set({
          status: input.status,
        })
        .returning('id')
        .executeTakeFirstOrThrow();
      return { message: 'Success', response: res };
    }),
});
