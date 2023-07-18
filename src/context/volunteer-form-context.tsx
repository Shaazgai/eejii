import type { ReactElement } from 'react';
import React, { createContext, useContext, useState } from 'react';

import type { MultiStepFormContextType, VolunteerFormType } from '@/lib/types';

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
};

export function VolunteerFormProvider({ steps }: { steps: ReactElement[] }) {
  const [data, setData] = useState<VolunteerFormType>(initialData);
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
