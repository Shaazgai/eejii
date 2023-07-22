import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type { MultiStepFormContextType, VolunteerFormType } from '@/lib/types';
import { addressSchema } from '@/lib/validation/address-validation-schema';
import { volunteerSchema } from '@/lib/validation/volunteer-registration-schema';
import { api } from '@/utils/api';

export const VolunteerFormContext = createContext<
  MultiStepFormContextType<VolunteerFormType> | undefined
>(undefined);

export const initialData: VolunteerFormType = {
  firstName: '',
  lastName: '',
  bio: '',
  gender: '',
  birthday: new Date(),
  country: '',
  city: '',
  provinceName: '',
  street: '',
  email: '',
  primary_phone: '',
  secondary_phone: '',
};

export function VolunteerFormProvider({ steps }: { steps: ReactElement[] }) {
  const router = useRouter();
  const [data, setData] = useState<VolunteerFormType>(initialData);
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
  const { mutate } = api.volunteer.create.useMutation({
    onSuccess: newVolunteer => {
      console.log(newVolunteer);
      setData(initialData);
      router.push('/v');
    },
  });

  async function submit() {
    mutate(data);
  }
  useEffect(() => {
    const validation = volunteerSchema.merge(addressSchema).safeParse(data);
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
    <VolunteerFormContext.Provider
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
    </VolunteerFormContext.Provider>
  );
}

export function useVolunteerFormState() {
  const context = useContext(VolunteerFormContext);
  if (!context) {
    throw new Error(
      'useVolunteerFormState must be used within the VolunteerFormProvider'
    );
  }

  return context;
}
