import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { createContext, useContext, useState } from 'react';

import type { MultiStepFormContextType, SupporterType } from '@/lib/types';
import { api } from '@/utils/api';

export const SupporterFormContext = createContext<
  MultiStepFormContextType<SupporterType> | undefined
>(undefined);

export const initialData: SupporterType = {
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
  const [data, setData] = useState<SupporterType>(initialData);
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
  const { mutate } = api.supporter.create.useMutation({
    onSuccess: newSupporter => {
      console.log(newSupporter);
      setData(initialData);
      router.push('/s');
    },
  });

  async function submit() {
    console.log(data);
    await setTimeout(() => {}, 1000);
    mutate(data);
  }

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
        submit,
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
