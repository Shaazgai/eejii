import { sql } from 'kysely';
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
      .where('User.type', '=', 'volunteer')
      .selectAll()
      .execute();

    return volunteer;
  }),
  findAllForEventInvitation: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log(input.eventId);
      const query = await sql`
        SELECT u.*
        FROM User AS u 
        LEFT JOIN EventAssociation AS ea ON ea.userId = u.id 
        WHERE ea.eventId != ${input.eventId} OR ea.eventId IS NULL
        AND u.type = "volunteer"
      `.execute(ctx.db);
      console.log(query.rows);
      return query.rows;
    }),
  create: privateProcedure
    .input(volunteerSchema.merge(addressSchema))
    .mutation(async ({ input, ctx }) => {
      const address = await ctx.db
        .insertInto('Address')
        .values({
          country: input.country,
          city: input.city,
          street: input.street,
          provinceName: input.provinceName,
        })
        .returning('id')
        .executeTakeFirstOrThrow();

      const volunteer = await ctx.db
        .insertInto('User')
        .values(({ selectFrom }) => ({
          firstName: input?.firstName,
          lastName: input?.lastName,
          bio: input?.bio,
          birthday: input?.birthday,
          gender: input?.gender,
          addressId: address.id,
          type: 'volunteer',
          userId: selectFrom('User')
            .where('User.id', '=', ctx.userId)
            .select('id'),
          email: input.email,
          skills: Object.assign({}, input.skills as string[]),
          phoneNumber: input.phoneNumber,
        }));
      return volunteer;
    }),
});
