import { z } from 'zod';

import { createTRPCRouter, privateProcedure } from '../trpc';

export const eventAssociationRouter = createTRPCRouter({
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
      let query = ctx.db.selectFrom('EventAssociation').selectAll();

      console.log(input)
      if (input.type) {
        query = query.where('EventAssociation.type', '=', input.type);
      }

      if (input.status) {
        query = query.where('EventAssociation.status', '=', input.status);
      }

      if (input.userId) {
        query = query.where('EventAssociation.userId', '=', input.userId);
      }

      if (input.eventsOwnerId) {
        query = query
          .leftJoin('Event', join =>
            join.onRef('Event.id', '=', 'EventAssociation.eventId')
          )
          .where('Event.ownerId', '=', input.eventsOwnerId);
      }

      if (input.eventId) {
        query = query.where('EventAssociation.eventId', '=', input.eventId);
      }

      const result = await query.execute();
      return result;
    }),
});
