import { z } from 'zod';

import { volunteerSchema } from '@/lib/validation/volunteer-validation-schema';

import type { User } from '@/lib/db/types';
import type { ListResponse, Pagination } from '@/lib/types';
import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { getPaginationInfo } from '../helper/paginationInfo';

import { Role, UserStatus } from '@/lib/db/enums';
import { createTRPCRouter, publicProcedure } from '../trpc';

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
  register: publicProcedure
    .input(volunteerSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      const exists = await ctx.db
        .selectFrom('User')
        .where('email', '=', email)
        .selectAll()
        .executeTakeFirst();

      if (exists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists.',
        });
      }

      const hashedPassword = await hash(password);

      const user = await ctx.db
        .insertInto('User')
        .values({
          ...input,
          password: hashedPassword,
          role: Role.ROLE_USER,
          requestStatus: UserStatus.REQUEST_PENDING,
        })
        .returning(['email', 'password', 'type', 'id'])
        .executeTakeFirstOrThrow();

      ctx.db
        .insertInto('Notification')
        .values({
          title: user.email + ' wants to join Eejii.org',
          link: '/admin/users',
          receiverId: user.id,
          senderId: user.id,
          status: 'new',
          type: 'request',
        })
        .execute();

      return {
        status: 201,
        message: 'Account created successfully',
        result: user,
      };
    }),
  findAll: publicProcedure
    .input(
      z.object({ page: z.number().default(1), limit: z.number().default(20) })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.transaction().execute(async trx => {
        const volunteers = await trx
          .selectFrom('User')
          .selectAll()
          .where('User.type', '=', 'USER_VOLUNTEER')
          .limit(input.limit)
          .offset(input.limit * (input.page - 1))
          .execute();

        const { count } = await trx
          .selectFrom('User')
          .select(expressionBuilder => {
            return expressionBuilder.fn.countAll().as('count');
          })
          .where('User.type', '=', 'USER_VOLUNTEER')
          .executeTakeFirstOrThrow();
        return {
          data: volunteers,
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
});
