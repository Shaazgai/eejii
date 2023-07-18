import { TRPCError } from '@trpc/server';
import { Ratelimit } from '@upstash/ratelimit'; // for deno: see above
import { Redis } from "@upstash/redis";
// for deno: see above
import { z } from 'zod';

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '@/server/api/trpc';

// // Create a new ratelimiter, that allows 3 requests per 1 minute
// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(3, '1 m'),
//   analytics: true,
// });

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: privateProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;
      console.log("🚀 ~ file: example.ts:37 ~ .mutation ~ authorId:", authorId)

      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });

      const category = await ctx.prisma.category.create({
        data: {
          // authorId,
          name: input.title,
        },
      });

      return category;
    }),
});
