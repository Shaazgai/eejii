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
      .where('User.type', '=', 'USER_SUPPORTER')
      .selectAll()
      .execute();

    return supporter;
  }),
  register: privateProcedure
    .input(supporterSchema.merge(addressSchema))
    .mutation(async ({ input, ctx }) => {
      const supporter = await ctx.db
        .updateTable('User')
        .where('id', '=', input.id)
        .set({
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
        })
        .returning('id')
        .executeTakeFirstOrThrow();

      await ctx.db
        .insertInto('Address')
        .values({
          userId: supporter.id,
          country: input.country,
          city: input.city,
          street: input.street,
          provinceName: input.provinceName,
        })
        .returning('id')
        .executeTakeFirstOrThrow();

      return supporter;
    }),
});
