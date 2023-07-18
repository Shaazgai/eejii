'use client';
import React from 'react';

import SupporterForm from '@/components/form/supporter-form';
import { SupporterFormProvider } from '@/context/supporter-form-context';

import SupporterAddressForm from './supporter-address-form';

const SupporterFormContainer = () => {
  const steps = [<SupporterForm key={0} />, <SupporterAddressForm key={1} />];
  return (
    <section className="flex items-center justify-center p-10">
      <SupporterFormProvider steps={steps} />
    </section>
  );
};

export default SupporterFormContainer;
