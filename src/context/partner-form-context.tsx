'use client';

import type { ReactElement } from 'react';
import React from 'react';
import { createContext, useContext, useState } from 'react';

import type * as types from '@/lib/types';
import { type MultiStepFormContextType } from '@/lib/types';

export const PartnerFormContext = createContext<
  | MultiStepFormContextType<types.AddressFormType<types.PartnerFormType>>
  | undefined
>(undefined);

export const initialData: types.PartnerFormType = {
  organization: '',
  email: '',
  bio: '',
  primary_phone: '',
  secondary_phone: '',
  twitter: '',
  facebook: '',
  instagram: '',
  country: '',
  city: '',
  provinceName: '',
  street: '',
};

export function PartnerFormProvider({ steps }: { steps: ReactElement[] }) {
  const [data, setData] =
    useState<types.AddressFormType<types.PartnerFormType>>(initialData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps?.length - 1;
  function next() {
    setCurrentStepIndex(i => {
      if (i >= steps?.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex(i => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return (
    <PartnerFormContext.Provider
      value={{
        data,
        setData,
        isFirstStep,
        isLastStep,
        currentStepIndex,
        setCurrentStepIndex,
        next,
        back,
        goTo,
      }}
    >
      {steps[currentStepIndex]}
    </PartnerFormContext.Provider>
  );
}

export function usePartnerFormState() {
  const context = useContext(PartnerFormContext);
  if (!context) {
    throw new Error(
      'usePartnerFormState must be used within the PartnerFormProvider'
    );
  }

  return context;
}
