import { PrismaClient } from '@prisma/client';

import env from '@/env.mjs';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Kysely
import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

import type { DB } from '@/lib/db/types';

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
    // host: 'aws.connect.psdb.cloud',
    // username: process.env.DATABASE_USERNAME,
    // password: process.env.DATABASE_PASSWORD,
  }),
});
