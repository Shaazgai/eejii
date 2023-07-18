'use client';
import React from 'react';
import { PartnerFormProvider } from 'src/context/partner-form-context';

import PartnerForm from '@/components/form/partner-form';

import PartnerAddressForm from './partner-address-form';

const PartnerFormContainer = () => {
  const steps = [<PartnerForm key={0} />, <PartnerAddressForm key={1} />];
  return (
    <section className="flex justify-center items-center p-10">
      <PartnerFormProvider steps={steps} />
    </section>
  );
};

export default PartnerFormContainer;
