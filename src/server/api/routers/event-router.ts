import { TRPCError } from '@trpc/server';
import { sql } from 'kysely';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

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
  findAll: publicProcedure
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
          .select(eb1 => [
            jsonArrayFrom(
              eb1
                .selectFrom('Category')
                .selectAll()
                .leftJoin('CategoryEvent', join =>
                  join.onRef('CategoryEvent.eventId', '=', 'Event.id')
                )
                .whereRef('CategoryEvent.categoryId', '=', 'Category.id')
            ).as('Categories'),
            jsonArrayFrom(
              eb1
                .selectFrom('EventImage')
                .selectAll()
                .whereRef('Event.id', '=', 'EventImage.ownerId')
            ).as('Images'),
          ])
          .select(eb => [
            jsonObjectFrom(
              eb
                .selectFrom('User')
                .selectAll()
                .select(eb4 => [
                  jsonArrayFrom(
                    eb4
                      .selectFrom('UserImage')
                      .whereRef('User.id', '=', 'UserImage.ownerId')
                  ).as('Images'),
                ])
                .whereRef('User.id', '=', 'Event.ownerId')
            ).as('Owner'),
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
        console.log('hi');

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
      z.object({
        name: z.string().nullish(),
        status: z.string().nullish(),
        type: z
          .enum([EventType.EVENT, EventType.VOLUNTEERING])
          .default(EventType.EVENT)
          .nullish(),
      })
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
          ).as('CategoryImages'),
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
  findById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db
        .selectFrom('Event')
        .selectAll('Event')
        .select(eb1 => [
          jsonArrayFrom(
            eb1
              .selectFrom('EventCollaborator')
              .selectAll('EventCollaborator')
              .select(eb3 => [
                jsonObjectFrom(
                  eb3
                    .selectFrom('User')
                    .selectAll('User')
                    .select(eb4 => [
                      jsonArrayFrom(
                        eb4
                          .selectFrom('UserImage')
                          .whereRef('User.id', '=', 'UserImage.ownerId')
                      ).as('Images'),
                    ])
                    .whereRef('User.id', '=', 'EventCollaborator.userId')
                ).as('User'),
              ])
              .whereRef('EventCollaborator.eventId', '=', 'Event.id')
              .where('EventCollaborator.status', '=', 'REQUEST_APPROVED')
          ).as('Collaborators'),
          jsonArrayFrom(
            eb1
              .selectFrom('Category')
              .selectAll()
              .leftJoin('CategoryEvent', join =>
                join.onRef('CategoryEvent.eventId', '=', 'Event.id')
              )
              .whereRef('CategoryEvent.categoryId', '=', 'Category.id')
          ).as('Categories'),
          jsonArrayFrom(
            eb1
              .selectFrom('EventImage')
              .selectAll()
              .whereRef('Event.id', '=', 'EventImage.ownerId')
          ).as('Images'),
        ])
        .select(eb => [
          jsonObjectFrom(
            eb
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'Event.ownerId')
          ).as('Owner'),
        ])
        .where('Event.id', '=', input.id)
        .executeTakeFirstOrThrow();

      return event as unknown as Event;
    }),
  getMyCollaborated: privateProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .selectFrom('Event')
      .selectAll('Event')
      .leftJoin('EventCollaborator', join =>
        join.onRef('EventCollaborator.eventId', '=', 'Event.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'EventCollaborator.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('EventCollaborator.status', '=', 'approved')
      .execute();
    return events;
  }),
  getMyPending: privateProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .selectFrom('Event')
      .selectAll('Event')
      .leftJoin('EventCollaborator', join =>
        join.onRef('EventCollaborator.eventId', '=', 'Event.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'EventCollaborator.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('EventCollaborator.status', '=', 'pending')
      .execute();
    // console.log(events);
    return events;
  }),
  getNotRelated: privateProcedure.query(async ({ ctx }) => {
    const query = await sql`
        SELECT e.* FROM "Event" e 
        LEFT JOIN "EventCollaborator" ea ON ea."eventId" = e."id"
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
  create: privateProcedure
    .input(eventSchema)
    .mutation(async ({ input, ctx }) => {
      const event = await ctx.db
        .insertInto('Event')
        .values({
          featured: false,
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
  findRelated: publicProcedure
    .input(
      z.object({
        limit: z.number().nullish(),
        excludeId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const excludeEvent = await ctx.db
        .selectFrom('Event')
        .select(['Event.id', 'Event.ownerId'])
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
        ])
        .where('id', '=', input.excludeId)
        .executeTakeFirst();
      let query = ctx.db
        .selectFrom('Event')
        .selectAll('Event')
        .select(eb1 => [
          jsonObjectFrom(
            eb1
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'Event.ownerId')
          ).as('Owner'),
        ])
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
        .leftJoin('CategoryEvent', join =>
          join.onRef('CategoryEvent.eventId', '=', 'Event.id')
        )
        .leftJoin('Category', join =>
          join.onRef('CategoryEvent.categoryId', '=', 'Category.id')
        )
        .where('Event.id', '!=', excludeEvent?.id as string);

      if (excludeEvent && excludeEvent?.Categories?.length > 0) {
        query = query.where(eb =>
          eb.or(
            excludeEvent?.Categories?.map(c =>
              eb('CategoryEvent.id', '=', c.id)
            )
          )
        );
        query = query.where(eb =>
          eb.or([eb('Event.ownerId', '=', excludeEvent.ownerId)])
        );
      }
      if (input.limit) {
        query = query.limit(input.limit);
      }

      const res = await query
        .orderBy('Event.createdAt desc')
        .groupBy('Event.id')
        .execute();
      return res;
    }),
});
