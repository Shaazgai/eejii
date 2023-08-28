// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import type { DefaultSession, DefaultUser } from 'next-auth';
import type * as jwt from 'next-auth/jwt';

import type { Role } from './db/enums';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: Role;
      name: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: Role;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends jwt.DefaultJWT {
    role: Role;
  }
}
