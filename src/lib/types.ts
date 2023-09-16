import type {
  Event,
  EventAssociation,
  FundAssociation,
  Fundraising,
  GrantAssociation,
  GrantFundraising,
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
};

export type FundWithOwner = Fundraising & {
  Owner: User;
};

export type GrantFundWithOwner = GrantFundraising & {
  Owner: User;
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
