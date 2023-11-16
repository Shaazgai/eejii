'use client';

import React from 'react';
import * as z from 'zod';

import { SectionTitle } from '@/components/common/section-title';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import VolRegisterContainer from './vol-register-container';
import useStoreVolunteer from '@/lib/store/useStoreVolunteer';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  bio: z.string(),
});

type ValidationSchema = z.infer<typeof formSchema>;

export default function Bio() {
  const { bioInfo, setBioInfo, increaseStep } = useStoreVolunteer(
    state => state
  );
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...bioInfo },
  });
  const {
    control,
    formState: { errors },
  } = form;

  const onSubmitHandler = (values: ValidationSchema) => {
    setBioInfo({ ...bioInfo, ...values });
    increaseStep(1);
  };

  return (
    <VolRegisterContainer onNext={form.handleSubmit(onSubmitHandler)}>
      <SectionTitle
        title="Personal info"
        description="Please provide your name, email address, and phone number."
      />
      <Form {...form}>
        <form
          className="flex flex-col gap-8"
          onSubmit={() => form.handleSubmit(onSubmitHandler)}
        >
          <FormField
            control={control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                  bio
                  <FormMessage>{errors.bio?.message}</FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      'placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue placeholder:font-medium',
                      {
                        'border-c-primary-strawberry-red': errors.bio?.message,
                      }
                    )}
                    placeholder="e.g. Stephen"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </VolRegisterContainer>
  );
}
