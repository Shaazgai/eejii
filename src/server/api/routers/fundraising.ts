import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { fundraisingSchema } from '@/lib/validation/fundraising-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const fundraisingRouter = createTRPCRouter({
  getAll: publicProcedure.query(async opts => {
    const fundraising = await opts.ctx.prisma.fundraising.findMany({});
    return fundraising;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const fundraising = await ctx.prisma.fundraising.findUnique({
        where: { id: input.id },
      });
      if (!fundraising) throw new TRPCError({ code: 'NOT_FOUND' });
      return fundraising;
    }),

  create: privateProcedure
    .input(fundraisingSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(ctx.userId);
      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.userId },
      });

      if (!user) throw new Error('User not fouuund');

      const fundraising = await ctx.prisma.fundraising.create({
        data: {
          title: input.title,
          description: input.description,
          contact: {
            primary_phone: input.primary_phone,
            secondary_phone: input.secondary_phone,
          },
          location: input.location,
          startTime: input.startTime,
          endTime: input.endTime,
          goalAmount: input.goalAmount,
          currentAmount: input.currentAmount,
        },
      });
      console.log(fundraising);
      return fundraising;
    }),
});
