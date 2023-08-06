// Kysely
import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

import type { DB } from '@/lib/db/types';

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    host: 'aws.connect.psdb.cloud',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }),
});
