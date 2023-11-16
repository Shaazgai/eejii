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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  country: z.string(),
  homeAddress: z.string(),
});

type ValidationSchema = z.infer<typeof formSchema>;

export default function HomeAddress() {
  const { locationInfo, setLocationInfo, increaseStep } = useStoreVolunteer(
    state => state
  );
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...locationInfo },
  });
  const {
    control,
    formState: { errors },
  } = form;

  const onSubmitHandler = (values: ValidationSchema) => {
    setLocationInfo({ ...locationInfo, ...values });
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
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                  Day
                  <FormMessage>{errors.country?.message}</FormMessage>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup className="h-[200px] overflow-y-auto">
                      {[...Array(31)].map((_, i) => (
                        <SelectItem key={i} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="homeAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                  First name
                  <FormMessage>{errors.homeAddress?.message}</FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      'placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue placeholder:font-medium',
                      {
                        'border-c-primary-strawberry-red':
                          errors.country?.message,
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
