import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Form } from '@/components/ui/form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { testFormSchema } from '@/lib/validation/partner-validation-schema';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { api } from '@/utils/api';
const TestForm = () => {
  // const { data, setData, isFirstStep, isLastStep, back, next } =
  //   usePartnerFormState();
  const form = useForm({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      title: '',
    },
  });
  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.example.create.useMutation({
    onSuccess: () => {
      // setInput('');
      // void ctx.event.getAll.invalidate();
      console.log('finished');
    },
    onError: e => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.log(
        '🚀 ~ file: test-form.tsx:35 ~ TestForm ~ errorMessage:',
        errorMessage
      );
      // if (errorMessage && errorMessage[0]) {
      //   toast.error(errorMessage[0]);
      // } else {
      //   toast.error('Failed to post! Please try again later.');
      // }
    },
  });

  function onSubmit(values: z.infer<typeof testFormSchema>) {
    console.log(values);
    mutate({ title: values.title });
  }
  return (
    <div className="w-[500px]">
      <h3 className="mb-5 border-b border-gray-200 pb-1">Title</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Title</FormLabel>
                    <Input placeholder="Title" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {isPosting ? (
            <div>loading</div>
          ) : (
            <Button type="submit">Create</Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default TestForm;
