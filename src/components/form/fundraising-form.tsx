import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import type { CategoryType } from '@/lib/types';
import { fundraisingSchema } from '@/lib/validation/fundraising-schema';
import { api } from '@/utils/api';

import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { Input } from '../ui/input';
import FundraisingFields from './fields/fundraising-fields';

const FundraisingForm = ({
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
      primary_phone: data?.primary_phone || '',
      secondary_phone: data?.secondary_phone || '',
      goalAmount: data?.goalAmount || 0,
      currentAmount: data?.currentAmount || 0,
      email_1: data?.email_1 || '',
      email_2: data?.email_2 || '',
      mainCategory: data?.mainCategory || '',
    },
  });
  useEffect(() => {
    form.reset(data);
  }, [data]);

  const { data: categories, isFetching: isCategoryFetching } =
    api.category.getAll.useQuery({
      type: 'event',
    });

  const { mutate } = api.fundraising.createOrUpdate.useMutation({
    onSuccess: newFundraising =>
      router.push(`/p/manage/${newFundraising.id}/invite`),
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
            <Input
              type="hidden"
              value={data?.id as string}
              {...form.register('id')}
            />
            <FundraisingFields
              form={form}
              categories={categories as CategoryType[]}
              isCategoryFetching={isCategoryFetching}
            />
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
