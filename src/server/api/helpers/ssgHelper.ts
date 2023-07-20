import { createServerSideHelpers } from '@trpc/react-query/dist/server';
import superjson from 'superjson';

import { prisma } from '@/server/db';

import { appRouter } from '../root';

export const generateSSGHelper = createServerSideHelpers({
  router: appRouter,
  ctx: { prisma, userId: null },
  transformer: superjson, // optional - adds superjson serialization
});
