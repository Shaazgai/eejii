import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import type { UserType } from '@/lib/db/enums';
import { UserStatus } from '@/lib/db/enums';
import { ServerSettings } from '@/lib/server-settings';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import {
  adminProcedure,
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '../trpc';
// import { volunteerSchema } from '@/lib/validation/volunteer-registration-schema';

export const userRouter = createTRPCRouter({
  getMe: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.db
      .selectFrom('User')
      .selectAll('User')
      .select(eb => [
        jsonArrayFrom(
          eb
            .selectFrom('UserImage')
            .selectAll()
            .whereRef('User.id', '=', 'UserImage.ownerId')
        ).as('Image'),
      ])
      .where('id', '=', ctx.userId)
      .executeTakeFirstOrThrow();

    return user;
  }),

  findById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const volunteer = await ctx.db
        .selectFrom('User')
        .selectAll()
        .where('id', '=', input.id)
        .executeTakeFirstOrThrow();

      return volunteer;
    }),
  findUsersToInvite: publicProcedure // Find all partners for event to invite them
    .input(z.object({ userType: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = await ctx.db
        .selectFrom('User')
        .selectAll('User')
        .where('User.id', '!=', ctx.userId as string)
        .where('User.type', '=', input.userType as UserType)
        .execute();

      return query;
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
              .selectFrom('Project')
              .selectAll()
              .select(eb2 => [
                jsonObjectFrom(
                  eb2
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'Project.ownerId')
                ).as('Owner'),
              ])
              .whereRef('Project.id', '=', 'Donation.projectId')
          ).as('Project'),
        ])
        .where('userId', '=', ctx.userId)
        .limit(input.limit)
        .execute();

      return donations;
    }),
  // insertUser: publicProcedure
  //   .input(volunteerSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     const { email, password } = input;

  //     const exists = await ctx.db
  //       .selectFrom('User')
  //       .where('email', '=', email)
  //       .selectAll()
  //       .executeTakeFirst();

  //     if (exists) {
  //       throw new TRPCError({
  //         code: 'CONFLICT',
  //         message: 'User already exists.',
  //       });
  //     }

  //     const hashedPassword = await hash(password);

  //     const user = await ctx.db
  //       .insertInto('User')
  //       .values({
  //         ...input,
  //         password: hashedPassword,
  //         role: Role.ROLE_USER,
  //         requestStatus: UserStatus.REQUEST_PENDING,
  //       })
  //       .returning(['email', 'password', 'type', 'id'])
  //       .executeTakeFirstOrThrow();

  //     ctx.db
  //       .insertInto('Notification')
  //       .values({
  //         title: user.email + ' wants to join Eejii.org',
  //         link: '/admin/users',
  //         receiverId: user.id,
  //         senderId: user.id,
  //         status: 'new',
  //         type: 'request',
  //       })
  //       .execute();

  //     return {
  //       status: 201,
  //       message: 'Account created successfully',
  //       result: user,
  //     };
  //   }),
  changeStatus: adminProcedure
    .input(z.object({ userId: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let state: string;
      if (input.status === UserStatus.REQUEST_APPROVED) {
        state = UserStatus.REQUEST_APPROVED;
      } else if (input.status === UserStatus.REQUEST_DENIED) {
        state = UserStatus.REQUEST_DENIED;
      } else {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'NOT VALID REQUEST TYPE',
        });
      }

      const user = await ctx.db
        .updateTable('User')
        .where('User.id', '=', input.userId)
        .set({ requestStatus: state as UserStatus })
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
  deleteImage: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .deleteFrom('UserImage')
        .where('UserImage.id', '=', input.id)
        .execute();
    }),
});
