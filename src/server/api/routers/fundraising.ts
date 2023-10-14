import { TRPCError } from '@trpc/server';
import { sql } from 'kysely';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

import type { Fundraising, User } from '@/lib/db/types';
import { fundraisingSchema } from '@/lib/validation/fundraising-schema';

import { ProjectStatus } from '@/lib/db/enums';
import type { FundWithOwner, ListResponse, Pagination } from '@/lib/types';
import { createPresignedUrl } from '../helper/imageHelper';
import { sendNotification } from '../helper/notification';
import { getPaginationInfo } from '../helper/paginationInfo';
import {
  adminProcedure,
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from '../trpc';

export const fundraisingRouter = createTRPCRouter({
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
        let query = trx
          .selectFrom('Fundraising')
          .select([
            'Fundraising.id',
            'Fundraising.title',
            'Fundraising.description',
            'Fundraising.currentAmount',
            'Fundraising.goalAmount',
            'Fundraising.contact',
            'Fundraising.location',
            'Fundraising.startTime',
            'Fundraising.endTime',
            'Fundraising.createdAt',
            'Fundraising.status',
            'Fundraising.enabled',
          ])
          .select(eb => [
            jsonObjectFrom(
              eb
                .selectFrom('User')
                .selectAll()
                .whereRef('User.id', '=', 'Fundraising.ownerId')
            ).as('Owner'),
            jsonArrayFrom(
              eb
                .selectFrom('FundImage')
                .selectAll()
                .whereRef('Fundraising.id', '=', 'FundImage.ownerId')
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

        let paginationQuery = trx
          .selectFrom('Fundraising')
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
      const response: ListResponse<FundWithOwner> = {
        items: result.data as unknown as FundWithOwner[],
        pagination: paginationInfo,
      };
      return response;
    }),
  getMyFunds: privateProcedure.query(async ({ ctx }) => {
    const fundraisings = await ctx.db
      .selectFrom('Fundraising')
      .select([
        'Fundraising.id',
        'Fundraising.title',
        'Fundraising.description',
        'Fundraising.currentAmount',
        'Fundraising.goalAmount',
        'Fundraising.contact',
        'Fundraising.location',
        'Fundraising.startTime',
        'Fundraising.endTime',
        'Fundraising.createdAt',
      ])
      .select(eb => [
        jsonArrayFrom(
          eb
            .selectFrom('FundImage')
            .selectAll()
            .whereRef('Fundraising.id', '=', 'FundImage.ownerId')
        ).as('Images'),
      ])
      .where('ownerId', '=', ctx.userId)
      .execute();

    return fundraisings;
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const fundraising = await ctx.db
        .selectFrom('Fundraising')
        .where('id', '=', input.id)
        .select([
          'Fundraising.id',
          'Fundraising.title',
          'Fundraising.description',
          'Fundraising.currentAmount',
          'Fundraising.goalAmount',
          'Fundraising.contact',
          'Fundraising.location',
          'Fundraising.startTime',
          'Fundraising.endTime',
          'Fundraising.createdAt',
        ])
        .select(eb => [
          jsonObjectFrom(
            eb
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'Fundraising.ownerId')
          ).as('Owner'),
          jsonArrayFrom(
            eb
              .selectFrom('FundImage')
              .selectAll()
              .whereRef('Fundraising.id', '=', 'FundImage.ownerId')
          ).as('Images'),
        ])
        .executeTakeFirstOrThrow();
      return fundraising;
    }),
  getMyCollaborated: privateProcedure.query(async ({ ctx }) => {
    const fundraising = await ctx.db
      .selectFrom('Fundraising')
      .selectAll('Fundraising')
      .leftJoin('FundAssociation', join =>
        join.onRef('FundAssociation.fundraisingId', '=', 'Fundraising.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'FundAssociation.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('FundAssociation.status', '=', 'approved')
      .execute();
    console.log(fundraising);
    return fundraising;
  }),
  getMyPending: privateProcedure.query(async ({ ctx }) => {
    const fundraising = await ctx.db
      .selectFrom('Fundraising')
      .selectAll('Fundraising')
      .leftJoin('FundAssociation', join =>
        join.onRef('FundAssociation.fundraisingId', '=', 'Fundraising.id')
      )
      .leftJoin('User', join =>
        join.onRef('User.id', '=', 'FundAssociation.userId')
      )
      .where('User.id', '=', ctx.userId)
      .where('FundAssociation.status', '=', 'pending')
      .execute();
    // console.log(fundraising);
    return fundraising;
  }),
  getNotRelated: privateProcedure.query(async ({ ctx }) => {
    const query = await sql`
        SELECT f.* FROM "Fundraising" f 
        LEFT JOIN "FundAssociation" fa ON fa."fundraisingId" = f."id"
        WHERE fa."userId" != ${sql.raw(
          `(SELECT u1."id" FROM "User" u1 WHERE u1."id" = '${ctx.userId}')`
        )} OR fa."userId" IS NULL
        AND f."ownerId" != ${sql.raw(
          `(SELECT u1."id" FROM "User" u1 WHERE u1."id" = '${ctx.userId}')`
        )}
      `.execute(ctx.db);
    return query.rows as Fundraising[];
  }),
  findUsersToInvite: publicProcedure // Find all partners for fundraising to invite them
    .input(z.object({ fundId: z.string(), userType: z.string() }))
    .query(async ({ ctx, input }) => {
      const query = await sql`
        SELECT u.*
        FROM "User" u
        LEFT JOIN "FundAssociation" as fa ON fa."userId" = u."id"
        WHERE (fa."fundraisingId" IS DISTINCT FROM ${
          input.fundId
        } OR fa."fundraisingId" IS NULL)
        AND u."id" != ${sql.raw(
          `(SELECT f."ownerId" FROM "Fundraising" AS f WHERE f."id" = '${input.fundId}')`
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
        .insertInto('Fundraising')
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
        link: `/admin/fundraisings/${fund.id}`,
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
        .updateTable('Fundraising')
        .where('id', '=', input.id as string)
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
        fundId: z.string(),
        name: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const fundImage = await ctx.db
        .insertInto('FundImage')
        .values({
          ownerId: input.fundId,
          type: 'main',
          path: `uploads/fund/${input.name}`,
        })
        .returning(['path'])
        .executeTakeFirstOrThrow();

      return createPresignedUrl(fundImage.path, input.contentType);
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
      const fund = await ctx.db
        .updateTable('Fundraising')
        .where('Fundraising.id', '=', input.id)
        .set({
          status: state as ProjectStatus,
        })
        .returning(['id', 'title', 'ownerId'])
        .executeTakeFirstOrThrow();

      sendNotification({
        title: `Your request to create '#${fund.title}' has been ${
          input.status === ProjectStatus.APPROVED ? 'approved' : 'denied'
        }`,
        body: null,
        link: `/p/manage/${fund.id}`,
        receiverId: fund.ownerId as string,
        senderId: ctx.userId as string,
        type: 'project_request',
      });
      return fund;
    }),
});
