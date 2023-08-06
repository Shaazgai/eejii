import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { eventSchema } from '@/lib/validation/event-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(async opts => {
    const events = await opts.ctx.db.selectFrom('Event').selectAll().execute();
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

  create: privateProcedure
    .input(eventSchema)
    .mutation(async ({ input, ctx }) => {
      const owner = await ctx.db
        .selectFrom('Partner')
        .select('id')
        .leftJoin('User', 'User.id', 'Partner.userId')
        .where('User.externalId', '=', ctx.userId)
        .executeTakeFirstOrThrow();

      const event = await ctx.db.insertInto('Event').values({
        title: input.title,
        description: input.description,
        requiredTime: input.requiredTime,
        contact: {
          primary_phone: input.primary_phone,
          secondary_phone: input.secondary_phone,
        },
        location: input.location,
        startTime: input.startTime,
        endTime: input.endTime,
        roles: Object.assign({}, input.roles),
        ownerId: owner.id,
      });

      // eslint-disable-next-line unused-imports/no-unused-vars
      const categoryEvent = ctx.db
        .insertInto('CategoryEvent')
        .values(({ selectFrom }) => ({
          categoryId: selectFrom('Category')
            .where('Category.id', '=', input.mainCategory)
            .select('Category.id'),
        }))
        .executeTakeFirstOrThrow();
      return event;
    }),
  sendRequest: privateProcedure
    .input(z.object({ eventId: z.string(), role: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db
        .selectFrom('Event')
        .select('id')
        .where('id', '=', input.eventId)
        .executeTakeFirstOrThrow();

      if (ctx.userType === 'partner') {
        const eventPartner = await ctx.db
          .insertInto('EventPartner')
          .values(({ selectFrom }) => ({
            eventId: event.id,
            partnerId: selectFrom('Partner')
              .leftJoin('User', 'User.id', 'Partner.userId')
              .where('User.externalId', '=', ctx.userId),
            status: 'pending',
          }))
          .returningAll()
          .executeTakeFirstOrThrow();
        return eventPartner;
      } else if (ctx.userType === 'supporter') {
        const eventSupporter = await ctx.db
          .insertInto('EventSupporter')
          .values(({ selectFrom }) => ({
            eventId: event.id,
            supporterId: selectFrom('Supporter')
              .leftJoin('User', 'User.id', 'Supporter.userId')
              .where('User.externalId', '=', ctx.userId),
            status: 'pending',
          }))
          .returningAll()
          .executeTakeFirstOrThrow();
        return eventSupporter;
      } else if (ctx.userType === 'volunteer') {
        const eventVolunteer = await ctx.db
          .insertInto('EventVolunteer')
          .values(({ selectFrom }) => ({
            eventId: event.id,
            volunteerId: selectFrom('Volunteer')
              .leftJoin('User', 'User.id', 'Volunteer.userId')
              .where('User.externalId', '=', ctx.userId),
            status: 'pending',
            role: input.role,
          }))
          .returningAll()
          .executeTakeFirstOrThrow();
        return eventVolunteer;
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred, please try again later.',
      });
    }),
});
