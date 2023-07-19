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
});
