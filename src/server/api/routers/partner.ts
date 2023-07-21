import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { addressSchema } from '@/lib/validation/address-validation-schema';
import { partnerSchema } from '@/lib/validation/partner-validation-schema';

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
  getJoinRequests: privateProcedure
    .input(z.object({ type: z.string(), status: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: { externalId: ctx.userId },
      });
      const partner = await ctx.prisma.partner.findUniqueOrThrow({
        where: { userId: user.id },
      });
      if (input.type === 'event ') {
        const event = await ctx.prisma.event.findMany({
          include: {
            EventPartner: true,
            EventSupporter: true,
            EventVolunteer: true,
          },
          where: { ownerId: partner.id },
        });
        // const eventVolunteer = await ctx.prisma.eventVolunteer.findMany({
        //   where: { eventId: input.projectId },
        // });
        return event;
      }
      return;
      //  else if (input.type === 'fundraising') {
      //   const fundraisingPartner =
      //     await ctx.prisma.fundraisingPartner.findUniqueOrThrow({
      //       where: { id: input.projectId },
      //     });
      //   return fundraisingPartner;
      // } else if (input.type === 'grantFundraising') {
      //   const grantFundraising =
      //     await ctx.prisma.grantFundraisingPartner.findUniqueOrThrow({
      //       where: { id: input.projectId },
      //     });
      //   return grantFundraising;
      // }
    }),
});
