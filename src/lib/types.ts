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
  submit: () => void;
};

export type AddressType = {
  country: string;
  city: string;
  provinceName: string;
  street: string;
};

export type PartnerType = {
  organization: string;
  email: string;
  primary_phone: string;
  secondary_phone: string;
  twitter: string | undefined;
  facebook: string | undefined;
  instagram: string | undefined;
  bio: string;
} & AddressType;

export type VolunteerType = {
  firstName: string;
  lastName: string;
  bio: string;
  gender: string;
  birthday: Date;
} & AddressType;

export type SupporterType = PartnerType;

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

export interface FundaisingType {
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

export interface GrantfundraisingType {
  id: string;
  name: string;
  createdAt: Date;
  description: string;
  phone: string;
  email: string;
  address: string;
  image: string;
}
