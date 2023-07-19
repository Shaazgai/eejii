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
import type { eventSchema } from '@/lib/validation/event-schema';

const EventFields = ({
  form,
}: {
  form: FormProps<z.infer<typeof eventSchema>>;
}) => {
  // const [roleNumber, setRoleNumber] = useState<number>(0);
  // function handleAddRole(value: number) {
  // console.log(roleNumber);
  // console.log(Array.from(Array(roleNumber).keys()));
  //   if (value + roleNumber <= 0) {
  //     setRoleNumber(0);
  //   } else {
  //     setRoleNumber(roleNumber + value);
  //   }
  // }
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
      {/* <div className=" space-y-2 border border-gray-200 p-5">
        <h4>Add roles for event</h4> */}
      <FormField
        name="roles"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Add Roles </FormLabel>
            <Input placeholder="Role_1, Role_2, ... etc" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <div className="space-x-5">
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
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default EventFields;
