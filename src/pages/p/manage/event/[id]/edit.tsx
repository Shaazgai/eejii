import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import EventForm from '@/components/form/event-form';
import PartnerLayout from '@/components/layout/partner-layout';
import handleImageUpload from '@/lib/hooks/upload-image';
import type { S3ParamType } from '@/lib/types';
import type { eventSchema } from '@/lib/validation/event-schema';
import { api } from '@/utils/api';
import { Container, LoadingOverlay } from '@mantine/core';
import type { FileWithPath } from '@mantine/dropzone';
import type { z } from 'zod';

const EditEvent = () => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [eventId, setEventId] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      setEventId(router.query.id as string);
    }
  }, [router.isReady]);

  const { data, isLoading } = api.event.getById.useQuery({
    id: eventId,
  });

  const { mutate: createPresignedUrl } =
    api.event.createPresignedUrl.useMutation();
  const { mutate, isLoading: isPending } = api.event.update.useMutation({
    onSuccess: newEvent => {
      if (files.length > 0) {
        files.map(file => {
          const res = createPresignedUrl({
            eventId: newEvent.id,
            name: file?.name as string,
            contentType: file?.type as string,
          });
          const { url, fields } = res as unknown as {
            url: string;
            fields: S3ParamType;
          };
          handleImageUpload(url, fields, file as File);
        });
      }

      router.push(`/p/manage/event/${newEvent.id}/invite`);
    },
  });

  function handleSubmit(values: z.infer<typeof eventSchema>) {
    const formValues = { ...values, id: eventId };
    mutate(formValues);
  }

  return (
    <PartnerLayout>
      <Container fluid p={'xl'}>
        {!isLoading && data ? (
          <EventForm
            data={data}
            isPending={isPending}
            handleSubmit={handleSubmit}
            setFiles={setFiles}
          />
        ) : (
          <LoadingOverlay visible />
        )}
      </Container>
    </PartnerLayout>
  );
};

export default EditEvent;
