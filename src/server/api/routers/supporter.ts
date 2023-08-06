import { sql } from 'kysely';
import { z } from 'zod';

import type { Supporter } from '@/lib/db/types';
import { addressSchema } from '@/lib/validation/address-validation-schema';
import { supporterSchema } from '@/lib/validation/partner-validation-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const supporterRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const supporter = await ctx.db
        .selectFrom('Supporter')
        .selectAll()
        .where('id', '=', input.id)
        .executeTakeFirstOrThrow();

      return supporter;
    }),
  getCurrentUsers: privateProcedure.query(async ({ ctx }) => {
    const supporter = await ctx.db
      .selectFrom('Supporter')
      .selectAll()
      .leftJoin('User', 'User.id', 'Supporter.userId')
      .rightJoin('Address', 'Address.id', 'Supporter.addressId')
      .where('User.externalId', '=', ctx.userId)
      .executeTakeFirstOrThrow();
    return supporter;
  }),
  findAll: publicProcedure.query(async ({ ctx }) => {
    const supporter = await ctx.db
      .selectFrom('Supporter')
      .selectAll()
      .execute();

    return supporter;
  }),
  findAllForFundInvitation: publicProcedure
    .input(z.object({ fundId: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = await sql`
        SELECT s.*
        FROM Supporter AS s 
        LEFT JOIN FundraisingSupporter AS fs ON fs.supporterId = s.id
        WHERE fs.fundraisingId != ${input.fundId} OR fs.fundraisingId IS NULL
      `.execute(ctx.db);

      return query.rows as Supporter[];
    }),
  findAllForEventInvitation: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log(input.eventId);
      const query = await sql`
        SELECT s.*
        FROM Supporter AS s 
        LEFT JOIN EventSupporter AS es ON es.supporterId = s.id 
        WHERE es.eventId != ${input.eventId} OR es.eventId IS NULL
      `.execute(ctx.db);
      console.log(query.rows);
      return query.rows as Supporter[];
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
        .insertInto('Supporter')
        .values(({ selectFrom }) => ({
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
          userId: selectFrom('User')
            .where('externalId', '=', ctx.userId)
            .select('User.id'),
          addressId: address?.id,
        }))
        .returning('id')
        .executeTakeFirstOrThrow();

      return supporter;
    }),
  handleGrantRequest: privateProcedure
    .input(
      z.object({ id: z.string(), userType: z.string(), status: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.userType === 'partner') {
        ctx.db
          .updateTable('GrantFundraisingPartner')
          .where('id', '=', input.id)
          .set({
            status: input.status,
          })
          .returning('id')
          .executeTakeFirstOrThrow();
      } else if (input.userType === 'supporter') {
        ctx.db
          .updateTable('GrantFundraisingPartner')
          .where('id', '=', input.id)
          .set({
            status: input.status,
          })
          .returning('id')
          .executeTakeFirstOrThrow();
      }
      return { message: 'Success' };
    }),
});
