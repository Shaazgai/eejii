import { sql } from 'kysely';
import { z } from 'zod';

import { addressSchema } from '@/lib/validation/address-validation-schema';
import { supporterSchema } from '@/lib/validation/partner-validation-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const supporterRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const supporter = await ctx.db
        .selectFrom('User')
        .selectAll()
        .where('id', '=', input.id)
        .executeTakeFirstOrThrow();

      return supporter;
    }),
  findAll: publicProcedure.query(async ({ ctx }) => {
    const supporter = await ctx.db
      .selectFrom('User')
      .where('User.type', '=', 'supporter')
      .selectAll()
      .execute();

    return supporter;
  }),
  findAllForFundInvitation: publicProcedure
    .input(z.object({ fundId: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = await sql`
        SELECT u.*
        FROM User AS u 
        LEFT JOIN FundAssociation AS fa ON fa.userId = u.id
        WHERE fa.fundraisingId != ${input.fundId} OR fa.fundraisingId IS NULL
      `.execute(ctx.db);

      return query.rows;
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
      `.execute(ctx.db);
      console.log(query.rows);
      return query.rows;
    }),
  create: privateProcedure
    .input(supporterSchema.merge(addressSchema))
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

      const supporter = await ctx.db
        .insertInto('User')
        .values(({ selectFrom }) => ({
          organization: input.organization,
          email: input.email,
          bio: input.email,
          contact: {
            twitter: input.contact.twitter,
            facebook: input.contact.facebook,
            instagram: input.contact.instagram,
            phone_primary: input.contact.phone_primary,
            phone_secondary: input.contact.phone_secondary,
          },
          phoneNumber: input.phoneNumber,
          addressId: address?.id,
        }))
        .returning('id')
        .executeTakeFirstOrThrow();

      return supporter;
    }),
  handleGrantRequest: privateProcedure
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      ctx.db
        .updateTable('GrantAssociation')
        .where('id', '=', input.id)
        .set({
          status: input.status,
        })
        .returning('id')
        .executeTakeFirstOrThrow();
      return { message: 'Success' };
    }),
  handleEventRequest: privateProcedure
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      ctx.db
        .updateTable('EventAssociation')
        .where('id', '=', input.id)
        .set({
          status: input.status,
        })
        .execute();
      return { message: 'Success' };
    }),
  handleFundRequest: privateProcedure
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      ctx.db
        .updateTable('FundAssociation')
        .where('id', '=', input.id)
        .set({
          status: input.status,
        })
        .returning('id')
        .execute();
      return { message: 'Success' };
    }),
});
