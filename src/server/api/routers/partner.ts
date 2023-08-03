import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import type { Partner } from '@/lib/db/types';
import { addressSchema } from '@/lib/validation/address-validation-schema';
import { partnerSchema } from '@/lib/validation/partner-validation-schema';
import { db } from '@/server/db';

import { normalizeEventJoinRequest } from '../helpers/normalizer/n-eventJoinRequests';
import { normalizeFundraisingJoinRequest } from '../helpers/normalizer/n-fundraisingJoinRequest';
import { normalizeGrantJoinRequest } from '../helpers/normalizer/n-grantJoinRequests';
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

  getCurrentUsers: privateProcedure.query(async ({ ctx }) => {
    // const user = await ctx.prisma.user.findFirstOrThrow({
    //   where: { externalId: ctx.userId },
    // });
    // const partner = await ctx.prisma.partner.findUnique({
    //   include: {
    //     Address: true,
    //   },
    //   where: {
    //     userId: user.id,
    //   },
    // });
    const partner = await db
      .selectFrom('Partner')
      .leftJoin('User', 'User.id', 'Partner.userId')
      .rightJoin('Address', 'Address.id', 'Partner.addressId')
      .where('User.externalId', '=', ctx.userId)
      .executeTakeFirstOrThrow();
    console.log(partner);
    // dont know what but got error
    //tRPC failed on partner.getCurrentUsers: syntax error at position 12 near 'from'
    return partner as Partner;
  }),
  findAllForFundInvitation: publicProcedure
    .input(z.object({ fundId: z.string() }))
    .query(async ({ ctx, input }) => {
      const fundraising = await ctx.prisma.fundraising.findUniqueOrThrow({
        where: { id: input.fundId },
      });
      const partner = await ctx.prisma.partner.findMany({
        where: {
          NOT: {
            OR: [
              {
                FundraisingPartner: {
                  some: { fundraisingId: input.fundId },
                },
              },
              {
                Fundraisings: {
                  some: { partnerId: fundraising.partnerId },
                },
              },
            ],
          },
        },
      });

      return partner;
    }),
  findAllForEventInvitation: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUniqueOrThrow({
        where: { id: input.eventId },
      });
      const partner = await ctx.prisma.partner.findMany({
        where: {
          NOT: {
            OR: [
              {
                EventPartner: {
                  some: { eventId: input.eventId },
                },
              },
              {
                MyEvents: {
                  some: { ownerId: event.ownerId },
                },
              },
            ],
          },
        },
      });

      return partner;
    }),
  createOrUpdate: privateProcedure
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
      const partner = await ctx.prisma.partner.upsert({
        where: {
          userId: user.id,
        },
        create: {
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
        update: {
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
      // const partner =

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
        supporterId: z.string().nullable(),
        partnerId: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const fundraising = await ctx.prisma.fundraising.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (input.partnerId) {
        const partner = await ctx.prisma.partner.findUniqueOrThrow({
          where: { id: input.partnerId },
        });
        await ctx.prisma.fundraisingPartner.create({
          data: {
            status: 'pending',
            partnerId: partner.id,
            fundraisingId: fundraising.id,
            type: 'invite',
          },
        });
      }

      if (input.supporterId) {
        const supporter = await ctx.prisma.supporter.findUniqueOrThrow({
          where: { id: input.supporterId },
        });
        await ctx.prisma.fundraisingSupporter.create({
          data: {
            status: 'pending',
            supporterId: supporter.id,
            fundraisingId: fundraising.id,
            type: 'invite',
          },
        });
      }
      return { message: 'Success' };
    }),
  inviteToEvent: privateProcedure
    .input(
      z.object({
        id: z.string(),
        supporterId: z.string().nullish(),
        partnerId: z.string().nullish(),
        volunteerId: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (input.partnerId) {
        const partner = await ctx.prisma.partner.findUniqueOrThrow({
          where: { id: input.partnerId },
        });
        await ctx.prisma.eventPartner.create({
          data: {
            status: 'pending',
            partnerId: partner.id,
            eventId: event.id,
            type: 'invite',
          },
        });
      }

      if (input.supporterId) {
        const supporter = await ctx.prisma.supporter.findUniqueOrThrow({
          where: { id: input.supporterId },
        });
        await ctx.prisma.eventSupporter.create({
          data: {
            status: 'pending',
            supporterId: supporter.id,
            eventId: event.id,
            type: 'invite',
          },
        });
      }

      if (input.volunteerId) {
        const volunteer = await ctx.prisma.volunteer.findUniqueOrThrow({
          where: { id: input.volunteerId },
        });
        await ctx.prisma.eventVolunteer.create({
          data: {
            status: 'pending',
            volunteerId: volunteer.id,
            eventId: event.id,
            type: 'invite',
          },
        });
      }
      return { message: 'Success' };
    }),
});
