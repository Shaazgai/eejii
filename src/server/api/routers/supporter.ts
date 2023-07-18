import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const supporterRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const supporter = await ctx.prisma.supporter.findUnique({
        where: { id: input.id },
      });
      if (!supporter) throw new TRPCError({ code: 'NOT_FOUND' });

      return supporter;
    }),
  create: publicProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      return ctx.prisma.supporter.create({
        data: { content },
      });
    }),
});
