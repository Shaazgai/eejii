import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { createContext, useContext, useState } from 'react';

import type { MultiStepFormContextType, VolunteerType } from '@/lib/types';
import { api } from '@/utils/api';

export const VolunteerFormContext = createContext<
  MultiStepFormContextType<VolunteerType> | undefined
>(undefined);

export const initialData: VolunteerType = {
  firstName: '',
  lastName: '',
  bio: '',
  gender: '',
  birthday: new Date(),
  country: '',
  city: '',
  provinceName: '',
  street: '',
};

export function VolunteerFormProvider({ steps }: { steps: ReactElement[] }) {
  const router = useRouter();
  const [data, setData] = useState<VolunteerType>(initialData);
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
    console.log(data);
    await setTimeout(() => {}, 1000);
    mutate(data);
  }

  console.log(data);

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
