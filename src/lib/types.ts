import type {
  RequestType as RequestTypeConst,
  Role as RoleConst,
  UserType as UserTypeConst,
} from './db/enums';
import type {
  Donation,
  Event,
  EventAssociation,
  EventImage,
  FundAssociation,
  FundImage,
  Fundraising,
  GrantAssociation,
  GrantFundraising,
  GrantImage,
  User,
} from './db/types';

export type Role = (typeof RoleConst)[keyof typeof RoleConst];
export type UserType = (typeof UserTypeConst)[keyof typeof UserTypeConst];
export type RequestType =
  (typeof RequestTypeConst)[keyof typeof RequestTypeConst];

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

export type EventWithOwner = Event & {
  Owner: User;
  Categories: [
    {
      id: string;
      name: string;
      type: string;
      eventId: string;
      categoryId: string;
    }
  ];
  Images: EventImage[];
};

export type FundWithOwner = Fundraising & {
  Owner: User;
  Images: FundImage[];
  Donation: Donation[];
};

export type GrantFundWithOwner = GrantFundraising & {
  Owner: User;
  Images: GrantImage[];
};

export type EventAssociationWithEvent = EventAssociation & {
  Event: Event;
};

export type FundAssociationWithFund = FundAssociation & {
  Fundraising: Fundraising;
};

export type GrantAssociationWithGrant = GrantAssociation & {
  Grant: GrantFundraising;
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
  phone: string;
  email: string;
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
  phoneNumber: string;
  EventAssociation: EventAssociation;
};

export type MyDonation = Donation & {
  Fundraising: FundWithOwner;
};
