import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { eventSchema } from '@/lib/validation/event-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(async opts => {
    const events = await opts.ctx.prisma.event.findMany({});
    return events;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUnique({
        where: { id: input.id },
      });
      if (!event) throw new TRPCError({ code: 'NOT_FOUND' });
      return event;
    }),

  create: privateProcedure
    .input(eventSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(ctx.userId);
      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.userId },
      });
      if (!user) throw new Error('User not fouuund');

      const roles = input.roles;
      const rolesArr = roles.split(',');
      const event = await ctx.prisma.event.create({
        data: {
          title: input.title,
          description: input.description,
          requiredTime: input.requiredTime,
          contact: input.requiredTime,
          location: input.location,
          startTime: input.startTime,
          endTime: input.endTime,
          roles: rolesArr,
        },
      });
      console.log(event);
      return event;
    }),
});
