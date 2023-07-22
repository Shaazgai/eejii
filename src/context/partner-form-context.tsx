'use client';

import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type * as types from '@/lib/types';
import { type MultiStepFormContextType } from '@/lib/types';
import { addressSchema } from '@/lib/validation/address-validation-schema';
import { partnerSchema } from '@/lib/validation/partner-validation-schema';
import { api } from '@/utils/api';

export const PartnerFormContext = createContext<
  MultiStepFormContextType<types.PartnerFormType> | undefined
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
  const router = useRouter();
  const [data, setData] = useState<types.PartnerFormType>(initialData);
  const [isComplete, setIsComplete] = useState(false);
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
  const { mutate } = api.partner.create.useMutation({
    onSuccess: newPartner => {
      console.log(newPartner);
      setData(initialData);
      router.push('/p');
    },
  });

  async function submit() {
    mutate(data);
  }
  useEffect(() => {
    const validation = partnerSchema.merge(addressSchema).safeParse(data);
    if (isLastStep && validation.success) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [isLastStep, data]);

  useEffect(() => {
    if (isComplete) {
      submit();
    }
  }, [isComplete]);

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
        submit,
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
