import { db } from '../src/server/db';
import {
  Role,
  UserType,
  ProjectType,
  EventType,
  ProjectStatus,
} from '../src/lib/db/enums';
import { hash } from 'argon2';
import { faker } from '@faker-js/faker';

async function createCategories(count: number) {
  for (let i = 0; i < count; i++) {
    await db
      .insertInto('Category')
      .values({
        name: faker.lorem.word(),
        type: faker.helpers.arrayElement(['event', 'project']),
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
  for (let i = 0; i < count; i++) {
    await db
      .insertInto('Media')
      .values({
        title: faker.lorem.words(5),
        body: faker.lorem.sentences(8),
        ownerId: faker.helpers.arrayElement(userIds),
      })
      .execute();
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
  for (let i = 0; i < count; i++) {
    await db
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
        startTime: faker.date.soon(),
        endTime: faker.date.future({ years: 1 }),
        roles: Object.assign(
          {},
          {
            skilss: faker.lorem.word,
            number: faker.number.int(20),
            duties: faker.lorem.words(5),
          }
        ),
        ownerId: faker.helpers.arrayElement(userIds),
        enabled: true,
        status: faker.helpers.enumValue(ProjectStatus),
      })
      .executeTakeFirstOrThrow();
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
  for (let i = 0; i < count; i++) {
    await db
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
        startTime: faker.date.soon(),
        goalAmount: faker.number.int({ min: 10000, max: 120000000 }),
        currentAmount: faker.number.int({ min: 10000, max: 120000000 }),
        ownerId: faker.helpers.arrayElement(userIds),
        enabled: true,
        status: faker.helpers.enumValue(ProjectStatus),
        featured: faker.datatype.boolean(),
      })
      .executeTakeFirstOrThrow();
  }
  console.log('Created ' + count + ' projects');
}

async function main() {
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

  await createPartners(10);
  await createVolunteers(20);
  await createEvents(50);
  await createProjects(50);
  await createCategories(20);
  await createMedia(40);
}

main();
