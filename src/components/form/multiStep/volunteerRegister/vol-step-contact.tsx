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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  birthDay: z.string().optional(),
  birthMonth: z.string().optional(),
  birthYear: z.string().optional(),
  firstLetter: z.string().optional(),
  secondLetter: z.string().optional(),
  registerNumber: z.string(),
  gender: z.string(),
  birthDate: z.date().optional(),
  registerCode: z.string(),
});

const mongolianLetters = [
  'А',
  'Б',
  'В',
  'Г',
  'Д',
  'Е',
  'Ё',
  'Ж',
  'З',
  'И',
  'Й',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'Ө',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Ү',
  'Ф',
  'Х',
  'Ц',
  'Ч',
  'Ш',
  'Щ',
  'Ъ',
  'Ы',
  'Ь',
  'Э',
  'Ю',
  'Я',
];

type ValidationSchema = z.infer<typeof formSchema>;

export default function Contact() {
  const { step, contactInfo, setContactInfo, increaseStep } = useStoreVolunteer(
    state => state
  );
  console.log('🚀 ~ file: vol-step-contact.tsx:86 ~ Contact ~ step:', step);
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...contactInfo },
  });
  const {
    control,
    formState: { errors },
  } = form;

  const onSubmitHandler = (values: ValidationSchema) => {
    // Create a date object
    const birthDate = new Date(
      `${values.birthYear}-${values.birthMonth}-${values.birthDay}`
    );

    // Combine firstLetter, secondLetter, registerNumber into one registerCode string
    const registerCode = `${values.firstLetter}${values.secondLetter}${values.registerNumber}`;

    values = { ...values, birthDate, registerCode };
    console.log(
      '🚀 ~ file: vol-step-contact.tsx:108 ~ onSubmitHandler ~ values:',
      values
    );
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
          className="flex flex-col gap-8"
          onSubmit={() => form.handleSubmit(onSubmitHandler)}
        >
          <div className="grid grid-cols-3 gap-4">
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
          </div>

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Хүйс
                  <FormMessage>{errors.gender?.message}</FormMessage>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex justify-between"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Эрэгтэй</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Эмэгтэй</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="secret" />
                      </FormControl>
                      <FormLabel className="font-normal">Нууцлах</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Регистрийн дугаар
            </div>
            <div className="flex items-end gap-4">
              <FormField
                control={control}
                name="firstLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                      <FormMessage>{errors.firstLetter?.message}</FormMessage>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="A" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup className="h-[200px] overflow-y-auto">
                          {mongolianLetters.map((letter, i) => (
                            <SelectItem key={i} value={letter}>
                              {letter}
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
                name="secondLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                      <FormMessage>{errors.secondLetter?.message}</FormMessage>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="A" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup className="h-[200px] overflow-y-auto">
                          {mongolianLetters.map((letter, i) => (
                            <SelectItem key={i} value={letter}>
                              {letter}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {/* {errors.registerNumber?.message} */}
              <FormField
                control={control}
                name="registerNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={cn(
                          'placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue placeholder:font-medium',
                          errors.registerNumber?.message ? 'border-red-700' : ''
                        )}
                        type="number"
                        placeholder="12345678"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </VolRegisterContainer>
  );
}
