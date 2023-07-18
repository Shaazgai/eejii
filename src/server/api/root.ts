import { supporterRouter } from '@/server/api/routers/supporter';
import { createTRPCRouter } from '@/server/api/trpc';

import { partnerRouter } from './routers/partner';
import { volunteerRouter } from './routers/volunteer';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  supporter: supporterRouter,
  volunteer: volunteerRouter,
  partner: partnerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
