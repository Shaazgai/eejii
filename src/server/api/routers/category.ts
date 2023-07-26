import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ type: z.string() }))
    .query(async opts => {
      const category = await opts.ctx.prisma.category.findMany({
        where: { type: opts.input.type },
      });
      return category;
    }),
});
