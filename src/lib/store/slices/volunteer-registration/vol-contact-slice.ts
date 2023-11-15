import type { StateCreator } from 'zustand';

type ContactInfo = {
  birthdate: string;
  isMale: boolean;
  registerCode: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
};

type ContactInfoSlice = {
  contactInfo: ContactInfo;
  setContactInfo: (data: ContactInfo) => void;
};

const initialState = {
  birthdate: '',
  birthDay: 1,
  birthMonth: 1,
  birthYear: 2013,
  isMale: true,
  registerCode: '',
};

const VolContactSlice: StateCreator<ContactInfoSlice> = set => ({
  contactInfo: initialState,
  setContactInfo: data =>
    set(state => ({ contactInfo: { ...state.contactInfo, ...data } })),
});

export default VolContactSlice;
export type { ContactInfo, ContactInfoSlice };
