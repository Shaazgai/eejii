'use client';

import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type * as types from '@/lib/types';
import { type MultiStepFormContextType } from '@/lib/types';
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

  const {
    data: partner,
    isLoading,
    error,
  } = api.partner.getCurrentUsers.useQuery(undefined);

  useEffect(() => {
    if (partner && !isLoading && !error) {
      const partnerData = {
        organization: partner.organization as string,
        email: partner.email as string,
        bio: partner.bio as string,
        primary_phone: (partner.phoneNumbers as unknown as types.ContactType)
          .primary_phone as string,
        secondary_phone: (partner.phoneNumbers as unknown as types.ContactType)
          .secondary_phone as string,
        twitter: (partner.socialLinks as unknown as types.ContactType)
          .twitter as string,
        facebook: (partner.socialLinks as unknown as types.ContactType)
          .facebook as string,
        instagram: (partner.socialLinks as unknown as types.ContactType)
          .instagram as string,
        country: partner.Address?.country as string,
        city: partner.Address?.city as string,
        provinceName: partner.Address?.provinceName as string,
        street: partner.Address?.street as string,
      };
      setData(partnerData);
    }
  }, [partner, isLoading, error]);
  console.log(data);
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
  const { mutate } = api.partner.createOrUpdate.useMutation({
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
    if (isComplete) {
      submit();
      setIsComplete(false);
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
        setIsComplete,
        isComplete,
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
