import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Form } from '@/components/ui/form';
import { useSupporterFormState } from '@/context/supporter-form-context';
import { supporterSchema } from '@/lib/validation/partner-validation-schema';

import FormNavigation from './fields/navigation';
import PartnerFields from './fields/partner-fields';

const SupporterForm = () => {
  const { data, setData, isFirstStep, isLastStep, back, next } =
    useSupporterFormState();
  const form = useForm<z.infer<typeof supporterSchema>>({
    resolver: zodResolver(supporterSchema),
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

  async function onSubmit(values: z.infer<typeof supporterSchema>) {
    await setData({ ...data, ...values });
    if (!isLastStep) return next();
    alert('Successful Account Creation');
  }

  return (
    <div className="w-[500px]">
      <h3 className="mb-5  border-b border-gray-200 pb-1">Info</h3>
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

export default SupporterForm;
