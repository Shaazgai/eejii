import React from 'react';

import AddressForm from '@/components/form/address-form';
import { useSupporterFormState } from '@/context/supporter-form-context';
import type { SupporterFormType, VolunteerFormType } from '@/lib/types';

const SupporterAddressForm = () => {
  const {
    data,
    setData,
    isFirstStep,
    isLastStep,
    back,
    next,
    isComplete,
    setIsComplete,
  } = useSupporterFormState();
  return (
    <AddressForm
      data={data}
      setData={
        setData as React.Dispatch<
          React.SetStateAction<VolunteerFormType | SupporterFormType>
        >
      }
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      back={back}
      next={next}
      setIsComplete={setIsComplete}
      isComplete={isComplete}
    />
  );
};

export default SupporterAddressForm;
