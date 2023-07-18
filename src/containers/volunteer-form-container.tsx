'use client';

import React from 'react';

import VolunteerForm from '@/components/form/volunteer-form';
import { VolunteerFormProvider } from '@/context/volunteer-form-context';

import VolunteerAddressForm from './volunteer-address-form';

const VolunteerFormContainer = () => {
  const steps = [<VolunteerForm key={0} />, <VolunteerAddressForm key={1} />];
  return (
    <section className="flex items-center justify-center p-10">
      <VolunteerFormProvider steps={steps} />
    </section>
  );
};

export default VolunteerFormContainer;
