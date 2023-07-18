import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { addressFormSchema } from '@/lib/validation/address-validation-schema';
import { volunteerFormSchema } from '@/lib/validation/volunteer-registration-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const volunteerRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const volunteer = await ctx.prisma.volunteer.findUnique({
        where: { id: input.id },
      });
      if (!volunteer) throw new TRPCError({ code: 'NOT_FOUND' });

      return volunteer;
    }),
  create: privateProcedure
    .input(volunteerFormSchema.merge(addressFormSchema))
    .mutation(async ({ input, ctx }) => {
      console.log(input.firstName);
      const user = await ctx.prisma.user.findUnique({
        where: { externalId: ctx.userId },
      });
      if (!user) throw new Error('User not found');
      const address = await ctx.prisma.address.create({
        data: {
          country: input.country,
          city: input.city,
          street: input.street,
          provinceName: input.provinceName,
        },
      });
      const volunteer = await ctx.prisma.volunteer.create({
        data: {
          firstName: input?.firstName,
          lastName: input?.lastName,
          bio: input?.bio,
          birthday: input?.birthday,
          gender: input?.gender,
          addressId: address.id,
          userId: user.id,
        },
      });
      return volunteer;
    }),
});
