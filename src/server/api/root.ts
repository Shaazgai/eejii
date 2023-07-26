import { supporterRouter } from '@/server/api/routers/supporter';
import { createTRPCRouter } from '@/server/api/trpc';

import { categoryRouter } from './routers/category';
import { eventRouter } from './routers/event';
import { fundraisingRouter } from './routers/fundraising';
import { grantFundraisingRouter } from './routers/grant-fundraising';
import { partnerRouter } from './routers/partner';
import { userRouter } from './routers/user';
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
  event: eventRouter,
  user: userRouter,
  fundraising: fundraisingRouter,
  grantFundraising: grantFundraisingRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
