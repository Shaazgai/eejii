import type {
  Role as RoleConst,
  UserStatus as UserStatusConst,
  UserType as UserTypeConst,
} from './db/enums';
import type {
  Address,
  Banner as BannerDB,
  BannerPosition,
  Category,
  CategoryEvent,
  CategoryMedia,
  CategoryProject,
  Donation,
  Event as EventDB,
  EventImage,
  EventParticipator as EventParticipatorDB,
  Media as MediaDB,
  MediaImage as MediaImageDB,
  Project as ProjectDB,
  ProjectImage,
  ProjectCollaborator as ProjectCollaboratorDB,
  User as UserDB,
  UserImage,
  EventCollaborator as EventCollaboratorDB,
} from './db/types';

export type Role = (typeof RoleConst)[keyof typeof RoleConst];
export type UserType = (typeof UserTypeConst)[keyof typeof UserTypeConst];
export type UserStatus = (typeof UserStatusConst)[keyof typeof UserStatusConst];

export type VolunteerTableProps = {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: Date;
  createdAt: Date;
  requestStatus: string;
  id: string;
};

export type Event = EventDB & {
  Owner: UserDB & {
    Images: UserImage[];
  };
  Categories: [
    {
      id: string;
      name: string;
      type: string;
      eventId: string;
      categoryId: string;
    },
  ];
  Images: EventImage[];
  Collaborators: EventCollaborator[];
  Participators: EventParticipator[];
};

export type Project = ProjectDB & {
  Owner: UserDB & {
    Images: UserImage[];
  };
  Images: ProjectImage[];
  Donation: Donation[];
  Categories: [
    {
      id: string;
      name: string;
      type: string;
      eventId: string;
      categoryId: string;
    },
  ];
  Collaborators: ProjectCollaborator[];
};

export type EventParticipator = EventParticipatorDB & {
  User: User;
};

export type EventCollaborator = EventCollaboratorDB & {
  User: User;
};

export type ProjectCollaborator = ProjectCollaboratorDB & {
  User: User;
};

export type S3ParamType = {
  'Content-Type': string;
  Key: string;
  Policy: string;
  'X-Amz-Algorithm': string;
  'X-Amz-Credential': string;
  'X-Amz-Date': string;
  'X-Amz-Signature': string;
  bucket: string;
};

export type Contact = {
  phone?: string;
  email?: string;
  facebookUrl?: string;
  instagramUrl?: string;
};

export type PaymentDetails = {
  qr_image: string;
};

export type EventRole = {
  skills: string;
  duties: string;
  number: string;
};

export type Tab = {
  title: string;
  href: string;
};

export type ListResponse<TData> = {
  items: TData[];
  pagination: Pagination;
};

export type Pagination = {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
  totalCount: number;
};

export type MyVolunteer = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
  bio: string;
  phoneNumber: string;
  Address: Address;
  EventParticipator: EventParticipatorDB;
};

export type MyDonation = Donation & {
  Project: Project;
};

export type User = UserDB & {
  Images: UserImage[];
};

export type Media = MediaDB & {
  Images: MediaImageDB[];
  Categories: {
    name: string;
    type: string;
    path: string;
    categoryId: string;
    mediaId: string;
  }[];
  Owner: UserDB;
};

export type MediaCategory = CategoryMedia & {
  Category: Category;
};
export type EventCategory = CategoryEvent & {
  Category: Category;
};
export type ProjectCategory = CategoryProject & {
  Category: Category;
};

export type Banner = BannerDB & {
  Position: BannerPosition;
};
