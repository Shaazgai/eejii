import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Form } from '@/components/ui/form';
import type {
  MultiStepFormContextType,
  PartnerFormType,
  VolunteerType,
} from '@/lib/types';
import { addressSchema } from '@/lib/validation/address-validation-schema';

import AddressFields from './fields/address-fields';
import FormNavigation from './fields/navigation';

const AddressForm = ({
  data,
  setData,
  isFirstStep,
  isLastStep,
  back,
  next,
  submit,
}: Omit<
  MultiStepFormContextType<VolunteerType | PartnerFormType>,
  'currentStepIndex' | 'setCurrentStepIndex' | 'goTo'
>) => {
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: data.country || '',
      city: data.city || '',
      provinceName: data.provinceName || '',
      street: data.street || '',
    },
  });
  const [country, setCountry] = useState('Mongolia');
  const [city, setCity] = useState('Ulan Bator');
  async function onSubmit(values: z.infer<typeof addressSchema>) {
    setData({ ...data, ...values });
    if (!isLastStep) return next();
    alert('Successful Account Creation');
    submit();
  }

  return (
    <div className="w-[500px]">
      <h3 className="mb-5  border-b border-gray-200 pb-1">Address</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <AddressFields
              form={form}
              key={1}
              setSelectedCountry={setCountry}
              selectedCountry={country}
              setSelectedCity={setCity}
              selectedCity={city}
            />

            <FormNavigation
              formState={form.formState}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              back={back}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddressForm;
