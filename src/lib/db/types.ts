import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Role, UserType, RequestType } from './enums';

export type Address = {
  id: Generated<string>;
  country: string;
  city: string;
  provinceName: string;
  street: string;
  userId: string | null;
};
export type Category = {
  id: Generated<string>;
  name: string;
  type: string | null;
};
export type CategoryEvent = {
  id: Generated<string>;
  eventId: string | null;
  categoryId: string | null;
};
export type CategoryFundraising = {
  id: Generated<string>;
  fundraisingId: string | null;
  categoryId: string | null;
};
export type CategoryGrantFundraising = {
  id: Generated<string>;
  grantFundraisingId: string | null;
  categoryId: string | null;
};
export type Certificate = {
  id: Generated<string>;
  name: string;
  description: string;
  volunteerId: string | null;
};
export type Donation = {
  id: Generated<string>;
  amount: number;
  userId: string | null;
  isPublicName: Generated<boolean>;
  fundraisingId: string | null;
  createdAt: Generated<Timestamp>;
};
export type Event = {
  id: Generated<string>;
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
export type EventAssociation = {
  id: Generated<string>;
  userId: string | null;
  eventId: string | null;
  status: string | null;
  type: string | null;
};
export type FundAssociation = {
  id: Generated<string>;
  userId: string | null;
  fundraisingId: string | null;
  status: string | null;
  type: string | null;
};
export type Fundraising = {
  id: Generated<string>;
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
export type GrantAssociation = {
  id: Generated<string>;
  userId: string | null;
  grantId: string | null;
  status: string | null;
  type: string | null;
};
export type GrantFundraising = {
  id: Generated<string>;
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
export type Payment = {
  id: Generated<string>;
  amount: number;
  invoiceId: string | null;
  status: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp | null;
  donationId: string;
  details: unknown | null;
};
export type Skill = {
  id: Generated<string>;
  name: string;
};
export type User = {
  id: Generated<string>;
  email: string;
  phoneNumber: string;
  createdAt: Generated<Timestamp>;
  role: Generated<Role>;
  type: Generated<UserType>;
  requestSend: Generated<boolean>;
  password: string | null;
  requestStatus: RequestType | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  bio: string | null;
  birthday: Timestamp | null;
  skills: string | null;
  organization: string | null;
  contact: unknown | null;
};
export type DB = {
  Address: Address;
  Category: Category;
  CategoryEvent: CategoryEvent;
  CategoryFundraising: CategoryFundraising;
  CategoryGrantFundraising: CategoryGrantFundraising;
  Certificate: Certificate;
  Donation: Donation;
  Event: Event;
  EventAssociation: EventAssociation;
  FundAssociation: FundAssociation;
  Fundraising: Fundraising;
  GrantAssociation: GrantAssociation;
  GrantFundraising: GrantFundraising;
  Payment: Payment;
  Skill: Skill;
  User: User;
};
