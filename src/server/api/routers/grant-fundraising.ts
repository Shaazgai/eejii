import { TRPCError } from '@trpc/server';
import { sql } from 'kysely';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

import { fundraisingSchema } from '@/lib/validation/fundraising-schema';

import { ProjectStatus } from '@/lib/db/enums';
import type { User } from '@/lib/db/types';
import type { GrantFundWithOwner, ListResponse, Pagination } from '@/lib/types';
import { createPresignedUrl } from '../helper/imageHelper';
import { sendNotification } from '../helper/notification';
import { getPaginationInfo } from '../helper/paginationInfo';
import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const grantFundraisingRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(20),
        title: z.string().nullish(),
        enabled: z.boolean().nullish(),
        status: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.transaction().execute(async trx => {
        let query = ctx.db
          .selectFrom('GrantFundraising')
          .selectAll()
          .select(eb => [
            jsonObjectFrom(
              eb
                .selectFrom('User')
                .selectAll()
                .whereRef('User.id', '=', 'GrantFundraising.ownerId')
            ).as('Owner'),
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

        let paginationQuery = trx
          .selectFrom('GrantFundraising')
          .select(expressionBuilder => {
            return expressionBuilder.fn.countAll().as('count');
          });
        if (input.title) {
          paginationQuery = paginationQuery.where(
            'title',
            'like',
            '%' + input.title + '%'
          );
        }
        if (input.enabled) {
          paginationQuery = paginationQuery.where(
            'enabled',
            '=',
            input.enabled
          );
        }
        if (input.status) {
          paginationQuery = paginationQuery.where(
            'status',
            '=',
            input.status as ProjectStatus
          );
        }
        const { count } = await paginationQuery.executeTakeFirstOrThrow();
        return {
          data: queryResult,
          count,
        };
      });
      const paginationInfo: Pagination = getPaginationInfo({
        totalCount: result.count as number,
        limit: input.limit,
        page: input.page,
      });
      const response: ListResponse<GrantFundWithOwner> = {
        items: result.data as unknown as GrantFundWithOwner[],
        pagination: paginationInfo,
      };
      return response;
    }),
  getMyGrants: privateProcedure
    .input(
      z.object({ name: z.string().nullish(), status: z.string().nullish() })
    )
    .query(async ({ ctx, input }) => {
      let query = ctx.db
        .selectFrom('GrantFundraising')
        .select([
          'GrantFundraising.id',
          'GrantFundraising.title',
          'GrantFundraising.description',
          'GrantFundraising.currentAmount',
          'GrantFundraising.goalAmount',
          'GrantFundraising.contact',
          'GrantFundraising.location',
          'GrantFundraising.startTime',
          'GrantFundraising.endTime',
          'GrantFundraising.createdAt',
        ])
        .select(eb => [
          jsonArrayFrom(
            eb
              .selectFrom('GrantImage')
              .selectAll()
              .whereRef('GrantFundraising.id', '=', 'GrantImage.ownerId')
          ).as('Images'),
        ])
        .where('ownerId', '=', ctx.userId);
      if (input.name) {
        query = query.where(
          'GrantFundraising.title',
          'like',
          '%' + input.name + '%'
        );
      }
      if (input.status) {
        query = query.where(
          'GrantFundraising.status',
          '=',
          input.status as ProjectStatus
        );
      }
      const grants = await query.execute();

      return grants as unknown as GrantFundWithOwner[];
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const grantFundraising = await ctx.db
        .selectFrom('GrantFundraising')
        .where('id', '=', input.id)
        .selectAll('GrantFundraising')
        .select(eb => [
          jsonObjectFrom(
            eb
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'GrantFundraising.ownerId')
          ).as('Owner'),
          jsonArrayFrom(
            eb
              .selectFrom('GrantImage')
              .selectAll()
              .whereRef('GrantFundraising.id', '=', 'GrantImage.ownerId')
          ).as('Images'),
        ])
        .executeTakeFirstOrThrow();
      return grantFundraising;
    }),
  getMyCollaborated: privateProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .selectFrom('GrantFundraising')
      .selectAll('GrantFundraising')
      .leftJoin('GrantAssociation', join =>
        join.onRef('GrantAssociation.grantId', '=', 'GrantFundraising.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'GrantAssociation.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('GrantAssociation.status', '=', 'approved')
      .execute();
    console.log(events);
    return events;
  }),
  getMyPending: privateProcedure.query(async ({ ctx }) => {
    const events = await ctx.db
      .selectFrom('GrantFundraising')
      .selectAll('GrantFundraising')
      .leftJoin('GrantAssociation', join =>
        join.onRef('GrantAssociation.grantId', '=', 'GrantFundraising.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'GrantAssociation.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('GrantAssociation.status', '=', 'pending')
      .execute();
    // console.log(events);
    return events;
  }),
  getNotRelated: privateProcedure.query(async ({ ctx }) => {
    const query = await sql`
        SELECT g.* FROM "GrantFundraising" g 
        LEFT JOIN "GrantAssociation" ga ON ga."grantId" = g."id"
        WHERE ga."userId" != ${sql.raw(
          `(SELECT u1."id" FROM "User" u1 WHERE u1."id" = '${ctx.userId}')`
        )} OR ga."userId" IS NULL
        AND g."ownerId" != ${sql.raw(
          `(SELECT u1."id" FROM "User" u1 WHERE u1."id" = '${ctx.userId}')`
        )}
      `.execute(ctx.db);
    console.log(query.rows);
    return query.rows;
  }),
  findUsersToInvite: publicProcedure // Find all partners for grant to invite them
    .input(z.object({ grantId: z.string(), userType: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log(input.userType);
      const query = await sql`
        SELECT u.*
        FROM "User" u
        LEFT JOIN "GrantAssociation" as ga ON ga."userId" = u."id"
        WHERE (ga."grantId" IS DISTINCT FROM ${
          input.grantId
        } OR ga."grantId" IS NULL)
        AND u."id" != ${sql.raw(
          `(SELECT g."ownerId" FROM "GrantFundraising" AS g WHERE g."id" = '${input.grantId}')`
        )}
        AND u."type" = ${input.userType}
        AND u."id" != ${ctx.userId}
        `.execute(ctx.db);

      return query.rows as User[];
    }),
  create: privateProcedure
    .input(fundraisingSchema)
    .mutation(async ({ input, ctx }) => {
      const fund = await ctx.db
        .insertInto('GrantFundraising')
        .values({
          title: input.title,
          description: input.description,
          contact: {
            phone: input.contact.phone,
            email: input.contact.email,
          },
          startTime: input.startTime,
          endTime: input.endTime,
          goalAmount: input.goalAmount,
          currentAmount: input.currentAmount,
          ownerId: ctx.userId,
          enabled: false,
          status: ProjectStatus.PENDING,
        })
        .returning(['id', 'title', 'description'])
        .executeTakeFirstOrThrow();

      sendNotification({
        title: `New fundraising request: ${fund.title} Eejii.org`,
        link: `/admin/grant-fundraisings/${fund.id}`,
        body: fund.description,
        receiverId: ctx.userId,
        senderId: ctx.userId,
        type: 'project_request',
      });
      return fund;
    }),
  update: privateProcedure
    .input(fundraisingSchema)
    .mutation(async ({ input, ctx }) => {
      if (!input.id) {
        throw new TRPCError({
          message: 'Not enough parameter',
          code: 'BAD_REQUEST',
        });
      }
      const fund = await ctx.db
        .updateTable('GrantFundraising')
        .where('id', '=', input.id)
        .set({
          title: input.title,
          description: input.description,
          contact: {
            phone: input.contact.phone,
            email: input.contact.email,
          },
          startTime: input.startTime,
          endTime: input.endTime,
          goalAmount: input.goalAmount,
          currentAmount: input.currentAmount,
          ownerId: ctx.userId,
        })
        .returning(['id'])
        .executeTakeFirstOrThrow();

      return fund;
    }),
  createPresignedUrl: privateProcedure
    .input(
      z.object({
        grantId: z.string(),
        type: z.string(),
        name: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const exists = await ctx.db
        .selectFrom('GrantImage')
        .select('id')
        .where('GrantImage.ownerId', '=', ctx.userId)
        .where('GrantImage.type', '=', input.type)
        .executeTakeFirst();

      if (exists) {
        ctx.db
          .deleteFrom('GrantImage')
          .where('GrantImage.id', '=', exists.id)
          .execute();
      }
      const image = await ctx.db
        .insertInto('GrantImage')
        .values({
          ownerId: input.grantId,
          type: input.type,
          path: `uploads/grant/${input.name}`,
        })
        .returning(['path'])
        .executeTakeFirstOrThrow();

      const res = await createPresignedUrl(image.path, input.contentType);

      return {
        data: res,
        fileName: input.name,
      };
    }),

  changeStatus: publicProcedure
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
      const grant = await ctx.db
        .updateTable('GrantFundraising')
        .where('GrantFundraising.id', '=', input.id)
        .set({
          status: state as ProjectStatus,
        })
        .returning(['id', 'title', 'ownerId'])
        .executeTakeFirstOrThrow();

      sendNotification({
        title: `Your request to create '#${grant.title}' has been ${
          input.status === ProjectStatus.APPROVED ? 'approved' : 'denied'
        }`,
        body: null,
        link: `/p/manage/${grant.id}`,
        receiverId: grant.ownerId as string,
        senderId: ctx.userId as string,
        type: 'project_request',
      });
      return grant;
    }),
  deleteImage: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .deleteFrom('GrantImage')
        .where('GrantImage.id', '=', input.id)
        .execute();
    }),
});
