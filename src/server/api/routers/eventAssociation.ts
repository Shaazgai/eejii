import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

import { UserType } from '@/lib/db/enums';
import { sendNotification } from '../helper/notification';
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
      const eventAssociation = await ctx.db
        .insertInto('EventAssociation')
        .values(({ selectFrom }) => ({
          eventId: selectFrom('Event')
            .select('id')
            .where('Event.id', '=', input.eventId),
          userId: selectFrom('User')
            .select('id')
            .where('User.id', '=', ctx.userId),
          status: 'pending',
        }))
        .returning(expressionBuilder => [
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('Event')
              .select(['id', 'title'])
              .select(eb => [
                jsonObjectFrom(
                  eb
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'Event.ownerId')
                ).as('Owner'),
              ])
              .whereRef('Event.id', '=', 'EventAssociation.eventId')
          ).as('Event'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'EventAssociation.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();
      const userEmail = eventAssociation.User
        ? eventAssociation.User.email
        : 'User';
      const title = eventAssociation.Event
        ? eventAssociation.Event.title
        : 'your project';
      const eventId = eventAssociation.Event ? eventAssociation.Event.id : null;
      sendNotification({
        title: `${userEmail} wants to join ${title}`,
        body: null,
        link: `/p/manage/${eventId}`,
        receiverId: eventAssociation.Event?.Owner?.id as string,
        senderId: ctx.userId,
        type: 'join_request',
      });
      return eventAssociation;
    }),
  inviteToEvent: privateProcedure // Owner of the fund will invite partner
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const eventAssociation = await ctx.db
        .insertInto('EventAssociation')
        .values({
          status: 'pending',
          type: 'invitation',
          userId: input.userId,
          eventId: input.id,
        })
        .returning(expressionBuilder => [
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('Event')
              .select(['id', 'title', 'description'])
              .select(eb => [
                jsonObjectFrom(
                  eb
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'Event.ownerId')
                ).as('Owner'),
              ])
              .whereRef('Event.id', '=', 'EventAssociation.eventId')
          ).as('Event'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'EventAssociation.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();
      const ownerName = eventAssociation.Event?.Owner
        ? eventAssociation.Event.Owner.organization
        : 'User';
      const title = eventAssociation.Event
        ? eventAssociation.Event.title
        : 'your project';
      const detail = eventAssociation.Event
        ? eventAssociation.Event.description
        : null;

      const link =
        eventAssociation.User?.type === UserType.USER_PARTNER
          ? '/p/collabration'
          : eventAssociation.User?.type === UserType.USER_SUPPORTER
          ? '/s/collabration'
          : eventAssociation.User?.type === UserType.USER_VOLUNTEER
          ? '/v/events'
          : null;
      sendNotification({
        title: `'${ownerName}' wants you to join '${title}'`,
        body: detail,
        link: link,
        receiverId: input.userId as string,
        senderId: ctx.userId,
        type: 'invite_request',
      });
      return { message: 'Success' };
    }),
  handleEventRequest: privateProcedure // Owner of the event will handle the request of it's invitation
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const eventAssociation = await ctx.db
        .updateTable('EventAssociation')
        .where('id', '=', input.id)
        .set({
          status: input.status,
        })
        .returning(expressionBuilder => [
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('Event')
              .select(['id', 'title', 'description'])
              .select(eb => [
                jsonObjectFrom(
                  eb
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'Event.ownerId')
                ).as('Owner'),
              ])
              .whereRef('Event.id', '=', 'EventAssociation.eventId')
          ).as('Event'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'EventAssociation.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();

      const title = eventAssociation.Event
        ? eventAssociation.Event.title
        : 'your project';
      const eventId = eventAssociation.Event ? eventAssociation.Event.id : null;

      sendNotification({
        title: `Your request to join ${title} has been ${
          input.status === 'APPROVED' ? 'approved' : 'denied'
        }`,
        body: null,
        link: `/events/${eventId}`,
        receiverId: eventAssociation.User?.id as string,
        senderId: ctx.userId as string,
        type: 'join_request',
      });
      return { message: 'Success', response: eventAssociation };
    }),
});
