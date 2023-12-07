import { z } from 'zod';

import { addressSchema } from '@/lib/validation/address-validation-schema';
import { supporterSchema } from '@/lib/validation/partner-validation-schema';

import type { User } from '@/lib/db/types';
import type { ListResponse, Pagination } from '@/lib/types';
import { getPaginationInfo } from '../helper/paginationInfo';
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
  findAll: publicProcedure
    .input(
      z.object({ page: z.number().default(1), limit: z.number().default(20) })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.transaction().execute(async trx => {
        const supporters = await trx
          .selectFrom('User')
          .where('User.type', '=', 'USER_SUPPORTER')
          .selectAll()
          .limit(input.limit)
          .offset(input.limit * (input.page - 1))
          .execute();

        const { count } = await trx
          .selectFrom('User')
          .select(expressionBuilder => {
            return expressionBuilder.fn.countAll().as('count');
          })
          .where('User.type', '=', 'USER_SUPPORTER')
          .executeTakeFirstOrThrow();

        return {
          data: supporters,
          count,
        };
      });

      const totalCount = result.count as number;
      const paginationInfo: Pagination = getPaginationInfo({
        totalCount: totalCount,
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
