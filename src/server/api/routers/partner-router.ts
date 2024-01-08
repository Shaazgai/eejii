import { z } from 'zod';

// import { addressSchema } from '@/lib/validation/address-validation-schema';
import { partnerSchema } from '@/lib/validation/partner-validation-schema';

import type { UserStatus } from '@/lib/db/enums';
import type { User } from '@/lib/db/types';
import type { ListResponse, Pagination } from '@/lib/types';
import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { createPresignedUrl } from '../helper/imageHelper';
import { getPaginationInfo } from '../helper/paginationInfo';
import { createTRPCRouter, privateProcedure, publicProcedure } from '../trpc';

export const partnerRouter = createTRPCRouter({
  findById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const partner = await ctx.db
        .selectFrom('User')
        .selectAll()
        .where('id', '=', input.id)
        .executeTakeFirstOrThrow();

      return partner;
    }),
  findAll: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(20),
        search: z.string().nullish(),
        status: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.transaction().execute(async trx => {
        let query = trx
          .selectFrom('User')
          .where('User.type', '=', 'USER_PARTNER')
          .selectAll();

        if (input.status) {
          query = query.where(
            'User.requestStatus',
            '=',
            input.status as UserStatus
          );
        }
        if (input.search) {
          query = query.where(eb =>
            eb.or([
              eb('User.email', 'like', '%' + input.search + '%'),
              eb('User.phoneNumber', 'like', '%' + input.search + '%'),
              eb('User.organizationName', 'like', '%' + input.search + '%'),
              eb('User.firstName', 'like', '%' + input.search + '%'),
              eb('User.lastName', 'like', '%' + input.search + '%'),
            ])
          );
        }
        const partners = await query
          .limit(input.limit)
          .offset(input.limit * (input.page - 1))
          .orderBy('User.createdAt desc')
          .execute();

        const { count } = await trx
          .selectFrom('User')
          .select(expressionBuilder => {
            return expressionBuilder.fn.countAll().as('count');
          })
          .where('User.type', '=', 'USER_PARTNER')
          .executeTakeFirstOrThrow();

        return {
          data: partners,
          count,
        };
      });

      const paginationInfo: Pagination = getPaginationInfo({
        totalCount: result.count as number,
        limit: input.limit,
        page: input.page,
      });
      const response: ListResponse<User> = {
        items: result.data as unknown as User[],
        pagination: paginationInfo,
      };
      return response;
    }),
  register: publicProcedure
    .input(partnerSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const mutation = await ctx.db.transaction().execute(async trx => {
        const exists = await trx
          .selectFrom('User')
          .where('email', '=', email)
          .selectAll()
          .executeTakeFirst();

        if (exists) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'User already exists.',
          });
        }
        const plan = await trx
          .selectFrom('Plan')
          .select('id')
          .where('code', '=', 'free')
          .executeTakeFirstOrThrow();
        const partnerPlan = await trx
          .insertInto('PartnerPlan')
          .values({
            planId: plan.id,
            startDate: new Date(),
            endDate: new Date(100),
          })
          .returning('id')
          .executeTakeFirstOrThrow();

        const hashedPassword = await hash(password);
        const partner = await trx
          .insertInto('User')
          .values({
            phoneNumber: input.contact.phoneNumber1,
            email: input.email,
            type: 'USER_PARTNER',
            partnerPlanId: partnerPlan.id,
            contact: {
              // twitter: input.contact.twitter,
              // facebook: input.contact.facebook,
              // instagram: input.contact.instagram,
              phone_primary: input.contact.phoneNumber1,
              phone_secondary: input.contact.phoneNumber2,
            },
            password: hashedPassword,
          })
          .returning(['id', 'password', 'email', 'type'])
          .executeTakeFirstOrThrow();

        trx
          .insertInto('Notification')
          .values({
            title: partner.email + ' wants to join Eejii.org',
            link: '/admin/users',
            receiverId: partner.id,
            senderId: partner.id,
            status: 'new',
            type: 'request',
          })
          .execute();

        return partner;
      });

      return {
        status: 201,
        message: 'Account created successfully',
        result: mutation,
      };
    }),
  updateBio: privateProcedure
    .input(
      z.object({
        organizationName: z.string(),
        address: z.string(),
        bio: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db
        .updateTable('User')
        .where('User.id', '=', ctx.userId)
        .set({
          organizationName: input.organizationName,
          bio: input.bio,
          addressShort: input.address,
        })
        .returning(['User.id'])
        .executeTakeFirstOrThrow();
      return user;
    }),
  updateContact: privateProcedure
    .input(
      z.object({
        contact: z.object({
          phone: z.string().nullish(),
          email: z.string().nullish(),
          facebookUrl: z.string().nullish(),
          instagramUrl: z.string().nullish(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .updateTable('User')
        .where('User.id', '=', ctx.userId)
        .set({
          contact: input.contact,
        })
        .execute();
    }),
  createPresignedUrl: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        type: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const exists = await ctx.db
        .selectFrom('UserImage')
        .select('id')
        .where('UserImage.ownerId', '=', ctx.userId)
        .where('UserImage.type', '=', input.type)
        .executeTakeFirst();

      if (exists) {
        ctx.db
          .deleteFrom('UserImage')
          .where('UserImage.id', '=', exists.id)
          .execute();
      }
      const userImage = await ctx.db
        .insertInto('UserImage')
        .values({
          ownerId: input.userId,
          type: input.type,
          path: `uploads/user/${input.name}`,
        })
        .returning(['path'])
        .executeTakeFirstOrThrow();

      const res = await createPresignedUrl(userImage.path, input.contentType);

      return {
        data: res,
        fileName: input.name,
      };
    }),
});
