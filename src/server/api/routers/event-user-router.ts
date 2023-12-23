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
        .selectFrom('EventUser')
        .select([
          'EventUser.id',
          'EventUser.type',
          'EventUser.userId',
          'EventUser.status',
          'EventUser.eventId',
        ])
        .select(eb => [
          jsonObjectFrom(
            eb
              .selectFrom('Event')
              .selectAll()
              .whereRef('Event.id', '=', 'EventUser.eventId')
          ).as('Event'),
        ]);
      if (input.type) {
        query = query.where('EventUser.type', '=', input.type);
      }

      if (input.status) {
        query = query.where('EventUser.status', '=', input.status);
      }

      if (input.userId) {
        query = query.where('EventUser.userId', '=', input.userId);
      }

      if (input.eventsOwnerId) {
        query = query
          .leftJoin('Event', join =>
            join.onRef('Event.id', '=', 'EventUser.eventId')
          )
          .where('Event.ownerId', '=', input.eventsOwnerId);
      }

      if (input.eventId) {
        query = query.where('EventUser.eventId', '=', input.eventId);
      }

      const result = await query.execute();
      return result;
    }),
  sendRequest: privateProcedure
    .input(z.object({ eventId: z.string(), role: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const eventUser = await ctx.db
        .insertInto('EventUser')
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
              .whereRef('Event.id', '=', 'EventUser.eventId')
          ).as('Event'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'EventUser.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();
      const userEmail = eventUser.User ? eventUser.User.email : 'User';
      const title = eventUser.Event ? eventUser.Event.title : 'your project';
      const eventId = eventUser.Event ? eventUser.Event.id : null;
      sendNotification({
        title: `${userEmail} wants to join ${title}`,
        body: null,
        link: `/p/manage/${eventId}`,
        receiverId: eventUser.Event?.Owner?.id as string,
        senderId: ctx.userId,
        type: 'join_request',
      });
      return eventUser;
    }),
  inviteToEvent: privateProcedure // Owner of the fund will invite partner
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const eventUser = await ctx.db
        .insertInto('EventUser')
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
              .whereRef('Event.id', '=', 'EventUser.eventId')
          ).as('Event'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'EventUser.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();
      const ownerName = eventUser.Event?.Owner
        ? eventUser.Event.Owner.organizationName
        : 'User';
      const title = eventUser.Event ? eventUser.Event.title : 'your project';
      const detail = eventUser.Event ? eventUser.Event.description : null;

      const link =
        eventUser.User?.type === UserType.USER_PARTNER
          ? '/p/collabration'
          : eventUser.User?.type === UserType.USER_SUPPORTER
            ? '/s/collabration'
            : eventUser.User?.type === UserType.USER_VOLUNTEER
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
      const eventUser = await ctx.db
        .updateTable('EventUser')
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
              .whereRef('Event.id', '=', 'EventUser.eventId')
          ).as('Event'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'EventUser.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();

      const title = eventUser.Event ? eventUser.Event.title : 'your project';
      const eventId = eventUser.Event ? eventUser.Event.id : null;

      sendNotification({
        title: `Your request to join ${title} has been ${
          input.status === 'APPROVED' ? 'approved' : 'denied'
        }`,
        body: null,
        link: `/events/${eventId}`,
        receiverId: eventUser.User?.id as string,
        senderId: ctx.userId as string,
        type: 'join_request',
      });
      return { message: 'Success', response: eventUser };
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
              .selectFrom('EventUser')
              .selectAll()
              .whereRef('User.id', '=', 'EventUser.userId')
          ).as('EventUser'),
        ])
        .leftJoin('EventUser', join =>
          join.onRef('User.id', '=', 'EventUser.userId')
        )
        .leftJoin('Event', join =>
          join.onRef('Event.id', '=', 'EventUser.eventId')
        )
        .where('User.type', '=', 'USER_VOLUNTEER')
        .where('Event.ownerId', '=', input.partnerId)
        .execute();

      return volunteers;
    }),
});
