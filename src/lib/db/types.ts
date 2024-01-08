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
  type: string | null;
  thumbnail: string | null;
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
  number: string;
  grade: number;
  createdAt: Generated<Timestamp>;
  volunteerName: string;
  organizationName: string;
  volunteerId: string | null;
  organizationId: string | null;
  certificateTemplateId: string | null;
};
export type CertificateTemplate = {
  id: Generated<string>;
  title: string;
  description: string;
  shortDescription: string | null;
  organizationName: string;
  logoPath: string | null;
  stampPath: string;
  userId: string | null;
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
  featured: boolean;
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
export type PartnerBanner = {
  id: Generated<string>;
  bannerId: string;
  userId: string | null;
  active: boolean;
  startDate: Timestamp;
  endDate: Timestamp;
};
export type PartnerPermit = {
  id: Generated<string>;
  eventPermit: Generated<number>;
  projectPermit: Generated<number>;
  bannerPermit: Generated<number>;
  userId: string | null;
};
export type PartnerPlan = {
  id: Generated<string>;
  startDate: Timestamp;
  endDate: Timestamp;
  active: Generated<boolean>;
  planId: string;
};
export type Payment = {
  id: Generated<string>;
  amount: number;
  invoiceId: string | null;
  status: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp | null;
  details: unknown | null;
  userId: string | null;
  donationId: string | null;
  planId: string | null;
  bannerPositionId: string | null;
  permitId: string | null;
};
export type Permit = {
  id: Generated<string>;
  name: string;
  description: string;
  code: string;
  price: string;
  originalPrice: string;
  eventPermit: Generated<number>;
  projectPermit: Generated<number>;
  bannerPermit: Generated<number>;
};
export type Plan = {
  id: Generated<string>;
  code: string;
  name: string;
  description: string;
  duration: number;
  price: string;
  originalPrice: string;
};
export type PlanImage = {
  id: Generated<string>;
  path: string | null;
  type: string;
  ownerId: string;
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
  featured: boolean;
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
  partnerPlanId: string;
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
  CertificateTemplate: CertificateTemplate;
  Donation: Donation;
  Event: Event;
  EventCollaborator: EventCollaborator;
  EventImage: EventImage;
  EventParticipator: EventParticipator;
  Media: Media;
  MediaImage: MediaImage;
  Notification: Notification;
  PartnerBanner: PartnerBanner;
  PartnerPermit: PartnerPermit;
  PartnerPlan: PartnerPlan;
  Payment: Payment;
  Permit: Permit;
  Plan: Plan;
  PlanImage: PlanImage;
  Project: Project;
  ProjectCollaborator: ProjectCollaborator;
  ProjectImage: ProjectImage;
  Skill: Skill;
  User: User;
  UserImage: UserImage;
};
