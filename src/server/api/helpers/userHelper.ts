import { db } from '@/server/db';

export default async function getUser({ userId }: { userId: string }) {
  return db
    .selectFrom('User')
    .selectAll()
    .where('User.externalId', '=', userId)
    .execute();
}
