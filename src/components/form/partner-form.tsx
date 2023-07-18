import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { usePartnerFormState } from 'src/context/partner-form-context';
import type { z } from 'zod';

import { Form } from '@/components/ui/form';
import { partnerFormSchema } from '@/lib/validation/partner-validation-schema';

import FormNavigation from './fields/navigation';
import PartnerFields from './fields/partner-fields';

const PartnerForm = () => {
  const { data, setData, isFirstStep, isLastStep, back, next } =
    usePartnerFormState();
  const form = useForm<z.infer<typeof partnerFormSchema>>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      organization: data.organization || '',
      email: data.email || '',
      primary_phone: data.primary_phone || '',
      secondary_phone: data.secondary_phone || '',
      twitter: data.twitter || '',
      instagram: data.instagram || '',
      facebook: data.facebook || '',
      bio: data.bio || '',
    },
  });

  function onSubmit(values: z.infer<typeof partnerFormSchema>) {
    console.log(values);
    setData({ ...data, ...values });
    if (!isLastStep) return next();
    alert('Successful Account Creation');
  }
  console.log(form.formState.isValid);
  return (
    <div className="w-[500px]">
      <h3 className="mb-5  pb-1 border-b border-gray-200">Info</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <PartnerFields form={form} />
            <FormNavigation
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              formState={form.formState}
              back={back}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PartnerForm;
