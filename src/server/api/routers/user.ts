import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import getUser from '../helpers/userHelper';
import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getById: publicProcedure
    // .input(z.object({ id: z.string() }))
    .query(async ({ ctx }) => {
      if (ctx.userId) {
        const user = await ctx.prisma.user.findUnique({
          where: { externalId: ctx.userId },
        });

        console.log('🚀 ~ file: user.ts:13 ~ .query ~ user:', user);
        console.log('🚀 ~ file: user.ts:13 ~ .query ~ user:', ctx.userId);

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
      }
      throw new Error('User not found');
    }),
  getMyDonations: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const user = await getUser({ userId: ctx.userId });

      const donations = await ctx.prisma.donation.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        include: {
          Fundraising: true,
        },
        where: {
          userId: user.id,
          Payment: {
            status: 'PAID',
          },
        },
        // cursor: cursor ? { id: cursor as unknown as string } : undefined,
        orderBy: {
          createdAt: 'asc',
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (donations.length > limit) {
        const nextItem = donations.pop();
        nextCursor = nextItem!.id as unknown as number;
      }
      console.log(donations);
      return {
        donations,
        nextCursor,
      };
    }),
});
