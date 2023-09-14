import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import EventFields from '@/components/form/fields/event-fields';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { eventSchema } from '@/lib/validation/event-schema';
import { api } from '@/utils/api';

import { Input } from '../ui/input';

const EventForm = ({
  data,
}: {
  data: z.infer<typeof eventSchema> | undefined;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
      location: data?.location || '',
      startTime: data?.startTime || new Date(),
      endTime: data?.endTime || new Date(),
      requiredTime: data?.requiredTime || '',
      contact: {
        phone: data?.contact.phone || '',
        email: data?.contact.email || '',
      },
      roles: data?.roles || [],
    },
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const { mutate } = api.event.create.useMutation({
    onSuccess: newEvent => {
      console.log(newEvent);
      router.push(`/p/manage/event/${newEvent.id}/invite`);
    },
  });

  function onSubmit(values: z.infer<typeof eventSchema>) {
    console.log(values);
    mutate(values);
  }
  return (
    <div className="">
      <h3 className="mb-5 border-b border-gray-200 pb-1">Create event</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            type="hidden"
            value={data?.id as string}
            {...form.register('id')}
          />
          <div className="space-y-4">
            <EventFields form={form} />
            <div className="w-full">
              <Button
                type="submit"
                className="float-right"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
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

export default EventForm;
