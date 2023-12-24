import { TRPCError } from '@trpc/server';
import { sql } from 'kysely';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

import type { User } from '@/lib/db/types';
import type { Event, ListResponse, Pagination } from '@/lib/types';
import { eventSchema } from '@/lib/validation/event-schema';

import { EventType, ProjectStatus } from '@/lib/db/enums';
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
        type: z.string().nullish().default(EventType.EVENT),
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await ctx.db.transaction().execute(async trx => {
        let query = trx
          .selectFrom('Event')
          .selectAll('Event')
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
          ])
          .where('Event.type', '=', input.type as EventType);
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
          .where('Event.type', '=', input.type as EventType)
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
      const response: ListResponse<Event> = {
        items: result.data as unknown as Event[],
        pagination: paginationInfo,
      };
      return response;
    }),
  getMyEvents: privateProcedure
    .input(
      z.object({ name: z.string().nullish(), status: z.string().nullish() })
    )
    .query(async ({ ctx, input }) => {
      let query = ctx.db
        .selectFrom('Event')
        .selectAll('Event')
        .select(eb => [
          jsonArrayFrom(
            eb
              .selectFrom('EventImage')
              .selectAll()
              .whereRef('Event.id', '=', 'EventImage.ownerId')
          ).as('Images'),
        ])
        .where('ownerId', '=', ctx.userId);
      if (input.name) {
        query = query.where('Event.title', 'like', '%' + input.name + '%');
      }
      if (input.status) {
        query = query.where('Event.status', '=', input.status as ProjectStatus);
      }
      const events = await query.execute();

      return events as unknown as Event[];
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db
        .selectFrom('Event')
        .selectAll('Event')
        .select(eb => [
          jsonArrayFrom(
            eb
              .selectFrom('Category')
              .selectAll()
              .leftJoin('CategoryEvent', join =>
                join.onRef('CategoryEvent.eventId', '=', 'Event.id')
              )
              .whereRef('CategoryEvent.categoryId', '=', 'Category.id')
          ).as('Categories'),
          jsonArrayFrom(
            eb
              .selectFrom('EventImage')
              .selectAll()
              .whereRef('Event.id', '=', 'EventImage.ownerId')
          ).as('Images'),
        ])
        .where('Event.id', '=', input.id)
        .executeTakeFirstOrThrow();

      return event as unknown as Event;
    }),
  getMyCollaborated: privateProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .selectFrom('Event')
      .selectAll('Event')
      .leftJoin('EventUser', join =>
        join.onRef('EventUser.eventId', '=', 'Event.id')
      )
      .leftJoin('User', join => join.onRef('User.id', '=', 'EventUser.userId'))
      .where('User.id', '=', ctx.userId)
      .where('EventUser.status', '=', 'approved')
      .execute();
    return events;
  }),
  getMyPending: privateProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .selectFrom('Event')
      .selectAll('Event')
      .leftJoin('EventUser', join =>
        join.onRef('EventUser.eventId', '=', 'Event.id')
      )
      .leftJoin('User', join => join.onRef('User.id', '=', 'EventUser.userId'))
      .where('User.id', '=', ctx.userId)
      .where('EventUser.status', '=', 'pending')
      .execute();
    // console.log(events);
    return events;
  }),
  getNotRelated: privateProcedure.query(async ({ ctx }) => {
    const query = await sql`
        SELECT e.* FROM "Event" e 
        LEFT JOIN "EventUser" ea ON ea."eventId" = e."id"
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
        LEFT JOIN "EventUser" as ea ON ea."userId" = u."id"
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
          type: input.type as EventType,
          title: input.title,
          description: input.description,
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
      const transaction = await ctx.db.transaction().execute(async trx => {
        if (!input.id) {
          throw new TRPCError({
            message: 'Not enough parameter',
            code: 'BAD_REQUEST',
          });
        }
        const event = await trx
          .updateTable('Event')
          .where('id', '=', input.id)
          .set({
            title: input.title,
            description: input.description,
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
        console.log(input.categories);
        if (input.categories) {
          console.log(input.categories);
          await trx
            .deleteFrom('CategoryEvent')
            .where('CategoryEvent.eventId', '=', event.id)
            .execute();
          input.categories.map(c => {
            trx
              .insertInto('CategoryEvent')
              .values({
                eventId: event.id,
                categoryId: c,
              })
              .execute();
          });
        }
        return event;
      });
      return transaction;
    }),

  createPresignedUrl: privateProcedure
    .input(
      z.object({
        eventId: z.string(),
        type: z.string(),
        name: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const exists = await ctx.db
        .selectFrom('EventImage')
        .select('id')
        .where('EventImage.ownerId', '=', ctx.userId)
        .where('EventImage.type', '=', input.type)
        .executeTakeFirst();

      if (exists) {
        ctx.db
          .deleteFrom('EventImage')
          .where('EventImage.id', '=', exists.id)
          .execute();
      }
      const eventImage = await ctx.db
        .insertInto('EventImage')
        .values({
          ownerId: input.eventId,
          type: input.type,
          path: `uploads/event/${input.name}`,
        })
        .returning(['path'])
        .executeTakeFirstOrThrow();

      const res = await createPresignedUrl(eventImage.path, input.contentType);

      return {
        data: res,
        fileName: input.name,
      };
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
  deleteImage: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .deleteFrom('EventImage')
        .where('EventImage.id', '=', input.id)
        .execute();
    }),
});
