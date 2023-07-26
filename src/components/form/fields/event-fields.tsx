import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { type z } from 'zod';

import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/date-picker-custom';
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
import type { CategoryType } from '@/lib/types';
import type { eventSchema } from '@/lib/validation/event-schema';
const EventFields = ({
  form,
  categories,
  isCategoryFetching,
}: {
  form: UseFormReturn<z.infer<typeof eventSchema>>;
  categories: CategoryType[] | undefined;
  isCategoryFetching: boolean;
}) => {
  const [roleNumber, setRoleNumber] = useState<number>(0);

  useEffect(() => {
    if (form.getValues('roles')) {
      setRoleNumber(form.getValues('roles')?.length || 0);
    }
  }, [form.getValues('roles')]);
  function handleAddRole(value: number) {
    if (value + roleNumber <= 0) {
      setRoleNumber(0);
    } else {
      setRoleNumber(roleNumber + value);
    }
  }

  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Title</FormLabel>
            <Input placeholder="Organization name" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about event"
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
      <FormField
        control={form.control}
        name="mainCategory"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Category</FormLabel>
            <Select
              onValueChange={value => {
                field.onChange(value);
              }}
              value={field.value}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger
                  disabled={!isCategoryFetching && categories ? false : true}
                >
                  <SelectValue placeholder="Select Category" />
                  {!isCategoryFetching && categories ? (
                    <SelectValue placeholder="Select Category" />
                  ) : (
                    <Loader2 className="animate-spin" />
                  )}
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[50vh]">
                {!isCategoryFetching && categories ? (
                  categories.map(category => {
                    console.log(isCategoryFetching);
                    return (
                      <SelectItem value={category.id} key={category.id}>
                        {category.name}
                      </SelectItem>
                    );
                  })
                ) : (
                  <span>Loading</span>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Where will event be hold"
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

      <div className="flex flex-row justify-between gap-5">
        <FormField
          name="primary_phone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Phone 1</FormLabel>
              <Input placeholder="Primary phone" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="secondary_phone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Phone 2</FormLabel>
              <Input placeholder="Secondary phone" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-row justify-between gap-5">
        <FormField
          name="startTime"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Start date</FormLabel>
              <DatePicker field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-row justify-between gap-5">
        <FormField
          name="endTime"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>End date</FormLabel>
              <DatePicker field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="requiredTime"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Required time</FormLabel>
            <Input placeholder="Required time" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <div className=" space-y-2 border border-gray-200 p-5">
        <h4>Add roles for event</h4>
        {Array.from(Array(roleNumber).keys()).map((number, i) => (
          <FormItem className="w-full" key={i}>
            <Input placeholder="Role " {...form.register(`roles.${number}`)} />
            <FormMessage />
          </FormItem>
        ))}
        <div className="space-x-5">
          <Button
            type="button"
            variant={'destructive'}
            onClick={() => {
              handleAddRole(-1);
            }}
          >
            Delete role
          </Button>
          <Button
            type="button"
            variant={'outline'}
            onClick={() => {
              handleAddRole(1);
            }}
          >
            Add role
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventFields;
