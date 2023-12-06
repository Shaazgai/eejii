import type { FormProps } from 'react-hook-form';
import type { z } from 'zod';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { volunteerSchema } from '@/lib/validation/volunteer-registration-schema';
import { DatePicker } from '@mantine/dates';

const VolunteerBioFields = ({
  form,
}: {
  form: FormProps<z.infer<typeof volunteerSchema>>;
}) => {
  // console.log(form.);
  return (
    <div className="space-y-2">
      <div className="flex gap-5 ">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormDescription>Your birth given name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormDescription>Your last name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-row justify-between gap-5">
        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Phone 1</FormLabel>
              <Input placeholder="Primary phone" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-5">
        <DatePicker />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="flex grow flex-col">
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Please select your gender</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us a little bit about yourself"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>
              You can <span>@mention</span> other users and organizations.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default VolunteerBioFields;
