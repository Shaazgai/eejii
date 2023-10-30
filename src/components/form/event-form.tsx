import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import EventFields from '@/components/form/fields/event-fields';
import { Button } from '@/components/ui/button';
import { Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import handleImageUpload from '@/lib/hooks/upload-image';
import type { S3ParamType } from '@/lib/types';
import imageResizer from '@/lib/utils/image-resizer';
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
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const { mutate: createPresignedUrl } =
    api.event.createPresignedUrl.useMutation({
      onSuccess: res => {
        const { url, fields } = res as { url: string; fields: S3ParamType };
        handleImageUpload(url, fields, file as File);
      },
    });

  const { mutate } = api.event.create.useMutation({
    onSuccess: newEvent => {
      createPresignedUrl({
        eventId: newEvent.id,
        name: file?.name as string,
        contentType: file?.type as string,
      });

      router.push(`/p/manage/event/${newEvent.id}/invite`);
    },
  });

  function onSubmit(values: z.infer<typeof eventSchema>) {
    mutate(values);
  }

  async function handleImage(event: FormEvent<HTMLInputElement>) {
    const selectedFile = event.currentTarget.files?.[0] as File;
    if (selectedFile) {
      const resizedFile = await imageResizer(selectedFile, 300, 300);
      setFile(resizedFile as unknown as File);
    }
  }

  return (
    <div className="">
      <h3 className="mb-5 border-b border-gray-200 pb-1">Арга хэмжээ үүсгэх</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <Input
            type="hidden"
            value={data?.id as string}
            {...form.register('id')}
          />
          <div className="space-y-4">
            <EventFields form={form} />
            <div className="flex gap-4">
              <div className="w-[30px]">
                <div className=" h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
                  8
                </div>
                <div className="relative top-3 m-auto h-[115px] w-[1px] border border-brand400"></div>
              </div>
              <div className="h-[153px] w-[968px] space-y-5">
                <FormLabel className="text-2xl">Зураг</FormLabel>
                <FormItem className="rounded-2xl border bg-white px-4 py-8">
                  <Input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    onChange={handleImage}
                  />
                  <FormMessage />
                </FormItem>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-[30px]">
                <div className=" h-[30px] w-[30px] rounded-full border bg-primary text-center text-white">
                  9
                </div>
              </div>
              <div className="h-[221px] w-[968px] space-y-5">
                <FormLabel className="text-2xl">Хянаж үзэх</FormLabel>
                <FormItem className="rounded-2xl border bg-white px-4 py-8">
                  <FormLabel className="w-[818px] text-lg text-brand5">
                    ОРУУЛСАН МЭДЭЭЛЛҮҮДЭЭ ШАЛГААРАЙ. БҮХ ХЭСГИЙГ ЗӨВ БӨГЛӨСӨН
                    ТОХИОЛДОЛД ХҮЛЭЭЛГИЙН ГОРИМД ОРЖ НИЙТЛЭГДЭНЭ.
                  </FormLabel>
                  <div className="flex pt-4">
                    <Button className="">Илгээх</Button>
                    <Button className="ml-4 h-[34px] w-[73px] border border-primary bg-white text-primary hover:bg-transparent">
                      Болих
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              </div>
            </div>
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
