import { verify } from 'argon2';
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { db } from '@/server/db';

import { loginSchema } from './validation/user-schema';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        try {
          console.log('🚀 ~ file: auth.ts:24 ~ credentials:', credentials);
          const { email, password } = await loginSchema.parseAsync(credentials);
          console.log('🚀 ~ file: auth.ts:24 ~ email:', email);

          // const result = await prisma.user.findFirst({
          //   where: { email },
          // });
          const result = await db
            .selectFrom('User')
            .where('email', '=', email)
            .selectAll()
            .executeTakeFirst();
          console.log('🚀 ~ file: auth.ts:33 ~ result:', result);

          if (!result || !result.password) return null;

          const isValidPassword = await verify(result.password, password);

          if (!isValidPassword) return null;

          return { id: result.id, email, userType: result.type };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.userType = user.userType;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.userId as string;
        session.user.email = token.email;
        session.user.userType = token.userType;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: '/signin',
    // newUser: '/signup',
    error: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};