import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Role } from './enums';

export type Address = {
  id: string;
  country: string;
  city: string;
  provinceName: string;
  street: string;
};
export type Category = {
  id: string;
  name: string;
  type: string | null;
};
export type CategoryEvent = {
  id: string;
  eventId: string | null;
  categoryId: string | null;
};
export type CategoryFundraising = {
  id: string;
  fundraisingId: string | null;
  categoryId: string | null;
};
export type CategoryGrantFundraising = {
  id: string;
  grantFundraisingId: string | null;
  categoryId: string | null;
};
export type Certificate = {
  id: string;
  name: string;
  description: string;
};
export type Donation = {
  id: string;
  amount: number;
  userId: string | null;
  isPublicName: Generated<number>;
  fundraisingId: string | null;
  createdAt: Generated<Timestamp>;
};
export type EducationHistory = {
  id: string;
  level: string;
  schoolName: string;
  from: Timestamp;
  to: Timestamp | null;
  graduate: Generated<number>;
  volunteerId: string | null;
};
export type EmploymentHistory = {
  id: string;
  company: string;
  position: string;
  from: Timestamp;
  to: Timestamp | null;
  currentlyWorking: Generated<number>;
  volunteerId: string | null;
};
export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  roles: unknown | null;
  createdAt: Generated<Timestamp>;
  startTime: Timestamp | null;
  endTime: Timestamp | null;
  requiredTime: string | null;
  contact: unknown | null;
  ownerId: string | null;
};
export type EventPartner = {
  id: string;
  createdAt: Generated<Timestamp>;
  role: string | null;
  status: string;
  type: string | null;
  partnerId: string;
  eventId: string | null;
};
export type EventSupporter = {
  id: string;
  createdAt: Generated<Timestamp>;
  role: string | null;
  status: string;
  type: string | null;
  supporterId: string;
  eventId: string | null;
};
export type EventVolunteer = {
  id: string;
  volunteerId: string;
  eventId: string | null;
  createdAt: Generated<Timestamp>;
  role: string | null;
  status: string;
  type: string | null;
};
export type Fundraising = {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  contact: unknown | null;
  location: string | null;
  startTime: Timestamp | null;
  endTime: Timestamp | null;
  partnerId: string | null;
};
export type FundraisingPartner = {
  id: string;
  createdAt: Generated<Timestamp>;
  role: string | null;
  status: string;
  type: string | null;
  partnerId: string | null;
  fundraisingId: string | null;
};
export type FundraisingSupporter = {
  id: string;
  createdAt: Generated<Timestamp>;
  role: string | null;
  status: string;
  type: string | null;
  supporterId: string | null;
  fundraisingId: string | null;
};
export type GrantFundraising = {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  contact: unknown | null;
  location: string | null;
  startTime: Timestamp | null;
  endTime: Timestamp | null;
  ownerId: string | null;
};
export type GrantFundraisingPartner = {
  id: string;
  createdAt: Generated<Timestamp>;
  role: string | null;
  status: string;
  type: string | null;
  grantFundraisingId: string | null;
  partnerId: string | null;
};
export type GrantFundraisingSupporter = {
  id: string;
  createdAt: Generated<Timestamp>;
  role: string | null;
  status: string;
  type: string | null;
  supporterId: string | null;
  grantFundraisingId: string | null;
};
export type Partner = {
  id: string;
  userId: string;
  organization: string;
  email: string;
  phoneNumbers: unknown;
  bio: string;
  socialLinks: unknown | null;
  addressId: string | null;
};
export type Payment = {
  id: string;
  amount: number;
  invoiceId: string | null;
  status: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp | null;
  donationId: string;
  details: unknown | null;
};
export type Skill = {
  id: string;
  name: string;
};
export type Supporter = {
  id: string;
  userId: string;
  organization: string;
  email: string;
  phoneNumbers: unknown;
  bio: string;
  socialLinks: unknown | null;
  addressId: string | null;
};
export type User = {
  id: string;
  externalId: string;
  username: string;
  email: string;
  createdAt: Generated<Timestamp>;
  role: Generated<Role>;
  type: string | null;
};
export type Volunteer = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumbers: unknown | null;
  email: string | null;
  approved: Generated<number>;
  birthday: Timestamp | null;
  gender: string | null;
  bio: string | null;
  skills: unknown | null;
  userId: string;
  xp: Generated<number | null>;
  addressId: string | null;
};
export type DB = {
  Address: Address;
  Category: Category;
  CategoryEvent: CategoryEvent;
  CategoryFundraising: CategoryFundraising;
  CategoryGrantFundraising: CategoryGrantFundraising;
  Certificate: Certificate;
  Donation: Donation;
  EducationHistory: EducationHistory;
  EmploymentHistory: EmploymentHistory;
  Event: Event;
  EventPartner: EventPartner;
  EventSupporter: EventSupporter;
  EventVolunteer: EventVolunteer;
  Fundraising: Fundraising;
  FundraisingPartner: FundraisingPartner;
  FundraisingSupporter: FundraisingSupporter;
  GrantFundraising: GrantFundraising;
  GrantFundraisingPartner: GrantFundraisingPartner;
  GrantFundraisingSupporter: GrantFundraisingSupporter;
  Partner: Partner;
  Payment: Payment;
  Skill: Skill;
  Supporter: Supporter;
  User: User;
  Volunteer: Volunteer;
};
