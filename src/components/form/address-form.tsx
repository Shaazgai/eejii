import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Form } from '@/components/ui/form';
import type {
  MultiStepFormContextType,
  PartnerFormType,
  VolunteerFormType,
} from '@/lib/types';
import { addressFormSchema } from '@/lib/validation/address-validation-schema';

import AddressFields from './fields/address-fields';
import FormNavigation from './fields/navigation';

const AddressForm = ({
  data,
  setData,
  isFirstStep,
  isLastStep,
  back,
  next,
}: Omit<
  MultiStepFormContextType<VolunteerFormType | PartnerFormType>,
  'currentStepIndex' | 'setCurrentStepIndex' | 'goTo'
>) => {
  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      country: data.country || '',
      city: data.city || '',
      provinceName: data.provinceName || '',
      street: data.street || '',
    },
  });
  const [country, setCountry] = useState('Mongolia');
  const [city, setCity] = useState('Ulan Bator');
  function onSubmit(values: z.infer<typeof addressFormSchema>) {
    setData({ ...data, ...values });
    console.log(values);
    if (!isLastStep) return next();
    alert('Successful Account Creation');
  }

  return (
    <div className="w-[500px]">
      <h3 className="mb-5  pb-1 border-b border-gray-200">Address</h3>
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
