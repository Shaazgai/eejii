import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { z } from 'zod';

import { UserType } from '@/lib/db/enums';
import { sendNotification } from '../helper/notification';
import { createTRPCRouter, privateProcedure } from '../trpc';

export const projectUserRouter = createTRPCRouter({
  findAll: privateProcedure
    .input(
      z.object({
        type: z.string().nullish(),
        status: z.string().nullish(),
        userId: z.string().nullish(),
        fundsOwnerId: z.string().nullish(),
        projectId: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      let query = ctx.db
        .selectFrom('ProjectUser')
        .select([
          'ProjectUser.id',
          'ProjectUser.type',
          'ProjectUser.userId',
          'ProjectUser.status',
          'ProjectUser.projectId',
        ])
        .select(eb => [
          jsonObjectFrom(
            eb
              .selectFrom('Project')
              .selectAll()
              .whereRef('Project.id', '=', 'ProjectUser.projectId')
          ).as('Project'),
        ]);
      if (input.type) {
        query = query.where('ProjectUser.type', '=', input.type);
      }

      if (input.status) {
        query = query.where('ProjectUser.status', '=', input.status);
      }

      if (input.userId) {
        query = query.where('ProjectUser.userId', '=', input.userId);
      }

      if (input.fundsOwnerId) {
        query = query
          .leftJoin('Project', join =>
            join.onRef('Project.id', '=', 'ProjectUser.projectId')
          )
          .where('Project.ownerId', '=', input.fundsOwnerId);
      }

      if (input.projectId) {
        query = query.where('ProjectUser.projectId', '=', input.projectId);
      }

      const result = await query.execute();
      return result;
    }),
  handleFundRequest: privateProcedure // Owner of the fund will handle the request of it's invitation
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const projectUser = await ctx.db
        .updateTable('ProjectUser')
        .where('id', '=', input.id)
        .set({
          status: input.status,
        })
        .returning(expressionBuilder => [
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('Project')
              .select(['id', 'title'])
              .select(eb => [
                jsonObjectFrom(
                  eb
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'Project.ownerId')
                ).as('Owner'),
              ])
              .whereRef('Project.id', '=', 'ProjectUser.projectId')
          ).as('Project'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'ProjectUser.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();

      const projectTitle = projectUser.Project
        ? projectUser.Project.title
        : 'your project';
      const projectId = projectUser.Project ? projectUser.Project.id : null;

      sendNotification({
        title: `Your request to join ${projectTitle} has been ${
          input.status === 'APPROVED' ? 'approved' : 'denied'
        }`,
        body: null,
        link: `/project/${projectId}`,
        receiverId: projectUser.User?.id as string,
        senderId: ctx.userId,
        type: 'join_request',
      });
      return { message: 'Success' };
    }),
  inviteToProject: privateProcedure // Owner of the fund will invite partner
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const projectUser = await ctx.db
        .insertInto('ProjectUser')
        .values({
          status: 'pending',
          type: 'invitation',
          userId: input.userId,
          projectId: input.id,
        })
        .returning(expressionBuilder => [
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('Project')
              .select(['id', 'title', 'description'])
              .select(eb => [
                jsonObjectFrom(
                  eb
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'Project.ownerId')
                ).as('Owner'),
              ])
              .whereRef('Project.id', '=', 'ProjectUser.projectId')
          ).as('Project'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'ProjectUser.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();
      const ownerName = projectUser.Project?.Owner
        ? projectUser.Project.Owner.organizationName
        : 'User';
      const projectTitle = projectUser.Project
        ? projectUser.Project.title
        : 'your project';
      const fundDetail = projectUser.Project
        ? projectUser.Project.description
        : null;

      const link =
        projectUser.User?.type === UserType.USER_PARTNER
          ? '/p/collabration'
          : projectUser.User?.type === UserType.USER_SUPPORTER
            ? '/s/collabration'
            : 'unknown';
      sendNotification({
        title: `'${ownerName}' wants you to join '${projectTitle}'`,
        body: fundDetail,
        link: link,
        receiverId: input.userId as string,
        senderId: ctx.userId,
        type: 'invite_request',
      });
      return { message: 'Success' };
    }),
  sendRequest: privateProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const projectUser = await ctx.db
        .insertInto('ProjectUser')
        .values(({ selectFrom }) => ({
          type: 'request',
          projectId: selectFrom('Project')
            .select('id')
            .where('Project.id', '=', input.projectId),
          userId: selectFrom('User')
            .select('id')
            .where('User.id', '=', ctx.userId),
          status: 'pending',
        }))
        .returning(expressionBuilder => [
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('Project')
              .select(['id', 'title'])
              .select(eb => [
                jsonObjectFrom(
                  eb
                    .selectFrom('User')
                    .selectAll()
                    .whereRef('User.id', '=', 'Project.ownerId')
                ).as('Owner'),
              ])
              .whereRef('Project.id', '=', 'ProjectUser.projectId')
          ).as('Project'),
          jsonObjectFrom(
            expressionBuilder
              .selectFrom('User')
              .selectAll()
              .whereRef('User.id', '=', 'ProjectUser.userId')
          ).as('User'),
        ])
        .executeTakeFirstOrThrow();
      const userEmail = projectUser.User ? projectUser.User.email : 'User';
      const projectTitle = projectUser.Project
        ? projectUser.Project.title
        : 'your project';
      const projectId = projectUser.Project ? projectUser.Project.id : null;
      sendNotification({
        title: `${userEmail} wants to join ${projectTitle}`,
        body: null,
        link: `/${
          projectUser.Project?.Owner?.type === UserType.USER_PARTNER ? 'p' : 's'
        }/manage/${projectId}`,
        receiverId: projectUser.Project?.Owner?.id as string,
        senderId: ctx.userId,
        type: 'join_request',
      });
      return projectUser;
    }),
});
