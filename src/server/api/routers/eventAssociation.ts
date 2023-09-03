import { z } from 'zod';

import { createTRPCRouter, privateProcedure } from '../trpc';

export const eventRouter = createTRPCRouter({
  findAll: privateProcedure
    .input(
      z.object({
        type: z.string().nullish(),
        status: z.string().nullish(),
        userId: z.string().nullish(),
        eventsOwnerId: z.string().nullish(),
        eventId: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const eventAssociations = ctx.db.selectFrom('EventAssociation').execute();
      return eventAssociations;
    }),
});
