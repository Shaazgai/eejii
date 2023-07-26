import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import type { SelectSingleEventHandler } from 'react-day-picker';
import type { FormProps } from 'react-hook-form';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { CategoryType } from '@/lib/types';
import { cn } from '@/lib/utils';
import type { fundraisingSchema } from '@/lib/validation/fundraising-schema';

const FundraisingFields = ({
  form,
  categories,
  isCategoryFetching,
}: {
  form: FormProps<z.infer<typeof fundraisingSchema>>;
  categories: CategoryType[];
  isCategoryFetching: boolean;
}) => {
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
          name="email_1"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <Input placeholder="Primary phone" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email_2"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <Input placeholder="Secondary phone" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-row justify-between gap-5">
        <FormField
          name="goalAmount"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Goal amount</FormLabel>
              <Input
                placeholder="Goal amount"
                {...field}
                type="number"
                onChange={event => field.onChange(+event.target.value)}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="currentAmount"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Current amount</FormLabel>
              <Input
                placeholder="Current Amount"
                {...field}
                onChange={event => field.onChange(+event.target.value)}
                type="number"
              />
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
    </div>
  );
};

export default FundraisingFields;
