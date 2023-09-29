import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';
import DatePicker from 'react-datepicker';
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
import type { fundraisingSchema } from '@/lib/validation/fundraising-schema';

const FundraisingFields = ({
  form,
}: {
  form: FormProps<z.infer<typeof fundraisingSchema>>;
}) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <div className="space-y-2">
            <FormLabel className="text-2xl">Title</FormLabel>
            <FormItem className="w-full rounded-2xl border bg-white px-4 py-8">
              <Input
                placeholder="Organization name"
                className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                {...field}
              />
              <FormMessage />
            </FormItem>
          </div>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <div className="space-y-2">
            <FormLabel className="text-2xl">Description</FormLabel>
            <FormItem className="rounded-2xl border bg-white px-4 py-8">
              <FormControl>
                <Textarea
                  placeholder="Tell us about event"
                  className="resize-none "
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </div>
        )}
      />
      {/* <FormField */}
      {/*   control={form.control} */}
      {/*   name="mainCategory" */}
      {/*   render={({ field }) => ( */}
      {/*     <FormItem className="w-full"> */}
      {/*       <FormLabel>Category</FormLabel> */}
      {/*       <Select */}
      {/*         onValueChange={value => { */}
      {/*           field.onChange(value); */}
      {/*         }} */}
      {/*         value={field.value} */}
      {/*         defaultValue={field.value} */}
      {/*       > */}
      {/*         <FormControl> */}
      {/*           <SelectTrigger */}
      {/*             disabled={!isCategoryFetching && categories ? false : true} */}
      {/*           > */}
      {/*             <SelectValue placeholder="Select Category" /> */}
      {/*             {!isCategoryFetching && categories ? ( */}
      {/*               <SelectValue placeholder="Select Category" /> */}
      {/*             ) : ( */}
      {/*               <Loader2 className="animate-spin" /> */}
      {/*             )} */}
      {/*           </SelectTrigger> */}
      {/*         </FormControl> */}
      {/*         <SelectContent className="max-h-[50vh]"> */}
      {/*           {!isCategoryFetching && categories ? ( */}
      {/*             categories.map(category => { */}
      {/*               console.log(isCategoryFetching); */}
      {/*               return ( */}
      {/*                 <SelectItem value={category.id} key={category.id}> */}
      {/*                   {category.name} */}
      {/*                 </SelectItem> */}
      {/*               ); */}
      {/*             }) */}
      {/*           ) : ( */}
      {/*             <span>Loading</span> */}
      {/*           )} */}
      {/*         </SelectContent> */}
      {/*       </Select> */}
      {/*       <FormMessage /> */}
      {/*     </FormItem> */}
      {/*   )} */}
      {/* /> */}
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <div className="space-y-2">
            <FormLabel className="text-2xl">Location</FormLabel>
            <FormItem className="rounded-2xl border bg-white px-4 py-8">
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
          </div>
        )}
      />

      <div className="space-y-2">
        <FormLabel className="text-2xl">Contact</FormLabel>
        <div className="flex flex-row justify-between gap-5 rounded-3xl border bg-white px-4 py-8">
          <FormField
            name="contact.phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone</FormLabel>
                <Input
                  className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                  placeholder="Primary phone"
                  {...field}
                />

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="contact.email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <Input
                  className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                  placeholder="Primary phone"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="space-y-2">
        <FormLabel className="text-2xl">Goal</FormLabel>
        <div className="flex flex-row justify-between gap-5 rounded-3xl border bg-white px-4 py-8">
          <FormField
            name="goalAmount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Goal amount</FormLabel>
                <Input
                  placeholder="Goal amount"
                  {...field}
                  className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
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
                  className="rounded-none border-0 border-b border-b-gray-300 bg-transparent shadow-none focus-visible:border-b-gray-500 focus-visible:ring-0"
                  onChange={event => field.onChange(+event.target.value)}
                  type="number"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="space-y-2">
        <FormLabel className="text-2xl">Project start and end date</FormLabel>
        <div className="flex flex-row justify-between gap-5 rounded-3xl border bg-white px-4 py-8">
          <FormField
            name="startTime"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Start time</FormLabel>
                <DatePicker
                  id="exampleFormControlTextarea2"
                  className="w-full rounded-full border px-3 py-2 text-sm ring-0 focus:outline-none"
                  // locale="mn"
                  placeholderText="Өдөр сонгох"
                  dateFormat="yyyy-MM-dd H:mm "
                  timeInputLabel="Time:"
                  disabledKeyboardNavigation
                  showTimeSelect
                  selected={field.value ? moment(field.value).toDate() : null}
                  onKeyDown={e => {
                    e.preventDefault();
                  }}
                  {...field}
                />
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
                <DatePicker
                  id="exampleFormControlTextarea2"
                  className="w-full rounded-full border px-3 py-2 text-sm ring-0 focus:outline-none"
                  // locale="mn"
                  placeholderText="Өдөр сонгох"
                  dateFormat="yyyy-MM-dd H:mm "
                  timeInputLabel="Time:"
                  disabledKeyboardNavigation
                  showTimeSelect
                  selected={field.value ? moment(field.value).toDate() : null}
                  onKeyDown={e => {
                    e.preventDefault();
                  }}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default FundraisingFields;
