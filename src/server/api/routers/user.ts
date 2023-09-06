import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { z } from 'zod';

import { userSignUpSchema } from '@/lib/validation/user-schema';

import { createTRPCRouter, publicProcedure } from '../trpc';

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
});
