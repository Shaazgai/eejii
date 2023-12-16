import { z } from 'zod';

import { addressSchema } from '@/lib/validation/address-validation-schema';
import { partnerSchema } from '@/lib/validation/partner-validation-schema';

import type { User } from '@/lib/db/types';
import type { ListResponse, Pagination } from '@/lib/types';
import { createPresignedUrl } from '../helper/imageHelper';
import { getPaginationInfo } from '../helper/paginationInfo';
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
  findAll: publicProcedure
    .input(
      z.object({ page: z.number().default(1), limit: z.number().default(20) })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.transaction().execute(async trx => {
        const partners = await trx
          .selectFrom('User')
          .where('User.type', '=', 'USER_PARTNER')
          .selectAll()
          .limit(input.limit)
          .offset(input.limit * (input.page - 1))
          .execute();

        const { count } = await trx
          .selectFrom('User')
          .select(expressionBuilder => {
            return expressionBuilder.fn.countAll().as('count');
          })
          .where('User.type', '=', 'USER_PARTNER')
          .executeTakeFirstOrThrow();

        return {
          data: partners,
          count,
        };
      });

      const paginationInfo: Pagination = getPaginationInfo({
        totalCount: result.count as number,
        limit: input.limit,
        page: input.page,
      });
      const response: ListResponse<User> = {
        items: result.data as unknown as User[],
        pagination: paginationInfo,
      };
      return response;
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
  updateBio: privateProcedure
    .input(
      z.object({
        organization: z.string(),
        address: z.string(),
        bio: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db
        .updateTable('User')
        .where('User.id', '=', ctx.userId)
        .set({
          organization: input.organization,
          bio: input.bio,
          addressShort: input.address,
        })
        .returning(['User.id'])
        .executeTakeFirstOrThrow();
      return user;
    }),
  updateContact: privateProcedure
    .input(
      z.object({
        contact: z.object({
          phone: z.string().nullish(),
          email: z.string().nullish(),
          facebookUrl: z.string().nullish(),
          instagramUrl: z.string().nullish(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .updateTable('User')
        .where('User.id', '=', ctx.userId)
        .set({
          contact: input.contact,
        })
        .execute();
    }),
  createPresignedUrl: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        type: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const exists = await ctx.db
        .selectFrom('UserImage')
        .select('id')
        .where('UserImage.ownerId', '=', ctx.userId)
        .where('UserImage.type', '=', input.type)
        .executeTakeFirst();

      if (exists) {
        ctx.db
          .deleteFrom('UserImage')
          .where('UserImage.id', '=', exists.id)
          .execute();
      }
      const userImage = await ctx.db
        .insertInto('UserImage')
        .values({
          ownerId: input.userId,
          type: input.type,
          path: `uploads/user/${input.name}`,
        })
        .returning(['path'])
        .executeTakeFirstOrThrow();

      const res = await createPresignedUrl(userImage.path, input.contentType);

      return {
        data: res,
        fileName: input.name,
      };
    }),
});
