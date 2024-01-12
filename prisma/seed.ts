import { db } from '../src/server/db';
import {
  Role,
  UserType,
  ProjectType,
  EventType,
  ProjectStatus,
  UserStatus,
} from '../src/lib/db/enums';
import { hash } from 'argon2';
import { faker } from '@faker-js/faker';

async function clearData() {
  try {
    db.deleteFrom('CategoryMedia').execute();
    db.deleteFrom('CategoryEvent').execute();
    db.deleteFrom('CategoryProject').execute();
    db.deleteFrom('Category').execute();
    db.deleteFrom('Project').execute();
    db.deleteFrom('Event').execute();
    db.deleteFrom('Media').execute();
    db.deleteFrom('User').execute();

    console.log('Data cleared successfully!');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
}

async function createCategories(count: number) {
  for (let i = 0; i < count; i++) {
    await db
      .insertInto('Category')
      .values({
        name: faker.lorem.word(),
        type: faker.helpers.arrayElement(['event', 'project', 'media']),
      })
      .execute();
  }
  console.log('Created ' + count + ' category');
}

async function createMedia(count: number) {
  const user = await db
    .selectFrom('User')
    .select('id')
    .where('type', '=', 'USER_PARTNER')
    .execute();
  const userIds = user ? user.map(u => u.id) : [];

  const categories = await db
    .selectFrom('Category')
    .select('id')
    .where('type', '=', 'event')
    .execute();
  const categoryIds = categories ? categories.map(c => c.id) : [];

  for (let i = 0; i < count; i++) {
    await db.transaction().execute(async trx => {
      const media = await trx
        .insertInto('Media')
        .values({
          title: faker.lorem.words(5),
          body: faker.lorem.sentences(8),
          ownerId: faker.helpers.arrayElement(userIds),
        })
        .returning('id')
        .executeTakeFirstOrThrow();
      if (categoryIds.length > 0) {
        categoryIds.map(c => {
          trx
            .insertInto('CategoryMedia')
            .values({
              mediaId: media.id,
              categoryId: c,
            })
            .execute();
        });
      }
    });
  }
  console.log('Created ' + count + ' media');
}

async function createPartners(count: number) {
  for (let i = 0; i < count; i++) {
    await db.transaction().execute(async trx => {
      const plan = await trx
        .selectFrom('UserPlan')
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
      const hashedPassword = await hash('sunshine');
      await trx
        .insertInto('User')
        .values({
          partnerPlanId: partnerPlan.id,
          bio: faker.lorem.paragraph(),
          email: faker.internet.email(),
          role: Role.ROLE_USER,
          type: UserType.USER_PARTNER,
          organizationName: faker.company.name(),
          addressShort: faker.location.streetAddress(),
          phoneNumber: faker.phone.number(),
          contact: {
            phone_primary: faker.phone.number(),
            phone_secondary: faker.phone.number(),
          },
          password: hashedPassword,
        })
        .execute();
    });
  }
  console.log('Created ' + count + ' partners');
}

async function createVolunteers(count: number) {
  for (let i = 0; i < count; i++) {
    await db.transaction().execute(async trx => {
      const plan = await trx
        .selectFrom('UserPlan')
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
      const hashedPassword = await hash('sunshine');
      await trx
        .insertInto('User')
        .values({
          partnerPlanId: partnerPlan.id,
          bio: faker.lorem.paragraph(),
          email: faker.internet.email(),
          role: Role.ROLE_USER,
          type: UserType.USER_VOLUNTEER,
          addressShort: faker.location.streetAddress(),
          phoneNumber: faker.phone.number(),
          registerCode: faker.phone.number(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          gender: faker.person.gender(),
          birthDate: faker.date.birthdate(),
          contact: {
            phone_primary: faker.phone.number(),
            phone_secondary: faker.phone.number(),
          },
          password: hashedPassword,
        })
        .execute();
    });
  }
  console.log('Created ' + count + ' volunteers');
}

async function createEvents(count: number) {
  const user = await db
    .selectFrom('User')
    .select('id')
    .where('type', '=', 'USER_PARTNER')
    .execute();
  const userIds = user ? user.map(u => u.id) : [];
  const volunteers = await db
    .selectFrom('User')
    .select('id')
    .where('type', '=', 'USER_VOLUNTEER')
    .execute();
  const volunteerIds = volunteers ? volunteers.map(v => v.id) : [];
  const categories = await db
    .selectFrom('Category')
    .select('id')
    .where('type', '=', 'event')
    .execute();
  const categoryIds = categories ? categories.map(c => c.id) : [];

  for (let i = 0; i < count; i++) {
    const betweens = faker.date.betweens({
      from: '2023-01-01T00:00:00.000Z',
      to: '2024-12-01T00:00:00.000Z',
      count: 2,
    });
    await db.transaction().execute(async trx => {
      const ownerId = faker.helpers.arrayElement(userIds);
      const event = await trx
        .insertInto('Event')
        .values({
          featured: faker.datatype.boolean(),
          type: faker.helpers.enumValue(EventType),
          title: faker.person.jobDescriptor(),
          description: faker.lorem.paragraph(),
          contact: {
            phone: faker.phone.number(),
            email: faker.internet.email(),
          },
          location: faker.location.streetAddress(),
          startTime: betweens[0],
          endTime: betweens[1],
          roles: Object.assign(
            {},
            {
              skilss: faker.lorem.word,
              number: faker.number.int(20),
              duties: faker.lorem.words(5),
            }
          ),
          ownerId: ownerId,
          enabled: true,
          status: faker.helpers.enumValue(ProjectStatus),
        })
        .returning('id')
        .executeTakeFirstOrThrow();

      if (categoryIds.length > 0) {
        categoryIds.map(c => {
          trx
            .insertInto('CategoryEvent')
            .values({
              eventId: event.id,
              categoryId: c,
            })
            .execute();
        });
      }
      for (let j = 0; j < 2; j++) {
        trx
          .insertInto('EventCollaborator')
          .values({
            eventId: event.id,
            userId: faker.helpers.arrayElement(
              userIds.filter(u1 => u1 !== ownerId)
            ),
            status: UserStatus.REQUEST_APPROVED,
          })
          .execute();
      }
      for (let j = 0; j < faker.number.int({ min: 5, max: 10 }); j++) {
        trx
          .insertInto('EventParticipator')
          .values({
            eventId: event.id,
            userId: faker.helpers.arrayElement(
              volunteerIds.filter(v1 => v1 !== ownerId)
            ),
            status: UserStatus.REQUEST_APPROVED,
          })
          .execute();
      }
    });
  }
  console.log('Created ' + count + ' events');
}

async function createProjects(count: number) {
  const user = await db
    .selectFrom('User')
    .select('id')
    .where('type', '=', 'USER_PARTNER')
    .execute();
  const userIds = user ? user.map(u => u.id) : [];
  const categories = await db
    .selectFrom('Category')
    .select('id')
    .where('type', '=', 'project')
    .execute();
  const categoryIds = categories ? categories.map(c => c.id) : [];

  for (let i = 0; i < count; i++) {
    const betweens = faker.date.betweens({
      from: '2023-01-01T00:00:00.000Z',
      to: '2024-12-01T00:00:00.000Z',
      count: 2,
    });
    await db.transaction().execute(async trx => {
      const ownerId = faker.helpers.arrayElement(userIds);
      const project = await trx
        .insertInto('Project')
        .values({
          type: faker.helpers.enumValue(ProjectType),
          title: faker.person.jobDescriptor(),
          description: faker.lorem.paragraph(),
          contact: {
            phone: faker.phone.number(),
            email: faker.internet.email(),
          },
          link: faker.internet.url(),
          startTime: betweens[0],
          endTime: betweens[1],
          goalAmount: faker.number.int({ min: 10000, max: 120000000 }),
          currentAmount: faker.number.int({ min: 10000, max: 120000000 }),
          ownerId: ownerId,
          enabled: true,
          status: faker.helpers.enumValue(ProjectStatus),
          featured: faker.datatype.boolean(),
        })
        .returning('id')
        .executeTakeFirstOrThrow();
      if (categoryIds.length > 0) {
        categoryIds.map(c => {
          trx
            .insertInto('CategoryProject')
            .values({
              projectId: project.id,
              categoryId: c,
            })
            .execute();
        });
      }
      for (let j = 0; j < 2; j++) {
        trx
          .insertInto('ProjectCollaborator')
          .values({
            projectId: project.id,
            userId: faker.helpers.arrayElement(
              userIds.filter(u1 => u1 !== ownerId)
            ),
            status: UserStatus.REQUEST_APPROVED,
          })
          .execute();
      }
    });
  }
  console.log('Created ' + count + ' projects');
}

async function main() {
  await clearData();
  await db
    .insertInto('UserPlan')
    .values({
      description: 'Free plan',
      name: 'Free',
      code: 'free',
      duration: 100,
      price: 0,
      originalPrice: 0,
    })
    .returning('id')
    .executeTakeFirstOrThrow();

  await createCategories(20);
  await createPartners(10);
  await createVolunteers(20);
  await createEvents(50);
  await createProjects(50);
  await createMedia(40);
}

main();
