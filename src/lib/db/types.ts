import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type {
  Role,
  UserType,
  ProjectType,
  EventType,
  UserStatus,
  ProjectStatus,
} from './enums';

export type Address = {
  id: Generated<string>;
  country: string;
  city: string;
  provinceName: string;
  street: string;
  userId: string | null;
};
export type Banner = {
  id: Generated<string>;
  path: string | null;
  mobilePath: string | null;
  title: string | null;
  description: string | null;
  link: string | null;
  bannerPositionId: string | null;
};
export type BannerPosition = {
  id: Generated<string>;
  code: string;
  label: string;
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
export type CategoryMedia = {
  id: Generated<string>;
  mediaId: string | null;
  categoryId: string | null;
};
export type CategoryProject = {
  id: Generated<string>;
  projectId: string | null;
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
  projectId: string | null;
  createdAt: Generated<Timestamp>;
};
export type Event = {
  id: Generated<string>;
  type: Generated<EventType>;
  title: string;
  description: string;
  location: string;
  status: ProjectStatus | null;
  createdAt: Generated<Timestamp>;
  enabled: boolean;
  startTime: Timestamp | null;
  endTime: Timestamp | null;
  contact: unknown | null;
  roles: unknown | null;
  ownerId: string | null;
};
export type EventCollaborator = {
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
export type EventParticipator = {
  id: Generated<string>;
  userId: string | null;
  eventId: string | null;
  status: string | null;
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
export type Project = {
  id: Generated<string>;
  type: Generated<ProjectType>;
  title: string;
  description: string;
  contact: unknown | null;
  startTime: Timestamp | null;
  endTime: Timestamp | null;
  enabled: boolean;
  status: ProjectStatus | null;
  createdAt: Generated<Timestamp>;
  link: string | null;
  goalAmount: number | null;
  currentAmount: number | null;
  ownerId: string | null;
};
export type ProjectCollaborator = {
  id: Generated<string>;
  userId: string | null;
  projectId: string | null;
  status: string | null;
  type: string | null;
};
export type ProjectImage = {
  id: Generated<string>;
  ownerId: string;
  path: string;
  type: string | null;
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
  requestStatus: UserStatus | null;
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
  Banner: Banner;
  BannerPosition: BannerPosition;
  Category: Category;
  CategoryEvent: CategoryEvent;
  CategoryMedia: CategoryMedia;
  CategoryProject: CategoryProject;
  Certificate: Certificate;
  Donation: Donation;
  Event: Event;
  EventCollaborator: EventCollaborator;
  EventImage: EventImage;
  EventParticipator: EventParticipator;
  Media: Media;
  MediaImage: MediaImage;
  Notification: Notification;
  Payment: Payment;
  Project: Project;
  ProjectCollaborator: ProjectCollaborator;
  ProjectImage: ProjectImage;
  Skill: Skill;
  User: User;
  UserImage: UserImage;
};
