import { TRPCError } from '@trpc/server';
import { sql } from 'kysely';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

import type { User } from '@/lib/db/types';
import type { EventWithOwner, ListResponse, Pagination } from '@/lib/types';
import { eventSchema } from '@/lib/validation/event-schema';

import { ProjectStatus } from '@/lib/db/enums';
import { createPresignedUrl } from '../helper/imageHelper';
import { sendNotification } from '../helper/notification';
import { getPaginationInfo } from '../helper/paginationInfo';
import {
  adminProcedure,
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '../trpc';

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(20),
        title: z.string().nullish(),
        status: z.string().nullish(),
        enabled: z.boolean().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await ctx.db.transaction().execute(async trx => {
        let query = trx
          .selectFrom('Event')
          .select([
            'Event.id',
            'Event.title',
            'Event.description',
            'Event.location',
            'Event.startTime',
            'Event.endTime',
            'Event.requiredTime',
            'Event.roles',
            'Event.contact',
            'Event.status',
            'Event.enabled',
          ])
          .select(eb => [
            jsonObjectFrom(
              eb
                .selectFrom('User')
                .selectAll()
                .whereRef('User.id', '=', 'Event.ownerId')
            ).as('Owner'),
            jsonArrayFrom(
              eb
                .selectFrom('EventImage')
                .selectAll()
                .whereRef('Event.id', '=', 'EventImage.ownerId')
            ).as('Images'),
          ]);
        if (input.title) {
          query = query.where('title', 'like', '%' + input.title + '%');
        }
        if (input.enabled) {
          query = query.where('enabled', '=', input.enabled);
        }
        if (input.status) {
          query = query.where('status', '=', input.status as ProjectStatus);
        }

        const queryResult = await query
          .limit(input.limit)
          .offset(input.limit * (input.page - 1))
          .execute();
        const { count } = await trx
          .selectFrom('Event')
          .select(expressionBuilder => {
            return expressionBuilder.fn.countAll().as('count');
          })
          .executeTakeFirstOrThrow();

        return {
          data: queryResult,
          count,
        };
      });

      const totalCount = result.count as number;
      const paginationInfo: Pagination = getPaginationInfo({
        totalCount: totalCount,
        limit: input.limit,
        page: input.page,
      });
      const response: ListResponse<EventWithOwner> = {
        items: result.data as unknown as EventWithOwner[],
        pagination: paginationInfo,
      };
      return response;
    }),
  getMyEvents: privateProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .selectFrom('Event')
      .select([
        'Event.id',
        'Event.title',
        'Event.description',
        'Event.location',
        'Event.startTime',
        'Event.endTime',
        'Event.requiredTime',
        'Event.roles',
        'Event.contact',
      ])
      .select(eb => [
        jsonArrayFrom(
          eb
            .selectFrom('EventImage')
            .selectAll()
            .whereRef('Event.id', '=', 'EventImage.ownerId')
        ).as('Images'),
      ])
      .where('ownerId', '=', ctx.userId)
      .execute();

    return events;
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db
        .selectFrom('Event')
        .selectAll()
        .where('Event.id', '=', input.id)
        .execute();
      return event as unknown as EventWithOwner;
    }),
  getMyCollaborated: privateProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .selectFrom('Event')
      .selectAll('Event')
      .leftJoin('EventAssociation', join =>
        join.onRef('EventAssociation.eventId', '=', 'Event.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'EventAssociation.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('EventAssociation.status', '=', 'approved')
      .execute();
    return events;
  }),
  getMyPending: privateProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .selectFrom('Event')
      .selectAll('Event')
      .leftJoin('EventAssociation', join =>
        join.onRef('EventAssociation.eventId', '=', 'Event.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'EventAssociation.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('EventAssociation.status', '=', 'pending')
      .execute();
    // console.log(events);
    return events;
  }),
  getNotRelated: privateProcedure.query(async ({ ctx }) => {
    const query = await sql`
        SELECT e.* FROM "Event" e 
        LEFT JOIN "EventAssociation" ea ON ea."eventId" = e."id"
        WHERE ea."userId" != ${sql.raw(
          `(SELECT u1."id" FROM "User" u1 WHERE u1."id" = '${ctx.userId}')`
        )} OR ea."userId" IS NULL
        AND e."ownerId" != ${sql.raw(
          `(SELECT u1."id" FROM "User" u1 WHERE u1."id" = '${ctx.userId}')`
        )}
      `.execute(ctx.db);
    console.log(query.rows);
    return query.rows;
  }),
  findUsersToInvite: publicProcedure // Find all partners for event to invite them
    .input(z.object({ eventId: z.string(), userType: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = await sql`
        SELECT u.*
        FROM "User" u
        LEFT JOIN "EventAssociation" as ea ON ea."userId" = u."id"
        WHERE (ea."eventId" IS DISTINCT FROM ${
          input.eventId
        } OR ea."eventId" IS NULL)
        AND u."id" != ${sql.raw(
          `(SELECT e."ownerId" FROM "Event" AS e WHERE e."id" = '${input.eventId}')`
        )}
        AND u."type" = ${input.userType}
        AND u."id" != ${ctx.userId}
        `.execute(ctx.db);

      return query.rows as User[];
    }),
  create: privateProcedure
    .input(eventSchema)
    .mutation(async ({ input, ctx }) => {
      const event = await ctx.db
        .insertInto('Event')
        .values({
          title: input.title,
          description: input.description,
          requiredTime: input.requiredTime,
          contact: {
            phone: input.contact.phone,
            email: input.contact.email,
          },
          location: input.location,
          startTime: input.startTime,
          endTime: input.endTime,
          roles: Object.assign({}, input.roles),
          ownerId: ctx.userId,
          enabled: false,
          status: ProjectStatus.PENDING,
        })
        .returning(['id', 'title', 'description'])
        .executeTakeFirstOrThrow();

      sendNotification({
        title: `New event request: ${event.title} Eejii.org`,
        link: `/admin/events/${event.id}`,
        body: event.description,
        receiverId: ctx.userId,
        senderId: ctx.userId,
        type: 'project_request',
      });
      return event;
    }),
  update: privateProcedure
    .input(eventSchema)
    .mutation(async ({ input, ctx }) => {
      if (!input.id) {
        throw new TRPCError({
          message: 'Not enough parameter',
          code: 'BAD_REQUEST',
        });
      }
      const event = await ctx.db
        .updateTable('Event')
        .where('id', '=', input.id)
        .set({
          title: input.title,
          description: input.description,
          requiredTime: input.requiredTime,
          contact: {
            phone: input.contact.phone,
            email: input.contact.email,
          },
          location: input.location,
          startTime: input.startTime,
          endTime: input.endTime,
          roles: Object.assign({}, input.roles),
          ownerId: ctx.userId,
        })
        .returning(['id'])
        .executeTakeFirstOrThrow();
      return event;
    }),

  createPresignedUrl: privateProcedure
    .input(
      z.object({
        eventId: z.string(),
        name: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const eventImage = await ctx.db
        .insertInto('EventImage')
        .values({
          ownerId: input.eventId,
          type: 'main',
          path: `uploads/event/${input.name}`,
        })
        .returning(['path'])
        .executeTakeFirstOrThrow();

      return createPresignedUrl(eventImage.path, input.contentType);
    }),

  changeStatus: adminProcedure
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let state: string;
      if (input.status === ProjectStatus.APPROVED) {
        state = ProjectStatus.APPROVED;
      } else if (input.status === ProjectStatus.DENIED) {
        state = ProjectStatus.DENIED;
      } else if (input.status === ProjectStatus.DONE) {
        state = ProjectStatus.DONE;
      } else {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'NOT VALID REQUEST TYPE',
        });
      }
      const event = await ctx.db
        .updateTable('Event')
        .where('Event.id', '=', input.id)
        .set({
          status: state as ProjectStatus,
        })
        .returning(['id', 'title', 'ownerId'])
        .executeTakeFirstOrThrow();

      sendNotification({
        title: `Your request to create '#${event.title}' has been ${
          input.status === ProjectStatus.APPROVED ? 'approved' : 'denied'
        }`,
        body: null,
        link: `/p/manage/${event.id}`,
        receiverId: event.ownerId as string,
        senderId: ctx.userId as string,
        type: 'project_request',
      });
      return event;
    }),
});
