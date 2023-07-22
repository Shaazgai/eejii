import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type { MultiStepFormContextType, SupporterFormType } from '@/lib/types';
import { addressSchema } from '@/lib/validation/address-validation-schema';
import { supporterSchema } from '@/lib/validation/partner-validation-schema';
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
    const validation = supporterSchema.merge(addressSchema).safeParse(data);
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
