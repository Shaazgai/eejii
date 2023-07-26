import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { addressSchema } from '@/lib/validation/address-validation-schema';
import { supporterSchema } from '@/lib/validation/partner-validation-schema';

import { normalizeGrantJoinRequest } from '../helpers/normalizer/n-grantJoinRequests';
import { findGrantRequests } from '../helpers/query/supporterQuery';
import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

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
  getByUserId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const supporter = await ctx.prisma.supporter.findUnique({
        where: {
          userId: input.id,
        },
      });
      if (!supporter) throw new TRPCError({ code: 'NOT_FOUND' });

      return supporter;
    }),
  getCurrentUsers: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirstOrThrow({
      where: { externalId: ctx.userId },
    });
    const supporter = await ctx.prisma.supporter.findUnique({
      include: {
        Address: true,
      },
      where: {
        userId: user.id,
      },
    });
    return supporter;
  }),
  findAll: publicProcedure.query(async ({ ctx }) => {
    const supporter = await ctx.prisma.supporter.findMany({});

    return supporter;
  }),
  findAllForFundInvitation: publicProcedure
    .input(z.object({ fundId: z.string() }))
    .query(async ({ ctx, input }) => {
      const supporter = await ctx.prisma.supporter.findMany({
        where: {
          NOT: {
            OR: [
              {
                FundraisingSupporter: {
                  some: { fundraisingId: input.fundId },
                },
              },
            ],
          },
        },
      });

      return supporter;
    }),
  findAllForEventInvitation: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const supporter = await ctx.prisma.supporter.findMany({
        where: {
          NOT: {
            OR: [
              {
                EventSupporter: {
                  some: { eventId: input.eventId },
                },
              },
            ],
          },
        },
      });

      return supporter;
    }),
  create: privateProcedure
    .input(supporterSchema.merge(addressSchema))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.update({
        where: { externalId: ctx.userId },
        data: {
          type: 'supporter',
        },
      });
      const address = await ctx.prisma.address.create({
        data: {
          country: input.country,
          city: input.city,
          street: input.street,
          provinceName: input.provinceName,
        },
      });
      const supporter = await ctx.prisma.supporter.create({
        data: {
          organization: input.organization,
          email: input.email,
          bio: input.email,
          socialLinks: {
            twitter: input.twitter,
            facebook: input.facebook,
            instagram: input.instagram,
          },
          phoneNumbers: {
            primary_phone: input.primary_phone,
            secondary_phone: input.secondary_phone,
          },
          userId: user.id,
          addressId: address?.id,
        },
      });

      return supporter;
    }),
  // getRequestsOrInvitations: privateProcedure
  //   .input(
  //     z.object({
  //       projectType: z.string(),
  //       requestType: z.string(),
  //       status: z.string(),
  //     })
  //   )
  //   .query(async ({ ctx, input }) => {
  //     const user = await ctx.prisma.user.findUniqueOrThrow({
  //       where: { externalId: ctx.userId },
  //     });
  //     const supporter = await ctx.prisma.supporter.findUniqueOrThrow({
  //       where: { userId: user.id },
  //     });

  //     const grantFundraisingSupporter =
  //       await ctx.prisma.grantFundraising.findMany(
  //         findGrantRequests(supporter, input)
  //       );
  //     return grantFundraisingSupporter;
  //   }),
  getMytProjectsJoinRequestsOrInvitations: privateProcedure
    .input(
      z.object({
        projectType: z.string().nullable(),
        status: z.string().nullable(),
        requestType: z.string().nullable(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: { externalId: ctx.userId },
      });
      const supporter = await ctx.prisma.supporter.findUniqueOrThrow({
        where: { userId: user.id },
      });

      const grantFundraisingSupporter =
        await ctx.prisma.grantFundraising.findMany(
          findGrantRequests(supporter, input)
        );
      return normalizeGrantJoinRequest(grantFundraisingSupporter);
    }),
  handleRequest: privateProcedure
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const grantFundraising = await ctx.prisma.grantFundraisingPartner.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });

      return grantFundraising;
    }),
});
