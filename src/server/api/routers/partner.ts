import { sql } from 'kysely';
import { z } from 'zod';

import type { Partner } from '@/lib/db/types';
import { addressSchema } from '@/lib/validation/address-validation-schema';
import { partnerSchema } from '@/lib/validation/partner-validation-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const partnerRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const partner = await ctx.db
        .selectFrom('User')
        .selectAll()
        .where('id', '=', input.id)
        .executeTakeFirstOrThrow();

      return partner;
    }),
  findAllForFundInvitation: publicProcedure
    .input(z.object({ fundId: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = await sql`
        SELECT u.*
        FROM User u
        LEFT JOIN FundAssociation as fa ON fp.userId = u.id
        WHERE fa.fundraisingId != ${input.fundId} OR fa.fundraisingId IS NULL
        AND u.id != ${sql.raw(
          `(SELECT f.ownerId FROM Fundraising AS f WHERE f.id = "${input.fundId}")`
        )}
        AND u.type = "partner"
        `.execute(ctx.db);

      return query.rows as Partner[];
    }),
  findAllForEventInvitation: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = await sql`
        SELECT p.*
        FROM Partner p
        LEFT JOIN EventPartner as ep ON ep.partnerId = p.id
        WHERE ep.eventId != ${input.eventId} OR ep.eventId IS NULL
        AND p.id != ${sql.raw(
          `(SELECT e.ownerId FROM Event AS e WHERE e.id = "${input.eventId}")`
        )}
        `.execute(ctx.db);

      return query.rows as Partner[];
    }),
  create: privateProcedure
    .input(partnerSchema.merge(addressSchema))
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

      const partner = await ctx.db
        .insertInto('Partner')
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
          userId: selectFrom('User').where('externalId', '=', ctx.userId),
          addressId: address?.id,
        }))
        .returningAll()
        .executeTakeFirstOrThrow();

      return partner;
    }),
  handleEventRequest: privateProcedure
    .input(
      z.object({ id: z.string(), userType: z.string(), status: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.userType === 'partner') {
        ctx.db
          .updateTable('EventPartner')
          .where('id', '=', input.id)
          .set({
            status: input.status,
          })
          .execute();
      } else if (input.userType === 'supporter') {
        ctx.db
          .updateTable('EventSupporter')
          .where('id', '=', input.id)
          .set({
            status: input.status,
          })
          .execute();
      } else {
        ctx.db
          .updateTable('EventVolunteer')
          .where('id', '=', input.id)
          .set({
            status: input.status,
          })
          .execute();
      }
      return { message: 'Success' };
    }),
  handleFundRequest: privateProcedure
    .input(
      z.object({ id: z.string(), userType: z.string(), status: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.userType === 'partner') {
        ctx.db
          .updateTable('FundraisingPartner')
          .where('id', '=', input.id)
          .set({
            status: input.status,
          })
          .returning('id')
          .execute();
        return { message: 'Success' };
      } else if (input.userType === 'supporter') {
        ctx.db
          .updateTable('FundraisingSupporter')
          .where('id', '=', input.id)
          .set({
            status: input.status,
          })
          .returning('id')
          .execute();
        return { message: 'Success' };
      }
    }),

  inviteToFundraising: privateProcedure
    .input(
      z.object({
        id: z.string(),
        supporterId: z.string().nullable(),
        partnerId: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.supporterId) {
        ctx.db
          .insertInto('FundraisingSupporter')
          .values({
            status: 'pending',
            type: 'invitation',
            supporterId: input.supporterId,
            fundraisingId: input.id,
          })
          .returning('id')
          .executeTakeFirstOrThrow();
      } else if (input.partnerId) {
        ctx.db
          .insertInto('FundraisingPartner')
          .values({
            status: 'pending',
            type: 'invitation',
            partnerId: input.partnerId,
            fundraisingId: input.id,
          })
          .returning('id')
          .executeTakeFirstOrThrow();
      }
      return { message: 'Success' };
    }),
  inviteToEvent: privateProcedure
    .input(
      z.object({
        id: z.string(),
        supporterId: z.string().nullish(),
        partnerId: z.string().nullish(),
        volunteerId: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.supporterId) {
        ctx.db
          .insertInto('EventSupporter')
          .values({
            status: 'pending',
            type: 'invitation',
            supporterId: input.supporterId,
            eventId: input.id,
          })
          .returning('id')
          .executeTakeFirstOrThrow();
      } else if (input.partnerId) {
        ctx.db
          .insertInto('EventPartner')
          .values({
            status: 'pending',
            type: 'invitation',
            partnerId: input.partnerId,
            eventId: input.id,
          })
          .returning('id')
          .executeTakeFirstOrThrow();
      } else if (input.volunteerId) {
        ctx.db
          .insertInto('EventVolunteer')
          .values({
            status: 'pending',
            type: 'invitation',
            volunteerId: input.volunteerId,
            eventId: input.id,
          })
          .returning('id')
          .executeTakeFirstOrThrow();
      }
      return { message: 'Success' };
    }),
});
