import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

import { UserType } from '@/lib/db/enums';
import { sendNotification } from '../helper/notification';
import { createTRPCRouter, privateProcedure } from '../trpc';

export const eventUserRouter = createTRPCRouter({
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
        .selectFrom('EventCollaborator')
        .select([
          'EventCollaborator.id',
          'EventCollaborator.type',
          'EventCollaborator.userId',
          'EventCollaborator.status',
          'EventCollaborator.eventId',
        ])
        .select(eb => [
          jsonObjectFrom(
            eb
              .selectFrom('Event')
              .selectAll()
              .whereRef('Event.id', '=', 'EventCollaborator.eventId')
          ).as('Event'),
        ]);
      if (input.type) {
        query = query.where('EventCollaborator.type', '=', input.type);
      }

      if (input.status) {
        query = query.where('EventCollaborator.status', '=', input.status);
      }

      if (input.userId) {
        query = query.where('EventCollaborator.userId', '=', input.userId);
      }

      if (input.eventsOwnerId) {
        query = query
          .leftJoin('Event', join =>
            join.onRef('Event.id', '=', 'EventCollaborator.eventId')
          )
          .where('Event.ownerId', '=', input.eventsOwnerId);
      }

      if (input.eventId) {
        query = query.where('EventCollaborator.eventId', '=', input.eventId);
      }

      const result = await query.execute();
      return result;
    }),
  sendRequest: privateProcedure
    .input(z.object({ eventId: z.string(), role: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const EventCollaborator = await ctx.db
        .insertInto('EventCollaborator')
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
              .whereRef('Event.id', '=', 'EventCollaborator.eventId')
          ).as('Event'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'EventCollaborator.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();
      const userEmail = EventCollaborator.User
        ? EventCollaborator.User.email
        : 'User';
      const title = EventCollaborator.Event
        ? EventCollaborator.Event.title
        : 'your project';
      const eventId = EventCollaborator.Event
        ? EventCollaborator.Event.id
        : null;
      sendNotification({
        title: `${userEmail} wants to join ${title}`,
        body: null,
        link: `/p/manage/${eventId}`,
        receiverId: EventCollaborator.Event?.Owner?.id as string,
        senderId: ctx.userId,
        type: 'join_request',
      });
      return EventCollaborator;
    }),
  inviteToEvent: privateProcedure // Owner of the fund will invite partner
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const EventCollaborator = await ctx.db
        .insertInto('EventCollaborator')
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
              .whereRef('Event.id', '=', 'EventCollaborator.eventId')
          ).as('Event'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'EventCollaborator.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();
      const ownerName = EventCollaborator.Event?.Owner
        ? EventCollaborator.Event.Owner.organizationName
        : 'User';
      const title = EventCollaborator.Event
        ? EventCollaborator.Event.title
        : 'your project';
      const detail = EventCollaborator.Event
        ? EventCollaborator.Event.description
        : null;

      const link =
        EventCollaborator.User?.type === UserType.USER_PARTNER
          ? '/p/collabration'
          : EventCollaborator.User?.type === UserType.USER_SUPPORTER
            ? '/s/collabration'
            : EventCollaborator.User?.type === UserType.USER_VOLUNTEER
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
      const EventCollaborator = await ctx.db
        .updateTable('EventCollaborator')
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
              .whereRef('Event.id', '=', 'EventCollaborator.eventId')
          ).as('Event'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'EventCollaborator.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();

      const title = EventCollaborator.Event
        ? EventCollaborator.Event.title
        : 'your project';
      const eventId = EventCollaborator.Event
        ? EventCollaborator.Event.id
        : null;

      sendNotification({
        title: `Your request to join ${title} has been ${
          input.status === 'APPROVED' ? 'approved' : 'denied'
        }`,
        body: null,
        link: `/events/${eventId}`,
        receiverId: EventCollaborator.User?.id as string,
        senderId: ctx.userId as string,
        type: 'join_request',
      });
      return { message: 'Success', response: EventCollaborator };
    }),

  getMyVolunteer: privateProcedure
    .input(z.object({ partnerId: z.string() }))
    .query(async ({ ctx, input }) => {
      const volunteers = await ctx.db
        .selectFrom('User')
        .select([
          'User.id',
          'User.phoneNumber',
          'User.email',
          'User.firstName',
          'User.lastName',
          'User.bio',
          'User.skills',
        ])
        .select(eb => [
          jsonObjectFrom(
            eb
              .selectFrom('Address')
              .selectAll()
              .whereRef('User.id', '=', 'Address.userId')
          ).as('Address'),
        ])
        .select(eb => [
          jsonObjectFrom(
            eb
              .selectFrom('EventCollaborator')
              .selectAll()
              .whereRef('User.id', '=', 'EventCollaborator.userId')
          ).as('EventCollaborator'),
        ])
        .leftJoin('EventCollaborator', join =>
          join.onRef('User.id', '=', 'EventCollaborator.userId')
        )
        .leftJoin('Event', join =>
          join.onRef('Event.id', '=', 'EventCollaborator.eventId')
        )
        .where('User.type', '=', 'USER_VOLUNTEER')
        .where('Event.ownerId', '=', input.partnerId)
        .execute();

      return volunteers;
    }),
});
