import React from 'react';

import AddressForm from '@/components/form/address-form';
import { useVolunteerFormState } from '@/context/volunteer-form-context';
import type { PartnerFormType, VolunteerFormType } from '@/lib/types';

const PartnerAddressForm = () => {
  const {
    data,
    setData,
    isFirstStep,
    isLastStep,
    back,
    next,
    setIsComplete,
    isComplete,
  } = useVolunteerFormState();
  return (
    <AddressForm
      data={data}
      setData={
        setData as React.Dispatch<
          React.SetStateAction<VolunteerFormType | PartnerFormType>
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

export default PartnerAddressForm;
