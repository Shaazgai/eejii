import type { Prisma } from '@prisma/client';
import type { JSONValue } from 'superjson/dist/types';

export type MultiStepFormContextType<Value> = {
  data: Value;
  setData: React.Dispatch<React.SetStateAction<Value>>;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStepIndex: number;
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>;
  next: () => void;
  back: () => void;
  goTo: (index: number) => void;
};

export type AddressType = {
  country: string;
  city: string;
  provinceName: string;
  street: string;
};

export type PartnerFormType = {
  organization: string;
  email: string;
  primary_phone: string;
  secondary_phone: string;
  twitter: string | undefined;
  facebook: string | undefined;
  instagram: string | undefined;
  bio: string;
} & AddressType;

export type VolunteerFormType = {
  firstName: string;
  lastName: string;
  bio: string;
  gender: string;
  birthday: Date;
  email: string;
  primary_phone: string;
  secondary_phone: string | null;
} & AddressType;

export type SupporterFormType = PartnerFormType;

export interface EventType {
  id: string;
  name: string;
  createdAt: Date;
  description: string;
  phone: string;
  email: string;
  address: string;
  image: string;
}

export interface ContactType {
  primary_phone: string | undefined;
  secondary_phone: string | undefined;
  email_1: string | undefined;
  email_2: string | undefined;
}

export interface FundraisingType {
  contact: ContactType;
  currentAmount: number;
  description: string;
  endTime: Date;
  goalAmount: number;
  id: string;
  location: string;
  partnerId: string | undefined;
  startTime: Date;
  title: string;
}

export interface GrantFundraisingType {
  id: string;
  name: string;
  createdAt: Date;
  description: string;
  phone: string;
  email: string;
  address: string;
  image: string;
}

export interface PartnerType {
  id: string;
  userId: string;
  organization: string;
  email: string;
  phoneNumbers: JSONValue;
  bio: string | null;
  socialLinks: JSONValue;
  addressId: string | null;
}
export type SupporterType = {
  id: string;
  userId: string;
  organization: string;
  email: string;
  phoneNumbers: Prisma.JsonValue;
  bio: string;
  socialLinks: Prisma.JsonValue;
  addressId: string | null;
};

export type VolunteerType = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumbers: Prisma.JsonValue;
  email: string | null;
  approved: boolean;
  birthday: Date | null;
  gender: string | null;
  bio: string | null;
  userId: string;
  xp: number | null;
  addressId: string | null;
};

export interface PartnerFundraisingType {
  id: string;
  createdAt: Date;
  role: string | null;
  status: string | null;
  type: string | null;
  partnerId: string | null;
  fundraisingId: string;
  Fundraising: FundraisingType | null;
  Partner: PartnerType | null;
}

export interface JoinRequestTableProps {
  requestId: string;
  status: string;
  createdAt: Date;
  role: string | null;
  type: string;
  projectTitle: string;
  projectId: string;
  userEmail: string;
  userId: string;
  userName?: string;
  userType: string;
  userPhoneNumbers?: Prisma.JsonValue;
}

export interface JRNFundraisingProps {
  id: string;
  title: string;
  FundraisingPartner: {
    id: string;
    status: string;
    createdAt: Date;
    role: string | null;
    type: string | null;
    Partner: JRNPartnerProps | null;
  }[];
  FundraisingSupporter: {
    id: string;
    status: string;
    createdAt: Date;
    role: string | null;
    type: string | null;
    Supporter: JRNSupporterProps | null;
  }[];
}

export interface JRNGrantProps {
  id: string;
  title: string;
  GrantFundraisingPartner: {
    id: string;
    status: string;
    createdAt: Date;
    role: string | null;
    type: string | null;
    Partner: JRNPartnerProps | null;
  }[];
  GrantFundraisingSupporter: {
    id: string;
    status: string;
    createdAt: Date;
    role: string | null;
    type: string | null;
    Supporter: JRNSupporterProps | null;
  }[];
}

export interface JRNEventProps {
  id: string;
  title: string;
  EventPartner: {
    id: string;
    status: string;
    createdAt: Date;
    role: string | null;
    type: string | null;
    Partner: JRNPartnerProps | null;
  }[];
  EventSupporter: {
    id: string;
    status: string;
    createdAt: Date;
    role: string | null;
    type: string | null;
    Supporter: JRNSupporterProps | null;
  }[];
  EventVolunteer: {
    id: string;
    status: string;
    createdAt: Date;
    role: string | null;
    type: string | null;
    Volunteer: JRNVolunteer | null;
  }[];
}

export interface JRNPartnerProps {
  id: string;
  email: string;
  phoneNumbers: Prisma.JsonValue;
  organization: string;
}
export interface JRNSupporterProps {
  id: string;
  email: string;
  phoneNumbers: Prisma.JsonValue;
  organization: string;
}
export interface JRNVolunteer {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumbers: Prisma.JsonValue;
}
