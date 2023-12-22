import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Role, UserType, RequestType, ProjectStatus } from './enums';

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
export type CategoryMedia = {
  id: Generated<string>;
  mediaId: string | null;
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
  enabled: boolean;
  status: ProjectStatus | null;
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
export type EventImage = {
  id: Generated<string>;
  ownerId: string;
  path: string;
  type: string | null;
};
export type FundAssociation = {
  id: Generated<string>;
  userId: string | null;
  fundraisingId: string | null;
  status: string | null;
  type: string | null;
};
export type FundImage = {
  id: Generated<string>;
  ownerId: string;
  path: string;
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
  enabled: boolean;
  status: ProjectStatus | null;
  createdAt: Generated<Timestamp>;
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
  enabled: boolean;
  status: ProjectStatus | null;
  startTime: Timestamp | null;
  endTime: Timestamp | null;
  createdAt: Generated<Timestamp>;
  ownerId: string | null;
};
export type GrantImage = {
  id: Generated<string>;
  ownerId: string;
  path: string;
  type: string | null;
};
export type Media = {
  id: Generated<string>;
  title: string;
  body: string;
  ownerId: string;
  createdAt: Generated<Timestamp>;
};
export type MediaImage = {
  id: Generated<string>;
  ownerId: string;
  path: string;
  type: string | null;
};
export type Notification = {
  id: Generated<string>;
  receiverId: string;
  senderId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp | null;
  status: string | null;
  link: string | null;
  title: string;
  body: string | null;
  type: string;
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
  addressShort: string | null;
  requestStatus: RequestType | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  bio: string | null;
  birthDate: Timestamp | null;
  skills: string | null;
  registerCode: string | null;
  organizationName: string | null;
  organizationType: string | null;
  introduction: string | null;
  contact: unknown | null;
};
export type UserImage = {
  id: Generated<string>;
  ownerId: string;
  path: string;
  type: string | null;
};
export type DB = {
  Address: Address;
  Category: Category;
  CategoryEvent: CategoryEvent;
  CategoryFundraising: CategoryFundraising;
  CategoryGrantFundraising: CategoryGrantFundraising;
  CategoryMedia: CategoryMedia;
  Certificate: Certificate;
  Donation: Donation;
  Event: Event;
  EventAssociation: EventAssociation;
  EventImage: EventImage;
  FundAssociation: FundAssociation;
  FundImage: FundImage;
  Fundraising: Fundraising;
  GrantAssociation: GrantAssociation;
  GrantFundraising: GrantFundraising;
  GrantImage: GrantImage;
  Media: Media;
  MediaImage: MediaImage;
  Notification: Notification;
  Payment: Payment;
  Skill: Skill;
  User: User;
  UserImage: UserImage;
};
