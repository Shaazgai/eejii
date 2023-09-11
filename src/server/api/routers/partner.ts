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
  findAll: publicProcedure.query(async ({ ctx }) => {
    const supporter = await ctx.db
      .selectFrom('User')
      .where('User.type', '=', 'USER_PARTNER')
      .selectAll()
      .execute();

    return supporter;
  }),
  register: privateProcedure
    .input(partnerSchema.merge(addressSchema))
    .mutation(async ({ input, ctx }) => {
      const partner = await ctx.db
        .updateTable('User')
        .where('id', '=', input.id)
        .set({
          organization: input.organization,
          email: input.email,
          bio: input.bio,
          type: 'USER_PARTNER',
          contact: {
            twitter: input.contact.twitter,
            facebook: input.contact.facebook,
            instagram: input.contact.instagram,
            phone_primary: input.contact.phone_secondary,
            phone_secondary: input.contact.phone_secondary,
          },
          phoneNumber: input.phoneNumber,
        })
        .returning('id')
        .executeTakeFirstOrThrow();

      await ctx.db
        .insertInto('Address')
        .values({
          id: partner.id,
          country: input.country,
          city: input.city,
          street: input.street,
          provinceName: input.provinceName,
        })
        .returning('id')
        .executeTakeFirstOrThrow();

      return partner;
    }),
});
