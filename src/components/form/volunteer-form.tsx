'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Form } from '@/components/ui/form';
import { Toaster } from '@/components/ui/toaster';
import { useVolunteerFormState } from '@/context/volunteer-form-context';
import { volunteerFormSchema } from '@/lib/validation/volunteer-registration-schema';

import FormNavigation from './fields/navigation';
import VolunteerBioFields from './fields/volunteer-bio-fields';
const VolunteerForm = () => {
  const { data, setData, isFirstStep, isLastStep, back, next } =
    useVolunteerFormState();
  const form = useForm<z.infer<typeof volunteerFormSchema>>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      first_name: data.firstName || '',
      last_name: data.lastName || '',
      gender: data.gender || '',
      birthday: data.birthday || new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof volunteerFormSchema>) {
    console.log(values);
    setData({ ...data, ...values });
    if (!isLastStep) return next();
    alert('Successful Account Creation');
  }
  return (
    <div className="w-[500px]">
      <h3 className="mb-5  pb-1 border-b border-gray-200">Info</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <VolunteerBioFields form={form} />
            <FormNavigation
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              formState={form.formState}
              back={back}
            />
            <Toaster />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VolunteerForm;
