import React from 'react';

import AddressForm from '@/components/form/address-form';
import { usePartnerFormState } from '@/context/partner-form-context';
import type { PartnerType, VolunteerType } from '@/lib/types';

const PartnerAddressForm = () => {
  const { data, setData, isFirstStep, isLastStep, back, next, submit } =
    usePartnerFormState();
  return (
    <AddressForm
      data={data}
      setData={
        setData as React.Dispatch<
          React.SetStateAction<VolunteerType | PartnerType>
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

export default PartnerAddressForm;
