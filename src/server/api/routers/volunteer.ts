import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const volunteerRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const volunteer = await ctx.prisma.volunteer.findUnique({
        where: { id: input.id },
      });
      if (!volunteer) throw new TRPCError({ code: 'NOT_FOUND' });

      return volunteer;
    }),
  create: publicProcedure
    .input(z.object({ content: z.string }))
    .mutation(async ({ input: { content }, ctx }) => {
      console.log(content);
      const volunteer = await ctx.prisma.volunteer.create({
        data: { content },
      });
      return volunteer;
    }),
});
