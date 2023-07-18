import React from 'react';

import AddressForm from '@/components/form/address-form';
import { useSupporterFormState } from '@/context/supporter-form-context';
import type { SupporterType, VolunteerType } from '@/lib/types';

const SupporterAddressForm = () => {
  const { data, setData, isFirstStep, isLastStep, back, next, submit } =
    useSupporterFormState();
  return (
    <AddressForm
      data={data}
      setData={
        setData as React.Dispatch<
          React.SetStateAction<VolunteerType | SupporterType>
        >
      }
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      back={back}
      next={next}
      submit={submit}
    />
  );
};

export default SupporterAddressForm;
