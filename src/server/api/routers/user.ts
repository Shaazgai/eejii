import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.userId },
      });

      if (!user) throw new TRPCError({ code: 'NOT_FOUND' });

      if (user.type === 'volunteer') {
        return ctx.prisma.volunteer.findUnique({
          where: { userId: user.id },
        });
      } else if (user.type === 'partner') {
        return ctx.prisma.partner.findUnique({
          where: { userId: user.id },
        });
      } else if (user.type === 'supporter') {
        return ctx.prisma.supporter.findUnique({
          where: { userId: user.id },
        });
      }
      return user;
    }),
});
