import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type {
  ContactType,
  MultiStepFormContextType,
  VolunteerFormType,
} from '@/lib/types';
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
  skills: [],
};

export function VolunteerFormProvider({ steps }: { steps: ReactElement[] }) {
  const router = useRouter();

  const [data, setData] = useState<VolunteerFormType>(initialData);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps?.length - 1;

  const {
    data: volunteer,
    isLoading,
    error,
  } = api.volunteer.getCurrentUsers.useQuery(undefined);

  useEffect(() => {
    if (volunteer && !isLoading && !error) {
      const volunteerData = {
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
        bio: volunteer.bio as string,
        gender: volunteer.gender as string,
        birthday: volunteer.birthday as Date,
        country: volunteer.Address?.country as string,
        city: volunteer.Address?.city as string,
        provinceName: volunteer.Address?.provinceName as string,
        street: volunteer.Address?.street as string,
        email: volunteer.email as string,
        primary_phone: (volunteer.phoneNumbers as unknown as ContactType)
          .primary_phone as string,
        secondary_phone: (volunteer.phoneNumbers as unknown as ContactType)
          ?.secondary_phone as string,
        skills: volunteer.skills as unknown as string[],
      };
      setData(volunteerData);
    }
  }, [volunteer, isLoading, error]);

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
  const { mutate } = api.volunteer.createOrUpdate.useMutation({
    onSuccess: newVolunteer => {
      console.log(newVolunteer);
      setData(initialData);
      router.push('/v');
    },
  });

  async function submit() {
    mutate(data);
  }

  console.log(isComplete);
  useEffect(() => {
    if (isComplete) {
      submit();
      setIsComplete(false);
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
        isComplete,
        setIsComplete,
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
