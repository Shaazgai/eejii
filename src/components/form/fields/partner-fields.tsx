import React from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import type { partnerSchema } from '@/lib/validation/partner-validation-schema';

const PartnerFields = ({
  form,
}: {
  form: FormProps<z.infer<typeof partnerSchema>>;
}) => {
  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="organization"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Organization</FormLabel>
            <Input placeholder="Organization name" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
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
      <FormField
        name="facebook"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Facebook</FormLabel>
            <Input placeholder="Facebook" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="twitter"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Twitter</FormLabel>
            <Input placeholder="Twitter" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="instagram"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Instagram</FormLabel>
            <Input placeholder="Instagram" {...field} />
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

export default PartnerFields;
