import type {
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
  Images: EventImage[];
};

export type FundWithOwner = Fundraising & {
  Owner: User;
  Images: FundImage[];
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
