import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import type { SelectSingleEventHandler } from 'react-day-picker';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { eventSchema } from '@/lib/validation/event-schema';

const EventFields = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof eventSchema>>;
}) => {
  const [roleNumber, setRoleNumber] = useState<number>(0);
  function handleAddRole(value: number) {
    console.log(roleNumber);
    console.log(Array.from(Array(roleNumber).keys()));
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
              <FormLabel>Start time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange as SelectSingleEventHandler}
                    disabled={date =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="endTime"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>End Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange as SelectSingleEventHandler}
                    disabled={date =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
