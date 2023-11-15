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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  birthDay: z.number().min(1).max(31),
  birthMonth: z.number().min(1).max(12),
  birthYear: z.number().min(1900).max(new Date().getFullYear()),
});

type ValidationSchema = z.infer<typeof formSchema>;

export default function Contact() {
  const { contactInfo, setContactInfo, increaseStep } = useStoreVolunteer(
    state => state
  );
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    // defaultValues: { ...contactInfo },
  });
  const {
    control,
    formState: { errors },
  } = form;

  const onSubmitHandler = (values: ValidationSchema) => {
    setContactInfo({ ...contactInfo, ...values });
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
            name="birthDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                  Day
                  <FormMessage>{errors.birthDay?.message}</FormMessage>
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
            name="birthMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                  Month
                  <FormMessage>{errors.birthMonth?.message}</FormMessage>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup className="h-[200px] overflow-y-auto">
                      {[...Array(12)].map((_, i) => (
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
            name="birthYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                  Year
                  <FormMessage>{errors.birthYear?.message}</FormMessage>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup className="h-[200px] overflow-y-auto">
                      {[...Array(2013 - 1960 + 1)].map((_, i) => (
                        <SelectItem key={i} value={(i - 2013).toString()}>
                          {2013 - i}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </VolRegisterContainer>
  );
}
