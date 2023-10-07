import { z } from 'zod';

import { addressSchema } from '@/lib/validation/address-validation-schema';
import { volunteerSchema } from '@/lib/validation/volunteer-registration-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const volunteerRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const volunteer = await ctx.db
        .selectFrom('User')
        .selectAll()
        .where('id', '=', input.id)
        .executeTakeFirstOrThrow();

      return volunteer;
    }),
  findAll: publicProcedure.query(async ({ ctx }) => {
    const volunteer = await ctx.db
      .selectFrom('User')
      .where('User.type', '=', 'USER_VOLUNTEER')
      .selectAll()
      .execute();

    return volunteer;
  }),
  register: privateProcedure
    .input(volunteerSchema.merge(addressSchema))
    .mutation(async ({ input, ctx }) => {
      const volunteer = await ctx.db
        .updateTable('User')
        .where('id', '=', input.id)
        .set({
          firstName: input.firstName,
          lastName: input.lastName,
          bio: input.bio,
          birthday: input.birthday,
          gender: input.gender,
          type: 'USER_VOLUNTEER',
          email: input.email,
          // skills: Object.assign({}, input.skills as string[]),
          phoneNumber: input.phoneNumber,
        })
        .returning('id')
        .executeTakeFirstOrThrow();

      await ctx.db
        .insertInto('Address')
        .values({
          userId: volunteer.id,
          country: input.country,
          city: input.city,
          street: input.street,
          provinceName: input.provinceName,
        })
        .returning('id')
        .executeTakeFirstOrThrow();

      return volunteer;
    }),
});
