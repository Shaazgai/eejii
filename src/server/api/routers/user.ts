import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { z } from 'zod';

import { userSignUpSchema } from '@/lib/validation/user-schema';

import { RequestType, Role } from '@/lib/db/enums';
import { ServerSettings } from '@/lib/server-settings';
import { jsonObjectFrom } from 'kysely/helpers/postgres';
import {
  adminProcedure,
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '../trpc';

export const userRouter = createTRPCRouter({
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
  getMyDonations: privateProcedure
    .input(z.object({ limit: z.number() }))
    .query(async ({ ctx, input }) => {
      const donations = await ctx.db
        .selectFrom('Donation')
        .select(['Donation.id', 'Donation.amount', 'Donation.createdAt'])
        .select(eb => [
          jsonObjectFrom(
            eb
              .selectFrom('Fundraising')
              .selectAll()
              .select(eb2 => [
                jsonObjectFrom(
                  eb2
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'Fundraising.ownerId')
                ).as('Owner'),
              ])
              .whereRef('Fundraising.id', '=', 'Donation.fundraisingId')
          ).as('Fundraising'),
        ])
        .where('userId', '=', ctx.userId)
        .limit(input.limit)
        .execute();

      return donations;
    }),
  insertUser: publicProcedure
    .input(userSignUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { phoneNumber, email, password } = input;

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
          email: email,
          password: hashedPassword,
          phoneNumber,
          role: Role.ROLE_USER,
          requestStatus: RequestType.REQUEST_PENDING,
          type: input.userType as
            | 'USER_VOLUNTEER'
            | 'USER_PARTNER'
            | 'USER_SUPPORTER',
        })
        .returning(['email', 'type', 'id'])
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
  changeStatus: adminProcedure
    .input(z.object({ userId: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let state: string;
      if (input.status === RequestType.REQUEST_APPROVED) {
        state = RequestType.REQUEST_APPROVED;
      } else if (input.status === RequestType.REQUEST_DENIED) {
        state = RequestType.REQUEST_DENIED;
      } else {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'NOT VALID REQUEST TYPE',
        });
      }

      const user = await ctx.db
        .updateTable('User')
        .where('User.id', '=', input.userId)
        .set({ requestStatus: state as RequestType })
        .returning(['type', 'id'])
        .executeTakeFirstOrThrow();

      ctx.db
        .insertInto('Notification')
        .values({
          title: ServerSettings.NOTIFICATION[user.type].APPROVED_TITLE,
          body: ServerSettings.NOTIFICATION[user.type].APPROVED_BODY,
          receiverId: user.id,
          senderId: ctx.userId,
          status: 'new',
          type: 'request',
        })
        .execute();
      return user;
    }),
  getNotifications: privateProcedure.query(async ({ ctx }) => {
    const notifications = ctx.db
      .selectFrom('Notification')
      .selectAll()
      .where('Notification.receiverId', '=', ctx.userId)
      .orderBy('Notification.updatedAt', 'desc')
      .limit(50)
      .execute();

    return notifications;
  }),
  setSeen: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      ctx.db
        .updateTable('Notification')
        .where('id', '=', input.id)
        .set({
          status: 'seen',
          updatedAt: new Date(),
        })
        .execute();
    }),
});
