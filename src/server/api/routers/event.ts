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
      const event = await ctx.db
        .insertInto('Event')
        .values({
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
      if (input.mainCategory) {
        ctx.db
          .insertInto('CategoryEvent')
          .values(({ selectFrom }) => ({
            categoryId: selectFrom('Category')
              .where('Category.id', '=', input.mainCategory as string)
              .select('Category.id'),
          }))
          .execute();
      }
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

      const eventPartner = await ctx.db
        .insertInto('EventAssociation')
        .values(({ selectFrom }) => ({
          eventId: event.id,
          ownerId: selectFrom('User').where('User.', '=', ctx.userId),
          status: 'pending',
        }))
        .returningAll()
        .executeTakeFirstOrThrow();
      return eventPartner;
    }),
});
