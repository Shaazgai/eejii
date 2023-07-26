import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type {
  ContactType,
  MultiStepFormContextType,
  SupporterFormType,
} from '@/lib/types';
import { api } from '@/utils/api';

export const SupporterFormContext = createContext<
  MultiStepFormContextType<SupporterFormType> | undefined
>(undefined);

export const initialData: SupporterFormType = {
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

export function SupporterFormProvider({ steps }: { steps: ReactElement[] }) {
  const router = useRouter();
  const [data, setData] = useState<SupporterFormType>(initialData);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps?.length - 1;

  const {
    data: supporter,
    isLoading,
    error,
  } = api.supporter.getCurrentUsers.useQuery(undefined);

  useEffect(() => {
    if (supporter && !isLoading && !error) {
      const partnerData = {
        organization: supporter.organization as string,
        email: supporter.email as string,
        bio: supporter.bio as string,
        primary_phone: (supporter.phoneNumbers as unknown as ContactType)
          .primary_phone as string,
        secondary_phone: (supporter.phoneNumbers as unknown as ContactType)
          .secondary_phone as string,
        twitter: (supporter.socialLinks as unknown as ContactType)
          .twitter as string,
        facebook: (supporter.socialLinks as unknown as ContactType)
          .facebook as string,
        instagram: (supporter.socialLinks as unknown as ContactType)
          .instagram as string,
        country: supporter.Address?.country as string,
        city: supporter.Address?.city as string,
        provinceName: supporter.Address?.provinceName as string,
        street: supporter.Address?.street as string,
      };
      setData(partnerData);
    }
  }, [supporter, isLoading, error]);

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
  const { mutate, isSuccess } = api.supporter.create.useMutation({
    onSuccess: newSupporter => {
      console.log(newSupporter);
      console.log(isSuccess);
      setData(initialData);
      router.push('/s');
    },
  });

  async function submit() {
    mutate(data);
  }

  useEffect(() => {
    if (isComplete) {
      submit();
    }
  }, [isComplete]);

  return (
    <SupporterFormContext.Provider
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
        isComplete,
        setIsComplete,
      }}
    >
      {steps[currentStepIndex]}
    </SupporterFormContext.Provider>
  );
}

export function useSupporterFormState() {
  const context = useContext(SupporterFormContext);
  if (!context) {
    throw new Error(
      'useSupporterFormState must be used within the SupporterFormProvider'
    );
  }

  return context;
}
