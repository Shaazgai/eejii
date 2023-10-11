import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { z } from 'zod';

import { userSignUpSchema } from '@/lib/validation/user-schema';

import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';
import { RequestType } from '@/lib/db/enums';

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
        .selectAll()
        .where('userId', '=', ctx.userId)
        .limit(input.limit)
        .execute();

      return donations;
    }),
  insertUser: publicProcedure
    .input(userSignUpSchema)
    .mutation(async ({ ctx, input }) => {
      console.log('🚀 ~ file: user.ts:24 ~ .mutation ~ input:', input);
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
      console.log(
        '🚀 ~ file: user.ts:41 ~ .mutation ~ hashedPassword:',
        hashedPassword
      );

      const user = await ctx.db
        .insertInto('User')
        .values({
          email: email,
          password: hashedPassword,
          phoneNumber,
          requestStatus: RequestType.REQUEST_PENDING,
          type: input.userType as
            | 'USER_VOLUNTEER'
            | 'USER_PARTNER'
            | 'USER_SUPPORTER',
        })
        .returning('email')
        .executeTakeFirst();
      console.log('🚀 ~ file: user.ts:54 ~ .mutation ~ user:', user);

      return {
        status: 201,
        message: 'Account created successfully',
        result: user,
      };
    }),
  changeStatus: publicProcedure // Must be admin procedure
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
        .returning('id')
        .executeTakeFirstOrThrow();

      return user;
    }),
});
