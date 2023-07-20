import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { fundraisingSchema } from '@/lib/validation/fundraising-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const grantFundraisingRouter = createTRPCRouter({
  getAll: publicProcedure.query(async opts => {
    const fundraising = await opts.ctx.prisma.grantFundraising.findMany({});
    return fundraising;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const fundraising = await ctx.prisma.grantFundraising.findUnique({
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
      let owner = null;

      if (user.type === 'partner') {
        owner = await ctx.prisma.partner.findUniqueOrThrow({
          where: { userId: user.id },
        });
      } else if (user.type === 'supporter') {
        owner = await ctx.prisma.partner.findUniqueOrThrow({
          where: { userId: user.id },
        });
      }
      if (!owner) throw new Error('Owner not found');

      const fundraising = await ctx.prisma.grantFundraising.create({
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
          ownerId: owner.id,
        },
      });
      console.log(fundraising);
      return fundraising;
    }),
  sendRequest: privateProcedure
    .input(z.object({ grantFundraisingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: { externalId: ctx.userId },
      });
      const grantFundraising = await ctx.prisma.grantFundraising.findUnique({
        where: { id: input.grantFundraisingId },
      });
      if (!grantFundraising) throw new TRPCError({ code: 'NOT_FOUND' });

      if (user.type === 'partner') {
        const partner = await ctx.prisma.partner.findUniqueOrThrow({
          where: { userId: user.id },
        });

        const grantFundraisingPartner =
          await ctx.prisma.grantFundraisingPartner.create({
            data: {
              grantFundraisingId: grantFundraising.id,
              partnerId: partner.id,
              status: 'pending',
            },
          });
        return grantFundraisingPartner;
      } else if (user.type === 'supporter') {
        const supporter = await ctx.prisma.supporter.findUniqueOrThrow({
          where: { userId: user.id },
        });

        const grantFundraisingSupporter =
          await ctx.prisma.grantFundraisingSupporter.create({
            data: {
              grantFundraisingId: grantFundraising.id,
              supporterId: supporter.id,
              status: 'pending',
            },
          });
        return grantFundraisingSupporter;
      }

      return { message: 'User not supporter or partner' };
    }),
});
