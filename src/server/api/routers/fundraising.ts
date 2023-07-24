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
        include: {
          Donation: {
            include: {
              User: true,
            },
          },
        },
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
      }
      if (!owner) throw new Error('Owner not found');

      const fundraising = await ctx.prisma.fundraising.create({
        data: {
          title: input.title,
          description: input.description,
          contact: {
            primary_phone: input.primary_phone,
            secondary_phone: input.secondary_phone,
            email_1: input.email_1,
            email_2: input.email_2,
          },
          location: input.location,
          startTime: input.startTime,
          endTime: input.endTime,
          goalAmount: input.goalAmount,
          currentAmount: input.currentAmount,
          partnerId: owner.id,
        },
      });
      console.log(fundraising);
      return fundraising;
    }),
  sendRequest: privateProcedure
    .input(z.object({ fundraisingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: { externalId: ctx.userId },
      });
      const fundraising = await ctx.prisma.fundraising.findUnique({
        where: { id: input.fundraisingId },
      });
      if (!fundraising) throw new TRPCError({ code: 'NOT_FOUND' });

      if (user.type === 'partner') {
        const partner = await ctx.prisma.partner.findUniqueOrThrow({
          where: { userId: user.id },
        });

        const fundraisingPartner = await ctx.prisma.fundraisingPartner.create({
          data: {
            fundraisingId: fundraising.id,
            partnerId: partner.id,
            status: 'pending',
          },
        });
        return fundraisingPartner;
      } else if (user.type === 'supporter') {
        const supporter = await ctx.prisma.supporter.findUniqueOrThrow({
          where: { userId: user.id },
        });

        const fundraisingSupporter =
          await ctx.prisma.fundraisingSupporter.create({
            data: {
              fundraisingId: fundraising.id,
              supporterId: supporter.id,
              status: 'pending',
            },
          });
        return fundraisingSupporter;
      }
      return { message: 'User not supporter or partner' };
    }),
});
