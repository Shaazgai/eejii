import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { addressSchema } from '@/lib/validation/address-validation-schema';
import { volunteerSchema } from '@/lib/validation/volunteer-registration-schema';

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
  getByUserId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const volunteer = await ctx.prisma.volunteer.findUnique({
        where: {
          userId: input.id,
        },
      });
      if (!volunteer) throw new TRPCError({ code: 'NOT_FOUND' });

      return volunteer;
    }),
  findAll: publicProcedure.query(async ({ ctx }) => {
    const volunteer = await ctx.prisma.volunteer.findMany({});

    return volunteer;
  }),
  findAllForEventInvitation: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const volunteer = await ctx.prisma.volunteer.findMany({
        where: {
          NOT: {
            OR: [
              {
                EventVolunteer: {
                  some: { eventId: input.eventId },
                },
              },
            ],
          },
        },
      });

      return volunteer;
    }),
  create: privateProcedure
    .input(volunteerSchema.merge(addressSchema))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.update({
        where: { externalId: ctx.userId },
        data: {
          type: 'volunteer',
        },
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
          email: input.email,
          phoneNumbers: {
            primary_phone: input.primary_phone,
            secondary_phone: input.secondary_phone,
          },
        },
      });
      return volunteer;
    }),
});
