import { sql } from 'kysely';
import { z } from 'zod';

import type { Volunteer } from '@/lib/db/types';
import { addressSchema } from '@/lib/validation/address-validation-schema';
import { volunteerSchema } from '@/lib/validation/volunteer-registration-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const volunteerRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const volunteer = await ctx.db
        .selectFrom('Volunteer')
        .selectAll()
        .where('id', '=', input.id)
        .executeTakeFirstOrThrow();

      return volunteer;
    }),
  getCurrentUsers: privateProcedure.query(async ({ ctx }) => {
    const volunteer = await ctx.db
      .selectFrom('Volunteer')
      .selectAll()
      .leftJoin('User', 'User.id', 'Volunteer.userId')
      .rightJoin('Address', 'Address.id', 'Volunteer.addressId')
      .where('User.externalId', '=', ctx.userId)
      .executeTakeFirstOrThrow();
    return volunteer;
  }),
  findAll: publicProcedure.query(async ({ ctx }) => {
    const volunteer = await ctx.db
      .selectFrom('Volunteer')
      .selectAll()
      .execute();

    return volunteer;
  }),
  findAllForEventInvitation: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log(input.eventId);
      const query = await sql`
        SELECT v.*
        FROM Volunteer AS s 
        LEFT JOIN EventVolunteer AS ev ON ev.volunteerId = v.id 
        WHERE ev.eventId != ${input.eventId} OR ev.eventId IS NULL
      `.execute(ctx.db);
      console.log(query.rows);
      return query.rows as Volunteer[];
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
        .insertInto('Volunteer')
        .values(({ selectFrom }) => ({
          firstName: input?.firstName,
          lastName: input?.lastName,
          bio: input?.bio,
          birthday: input?.birthday,
          gender: input?.gender,
          addressId: address.id,
          userId: selectFrom('User')
            .where('User.externalId', '=', ctx.userId)
            .select('id'),
          email: input.email,
          skills: Object.assign({}, input.skills as string[]),
          phoneNumbers: {
            primary_phone: input.primary_phone,
            secondary_phone: input.secondary_phone,
          },
        }));
      return volunteer;
    }),
});
