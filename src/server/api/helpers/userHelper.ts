import { prisma } from '@/server/db';

export default async function getUser({ userId }: { userId: string }) {
  return prisma.user.findUniqueOrThrow({ where: { externalId: userId } });
}
