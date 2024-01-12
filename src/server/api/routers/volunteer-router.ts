import { z } from 'zod';

import { volunteerSchema } from '@/lib/validation/volunteer-validation-schema';

import type { User } from '@/lib/db/types';
import type { ListResponse, Pagination } from '@/lib/types';
import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { getPaginationInfo } from '../helper/paginationInfo';

import { Role, UserStatus } from '@/lib/db/enums';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

export const volunteerRouter = createTRPCRouter({
  findById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const volunteer = await ctx.db
        .selectFrom('User')
        .selectAll()
        .select(eb => [
          jsonArrayFrom(
            eb
              .selectFrom('UserImage')
              .selectAll()
              .whereRef('User.id', '=', 'UserImage.ownerId')
          ).as('Images'),
        ])
        .where('id', '=', input.id)
        .executeTakeFirstOrThrow();

      return volunteer;
    }),
  register: publicProcedure
    .input(volunteerSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      const mutation = await ctx.db.transaction().execute(async trx => {
        const exists = await trx
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

        const plan = await trx
          .selectFrom('UserPlan')
          .select('id')
          .where('code', '=', 'free')
          .executeTakeFirstOrThrow();
        const partnerPlan = await trx
          .insertInto('PartnerPlan')
          .values({
            planId: plan.id,
            startDate: new Date(),
            endDate: new Date(100),
          })
          .returning('id')
          .executeTakeFirstOrThrow();

        const user = await trx
          .insertInto('User')
          .values({
            ...input,
            partnerPlanId: partnerPlan.id,
            password: hashedPassword,
            role: Role.ROLE_USER,
            requestStatus: UserStatus.REQUEST_PENDING,
          })
          .returning(['email', 'password', 'type', 'id'])
          .executeTakeFirstOrThrow();

        trx
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
        return user;
      });

      return {
        status: 201,
        message: 'Account created successfully',
        result: mutation,
      };
    }),
  findAll: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(20),
        search: z.string().nullish(),
        status: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.transaction().execute(async trx => {
        let query = trx
          .selectFrom('User')
          .selectAll()
          .where('User.type', '=', 'USER_VOLUNTEER');

        if (input.status) {
          query = query.where(
            'User.requestStatus',
            '=',
            input.status as UserStatus
          );
        }
        if (input.search) {
          query = query.where(eb =>
            eb.or([
              eb('User.email', 'like', '%' + input.search + '%'),
              eb('User.phoneNumber', 'like', '%' + input.search + '%'),
              eb('User.organizationName', 'like', '%' + input.search + '%'),
              eb('User.firstName', 'like', '%' + input.search + '%'),
              eb('User.lastName', 'like', '%' + input.search + '%'),
            ])
          );
        }
        const volunteers = await query
          .limit(input.limit)
          .offset(input.limit * (input.page - 1))
          .orderBy('User.createdAt desc')
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
