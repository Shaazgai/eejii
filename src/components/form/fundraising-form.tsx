import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import handleImageUpload from '@/lib/hooks/upload-image';
import type { S3ParamType } from '@/lib/types';
import imageResizer from '@/lib/utils/image-resizer';
import { fundraisingSchema } from '@/lib/validation/fundraising-schema';
import { api } from '@/utils/api';

import { Icons } from '../icons';
import { Button } from '../ui/button';
import { Form, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import FundraisingFields from './fields/fundraising-fields';

type CreateSignatureData = {
  url: string;
  fields: S3ParamType;
};

const FundraisingForm = ({
  data,
}: {
  data: z.infer<typeof fundraisingSchema> | undefined;
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
      goalAmount: data?.goalAmount || 0,
      currentAmount: data?.currentAmount || 0,
      contact: {
        phone: data?.contact.phone || '',
        email: data?.contact.email || '',
      },
    },
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const { mutate: createPresignedUrl } =
    api.fundraising.createPresignedUrl.useMutation({
      onSuccess: res => {
        const { url, fields } = res as { url: string; fields: S3ParamType };
        handleImageUpload(url, fields, file as File);
      },
    });
  const { mutate } = api.fundraising.create.useMutation({
    onSuccess: newFundraising => {
      createPresignedUrl({
        fundId: newFundraising.id,
        name: file?.name as string,
        contentType: file?.type as string,
      });
      router.push(`/p/manage/${newFundraising.id}/invite`);
    },
  });
  function onSubmit(values: z.infer<typeof fundraisingSchema>) {
    mutate(values);
  }

  async function handleImage(event: FormEvent<HTMLInputElement>) {
    const selectedFile = event.currentTarget.files?.[0] as File;
    if (selectedFile) {
      const resizedFile = await imageResizer(selectedFile, 300, 300);
      console.log(resizedFile);
      setFile(resizedFile as unknown as File);
    }
  }

  return (
    <div className="">
      <h3 className="mb-5 border-b border-gray-200 pb-1">Create Fundraising</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 ">
            <Input
              type="hidden"
              value={data?.id as string}
              {...form.register('id')}
            />
            <FundraisingFields form={form} />
            <div>
              <FormLabel className="text-2xl">Image</FormLabel>
              <FormItem className="rounded-2xl border bg-white px-4 py-8">
                <Input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/webp"
                  onChange={handleImage}
                />
                <FormMessage />
              </FormItem>
            </div>
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
                  <Icons.spinner className="h-4 w-4 animate-spin" />
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
