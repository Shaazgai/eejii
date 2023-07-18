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
  twitter: string | null;
  facebook: string | null;
  instagram: string | null;
  bio: string;
} & AddressType;

export type VolunteerFormType = {
  firstName: string;
  lastName: string;
  bio: string;
  gender: string;
  birthday: Date;
} & AddressType;
