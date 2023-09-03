import { sql } from 'kysely';
import { z } from 'zod';

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
  findAllForFundInvitation: publicProcedure // Find all partners for fundraising to invite them
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

      return query.rows;
    }),
  findAllForEventInvitation: publicProcedure // Find all partners for event to invite them
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = await sql`
        SELECT u.*
        FROM User u
        LEFT JOIN EventAssociation as ea ON ea.userId = u.id
        WHERE ea.eventId != ${input.eventId} OR ea.eventId IS NULL
        AND u.id != ${sql.raw(
          `(SELECT e.ownerId FROM Event AS e WHERE e.id = "${input.eventId}")`
        )}
        AND 
        `.execute(ctx.db);

      return query.rows;
    }),
  findAllForGrantInvitation: publicProcedure // Find all partners for event to invite them
    .input(z.object({ grantId: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = await sql`
        SELECT u.*
        FROM User u
        LEFT JOIN GrantAssociation as ga ON ga.userId = u.id
        WHERE ga.grantId != ${input.grantId} OR ga.grantId IS NULL
        AND u.id != ${sql.raw(
          `(SELECT g.ownerId FROM GrantFundraising AS g WHERE g.id = "${input.grantId}")`
        )}
        AND 
        `.execute(ctx.db);

      return query.rows;
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
        .insertInto('User')
        .values(() => ({
          organization: input.organization,
          email: input.email,
          bio: input.email,
          type: 'partner',
          contact: {
            twitter: input.contact.twitter,
            facebook: input.contact.facebook,
            instagram: input.contact.instagram,
            phone_primary: input.contact.phone_secondary,
            phone_secondary: input.contact.phone_secondary,
          },
          phoneNumber: input.phoneNumber,
          addressId: address?.id,
        }))
        .returningAll()
        .executeTakeFirstOrThrow();

      return partner;
    }),
  handleGrantRequest: privateProcedure // Owner of the grant will handle the request of it's invitation
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
  handleEventRequest: privateProcedure // Owner of the event will handle the request of it's invitation
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
  handleFundRequest: privateProcedure // Owner of the fund will handle the request of it's invitation
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
  inviteToFundraising: privateProcedure // Owner of the fund will invite partner
    .input(
      z.object({
        id: z.string(),
        userId: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      ctx.db
        .insertInto('FundAssociation')
        .values({
          status: 'pending',
          type: 'invitation',
          userId: input.userId,
          fundraisingId: input.id,
        })
        .returning('id')
        .executeTakeFirstOrThrow();
      return { message: 'Success' };
    }),
  inviteToEvent: privateProcedure // Owner of the fund will invite partner
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      ctx.db
        .insertInto('EventAssociation')
        .values({
          status: 'pending',
          type: 'invitation',
          userId: input.userId,
          eventId: input.id,
        })
        .returning('id')
        .executeTakeFirstOrThrow();
      return { message: 'Success' };
    }),
  inviteToGrant: privateProcedure // Owner of the grant will invite partner
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      ctx.db
        .insertInto('GrantAssociation')
        .values({
          status: 'pending',
          type: 'invitation',
          userId: input.userId,
          grantId: input.id,
        })
        .returning('id')
        .executeTakeFirstOrThrow();
      return { message: 'Success' };
    }),
});
