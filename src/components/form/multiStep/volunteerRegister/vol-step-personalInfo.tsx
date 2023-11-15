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
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import VolRegisterContainer from './vol-register-container';
import useStoreVolunteer from '@/lib/store/useStoreVolunteer';

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'Fist name must be at least 2 characters.',
    })
    .max(100),
  lastName: z
    .string()
    .min(2, {
      message: 'Last name must be at least 2 characters.',
    })
    .max(100),
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  phone: z.string().refine(val => /^\d{8}$/.test(val), {
    message: 'Phone is required',
  }),
});

type ValidationSchema = z.infer<typeof formSchema>;

export default function PersonalInfo() {
  const { personalInfo, setPersonalInfo, increaseStep } = useStoreVolunteer(
    state => state
  );
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...personalInfo },
  });
  const {
    control,
    formState: { errors },
  } = form;

  const onSubmitHandler = (values: ValidationSchema) => {
    setPersonalInfo({ ...personalInfo, ...values });
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
          className="flex flex-col gap-6"
          onSubmit={() => form.handleSubmit(onSubmitHandler)}
        >
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                  First name
                  <FormMessage>{errors.firstName?.message}</FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      'placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue placeholder:font-medium',
                      {
                        'border-c-primary-strawberry-red':
                          errors.firstName?.message,
                      }
                    )}
                    placeholder="e.g. Stephen"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                  Last name
                  <FormMessage>{errors.lastName?.message}</FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      'placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue placeholder:font-medium',
                      {
                        'border-c-primary-strawberry-red':
                          errors.lastName?.message,
                      }
                    )}
                    placeholder="e.g. King"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                  Email Address
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      'placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue placeholder:font-medium',
                      {
                        'border-c-primary-strawberry-red':
                          errors.email?.message,
                      }
                    )}
                    placeholder="e.g. stephenking@lorem.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                  Phone Number
                  <FormMessage>{errors.phone?.message}</FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      'placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue placeholder:font-medium',
                      {
                        'border-c-primary-strawberry-red':
                          errors.phone?.message,
                      }
                    )}
                    placeholder="e.g. +1 234 567 890"
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
