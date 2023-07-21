import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { addressSchema } from '@/lib/validation/address-validation-schema';
import { supporterSchema } from '@/lib/validation/partner-validation-schema';

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
  getRequestsOrInvitations: privateProcedure
    .input(
      z.object({
        projectType: z.string(),
        requestType: z.string(),
        status: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: { externalId: ctx.userId },
      });
      const supporter = await ctx.prisma.supporter.findUniqueOrThrow({
        where: { userId: user.id },
      });

      if (input.projectType === 'event') {
        const eventSupporter = await ctx.prisma.eventSupporter.findMany({
          where: {
            supporterId: supporter.id,
            type: input.requestType,
          },
        });
        console.log(eventSupporter);
        return eventSupporter;
      } else if (input.projectType === 'fundraising') {
        const fundraisingSupporter =
          await ctx.prisma.fundraisingSupporter.findMany({
            where: {
              supporterId: supporter.id,
              type: input.requestType,
            },
          });
        return fundraisingSupporter;
      } else if (input.projectType === 'grantFundraising') {
        const grantFundraisingSupporter =
          await ctx.prisma.grantFundraisingSupporter.findMany({
            where: {
              supporterId: supporter.id,
              type: input.requestType,
            },
          });
        return grantFundraisingSupporter;
      }
      throw new TRPCError({ message: 'Requests not found', code: 'NOT_FOUND' });
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
      const supporter = await ctx.prisma.supporter.findUniqueOrThrow({
        where: { userId: user.id },
      });

      const grantFundraisingPartner =
        await ctx.prisma.grantFundraisingPartner.findMany({
          where: {
            GrantFundraising: {
              ownerId: supporter.id,
            },
            type: input.requestType,
          },
        });
      const grantFundraisingSupporter =
        await ctx.prisma.grantFundraisingSupporter.findMany({
          where: {
            GrantFundraising: {
              ownerId: supporter.id,
            },
            type: input.requestType,
          },
        });
      return {
        partners: grantFundraisingPartner,
        supporters: grantFundraisingSupporter,
      };
    }),
  handleRequest: privateProcedure
    .input(z.object({ id: z.string(), type: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (input.type === 'event') {
        const eventVolunteer = await ctx.prisma.eventVolunteer.update({
          where: {
            id: input.id,
          },
          data: {
            status: input.status,
          },
        });
        return eventVolunteer;
      } else if (input.type === 'fundraising') {
        const fundraisingPartner = await ctx.prisma.fundraisingPartner.update({
          where: {
            id: input.id,
          },
          data: {
            status: input.status,
          },
        });
        return fundraisingPartner;
      } else if (input.type === 'grantFundraising') {
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
        const supporter = await ctx.prisma.supporter.findUniqueOrThrow({
          where: { id: partnerId },
        });
        await ctx.prisma.fundraisingPartner.create({
          data: {
            status: 'pending',
            partnerId: supporter.id,
            fundraisingId: fundraising.id,
          },
        });
      });

      return { message: 'Success' };
    }),
});
