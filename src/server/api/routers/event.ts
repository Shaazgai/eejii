import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import type { EventType } from '@/lib/types';
import { eventSchema } from '@/lib/validation/event-schema';

import { normalizeEventToForm } from '../helpers/normalizer/normalizeForForm';
import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(async opts => {
    const events = await opts.ctx.prisma.event.findMany({
      include: {
        Owner: true,
      },
    });
    return events;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUnique({
        include: {
          CategoryEvent: {
            include: {
              Category: true,
            },
          },
          Owner: true,
        },
        where: { id: input.id },
      });
      if (!event) throw new TRPCError({ code: 'NOT_FOUND' });
      return normalizeEventToForm(event as EventType);
    }),

  createOrUpdate: privateProcedure
    .input(eventSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.userId },
      });
      if (!user) throw new Error('User not fouuund');

      const owner = await ctx.prisma.partner.findUniqueOrThrow({
        where: { userId: user.id },
      });
      console.log(input.mainCategory);
      const category = await ctx.prisma.category.findUniqueOrThrow({
        where: { id: input.mainCategory },
      });
      const event = await ctx.prisma.event.upsert({
        where: {
          id: input.id as string,
        },
        create: {
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
          CategoryEvent: {
            create: {
              categoryId: category.id,
            },
          },
        },
        update: {
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
          CategoryEvent: {
            deleteMany: {},
            createMany: {
              data: {
                categoryId: category.id,
              },
            },
          },
        },
      });

      return event;
    }),
  sendRequest: privateProcedure
    .input(z.object({ eventId: z.string(), role: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: { externalId: ctx.userId },
      });
      const event = await ctx.prisma.event.findUnique({
        where: { id: input.eventId },
      });
      if (!event) throw new TRPCError({ code: 'NOT_FOUND' });

      const volunteer = await ctx.prisma.volunteer.findUniqueOrThrow({
        where: { userId: user.id },
      });
      const eventVolunteer = ctx.prisma.eventVolunteer.create({
        data: {
          eventId: event.id,
          volunteerId: volunteer.id,
          status: 'pending',
          role: input.role,
        },
      });

      return eventVolunteer;
    }),
});
