import EventForm from '@/components/form/event-form';
import { EventType } from '@/lib/db/enums';
import handleImageUpload from '@/lib/hooks/upload-image';
import type { S3ParamType } from '@/lib/types';
import imageResizer from '@/lib/utils/image-resizer';
import type { eventSchema } from '@/lib/validation/event-schema';
import { api } from '@/utils/api';
import type { FileWithPath } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { z } from 'zod';

export default function NewVolunteeringEvent() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);

  async function handleSetFiles(images: FileWithPath[]) {
    const resizedFiles = await Promise.all(
      images.map(async file => {
        const resizedFile = await imageResizer(file, 800, 600);
        return resizedFile;
      })
    );
    setFiles(resizedFiles as unknown as File[]);
  }

  const { mutate: createPresignedUrl } =
    api.event.createPresignedUrl.useMutation({
      onSuccess: res => {
        const { url, fields } = res.data as unknown as {
          url: string;
          fields: S3ParamType;
        };
        const file = files.find(f => f.name === res.fileName);
        handleImageUpload(url, fields, file as File);
      },
    });
  const { mutate, isLoading } = api.event.create.useMutation({
    onSuccess: newEvent => {
      if (files.length > 0) {
        files.map(file => {
          createPresignedUrl({
            eventId: newEvent.id,
            type: 'main',
            name: file?.name as string,
            contentType: file?.type as string,
          });
        });
      }

      notifications.show({
        title: 'Success',
        message: 'Successfully created event',
      });
      router.push(`/p/manage/event/${newEvent.id}/invite`);
    },
  });

  function handleSubmit(values: z.infer<typeof eventSchema>) {
    const formValues = { ...values, type: EventType.VOLUNTEERING };
    mutate(formValues);
  }
  return (
    <EventForm
      type={EventType.VOLUNTEERING}
      data={undefined}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      handleSetFiles={handleSetFiles}
      setFiles={setFiles}
      files={files}
    />
  );
}
