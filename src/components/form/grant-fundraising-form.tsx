import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { fundraisingSchema } from '@/lib/validation/fundraising-schema';
import { api } from '@/utils/api';

import { Button } from '../ui/button';
import { Form } from '../ui/form';
import FundraisingFields from './fields/fundraising-fields';
import { useRouter } from 'next/router';

const GrantFundraisingForm = ({
  data,
}: {
  data: z.infer<typeof fundraisingSchema>;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof fundraisingSchema>>({
    resolver: zodResolver(fundraisingSchema),
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
      location: data?.location || '',
      startTime: data?.startTime || new Date(),
      endTime: data?.endTime || new Date(),
      contact: {
        phone: data?.contact.phone || '',
        email: data?.contact.email || '',
      },
      goalAmount: data?.goalAmount || 0,
      currentAmount: data?.currentAmount || 0,
    },
  });
  const { mutate } = api.grantFundraising.create.useMutation({
    onSuccess: newGrantFundraising =>
      router.push(`/p/manage/grant/${newGrantFundraising.id}`),
  });
  function onSubmit(values: z.infer<typeof fundraisingSchema>) {
    console.log(values);
    mutate(values);
  }
  console.log(form.formState.isValid);
  return (
    <div className="">
      <h3 className="mb-5 border-b border-gray-200 pb-1">
        Create Grant Fundraising
      </h3>
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

export default GrantFundraisingForm;
