import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { addressSchema } from '@/lib/validation/address-validation-schema';
import { partnerSchema } from '@/lib/validation/partner-validation-schema';

import { normalizeEventJoinRequest } from '../helpers/normalizer/eventJoinRequests';
import { normalizeFundraisingJoinRequest } from '../helpers/normalizer/fundraisingJoinRequest';
import { normalizeGrantJoinRequest } from '../helpers/normalizer/grantJoinRequests';
import {
  findEventJoinRequests,
  findFundraisingJoinRequests,
  findGrantJoinRequests,
} from '../helpers/query/partnerQuery';
import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const partnerRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const partner = await ctx.prisma.partner.findUnique({
        where: { id: input.id },
      });
      if (!partner) throw new TRPCError({ code: 'NOT_FOUND' });

      return partner;
    }),

  getByUserId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const partner = await ctx.prisma.partner.findUnique({
        where: {
          userId: input.id,
        },
      });
      if (!partner) throw new TRPCError({ code: 'NOT_FOUND' });

      return partner;
    }),
  create: privateProcedure
    .input(partnerSchema.merge(addressSchema))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.update({
        where: { externalId: ctx.userId },
        data: {
          type: 'partner',
        },
      });
      if (!user) throw new Error('User not fouuund');
      const address = await ctx.prisma.address.create({
        data: {
          country: input.country,
          city: input.city,
          street: input.street,
          provinceName: input.provinceName,
        },
      });
      const partner = await ctx.prisma.partner.create({
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
      console.log(partner);
      return partner;
    }),
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
      const partner = await ctx.prisma.partner.findUniqueOrThrow({
        where: { userId: user.id },
      });

      if (input.projectType === 'event') {
        const event = await ctx.prisma.event.findMany(
          findEventJoinRequests(partner, input)
        );
        console.log(event);
        return normalizeEventJoinRequest(event);
      } else if (input.projectType === 'fundraising') {
        const fundraising = await ctx.prisma.fundraising.findMany(
          findFundraisingJoinRequests(partner, input)
        );
        return normalizeFundraisingJoinRequest(fundraising);
      } else if (input.projectType === 'grantFundraising') {
        const grantFundraising = await ctx.prisma.grantFundraising.findMany(
          findGrantJoinRequests(partner, input)
        );
        return normalizeGrantJoinRequest(grantFundraising);
      }
      throw new TRPCError({ message: 'Requests not found', code: 'NOT_FOUND' });
    }),

  handleRequest: privateProcedure
    .input(
      z.object({ id: z.string(), projectType: z.string(), status: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.projectType === 'event') {
        const eventVolunteer = await ctx.prisma.eventVolunteer.update({
          where: {
            id: input.id,
          },
          data: {
            status: input.status,
          },
        });
        return eventVolunteer;
      } else if (input.projectType === 'fundraising') {
        const fundraisingPartner = await ctx.prisma.fundraisingPartner.update({
          where: {
            id: input.id,
          },
          data: {
            status: input.status,
          },
        });
        return fundraisingPartner;
      } else if (input.projectType === 'grantFundraising') {
        const grantFundraising =
          await ctx.prisma.grantFundraisingPartner.update({
            where: {
              id: input.id,
            },
            data: {
              status: input.status,
            },
          });

        return grantFundraising;
      }
      throw new TRPCError({ message: 'Requests not found', code: 'NOT_FOUND' });
    }),
  inviteToFundraising: privateProcedure
    .input(
      z.object({
        id: z.string(),
        supporters: z.array(z.string()),
        partners: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      input.supporters.forEach(async supporterId => {
        const fundraising = await ctx.prisma.fundraising.findUniqueOrThrow({
          where: { id: input.id },
        });
        const supporter = await ctx.prisma.supporter.findUniqueOrThrow({
          where: { id: supporterId },
        });
        await ctx.prisma.fundraisingSupporter.create({
          data: {
            status: 'pending',
            supporterId: supporter.id,
            fundraisingId: fundraising.id,
          },
        });
      });

      input.partners.forEach(async partnerId => {
        const fundraising = await ctx.prisma.fundraising.findUniqueOrThrow({
          where: { id: input.id },
        });
        const partner = await ctx.prisma.partner.findUniqueOrThrow({
          where: { id: partnerId },
        });
        await ctx.prisma.fundraisingPartner.create({
          data: {
            status: 'pending',
            partnerId: partner.id,
            fundraisingId: fundraising.id,
          },
        });
      });

      return { message: 'Success' };
    }),
});
