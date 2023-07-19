import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { fundraisingSchema } from '@/lib/validation/fundraising-schema';
import { api } from '@/utils/api';

import { Button } from '../ui/button';
import { Form } from '../ui/form';
import FundraisingFields from './fields/fundraising-fields';

const FundraisingForm = () => {
  const form = useForm<z.infer<typeof fundraisingSchema>>({
    resolver: zodResolver(fundraisingSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      startTime: new Date(),
      endTime: new Date(),
      primary_phone: '',
      secondary_phone: '',
      goalAmount: 0,
      currentAmount: 0,
    },
  });
  const { mutate } = api.fundraising.create.useMutation({
    onSuccess: newFundraising => console.log(newFundraising),
  });
  function onSubmit(values: z.infer<typeof fundraisingSchema>) {
    console.log(values);
    mutate(values);
  }
  console.log(form.formState.isValid);
  return (
    <div className="w-[500px]">
      <h3 className="mb-5 border-b border-gray-200 pb-1">Create Fundraising</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FundraisingFields form={form} />
            <div className="w-full">
              <Button
                type="submit"
                className="float-right"
                disabled={
                  form.formState.isLoading ||
                  form.formState.isSubmitting ||
                  !form.formState.isValid
                }
              >
                {form.formState.isLoading || form.formState.isSubmitting ? (
                  <LoaderIcon />
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FundraisingForm;
