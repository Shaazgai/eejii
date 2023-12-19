import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { z } from 'zod';

import GrantFundraisingForm from '@/components/form/grant-fundraising-form';
import PartnerLayout from '@/components/layout/partner-layout';
import handleImageUpload from '@/lib/hooks/upload-image';
import type { GrantFundWithOwner, S3ParamType } from '@/lib/types';
import imageResizer from '@/lib/utils/image-resizer';
import type { fundraisingSchema } from '@/lib/validation/fundraising-schema';
import { api } from '@/utils/api';
import { Container, LoadingOverlay } from '@mantine/core';
import type { FileWithPath } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';

const EditGrantFundraising = () => {
  const router = useRouter();
  const [grantId, setGrantId] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  async function handleSetFiles(images: FileWithPath[]) {
    const resizedFiles = await Promise.all(
      images.map(async file => {
        const resizedFile = await imageResizer(file, 300, 300);
        return resizedFile;
      })
    );
    setFiles(resizedFiles as unknown as File[]);
  }

  useEffect(() => {
    if (router.isReady) {
      setGrantId(router.query.id as string);
    }
  }, [router.isReady]);

  const context = api.useContext();
  const { data, isLoading } = api.grantFundraising.getById.useQuery({
    id: grantId,
  });

  const { mutate: createPresignedUrl } =
    api.grantFundraising.createPresignedUrl.useMutation({
      onSuccess: res => {
        const { url, fields } = res.data as unknown as {
          url: string;
          fields: S3ParamType;
        };
        const file = files.find(f => f.name === res.fileName);
        handleImageUpload(url, fields, file as File);
      },
    });
  const { mutate, isLoading: isPending } =
    api.grantFundraising.update.useMutation({
      onSuccess: newGrantFundraising => {
        if (files.length > 0) {
          files.map(file => {
            createPresignedUrl({
              grantId: newGrantFundraising.id,
              name: file?.name as string,
              type: 'main',
              contentType: file?.type as string,
            });
          });
        }
        context.grantFundraising.getById.invalidate({
          id: newGrantFundraising.id,
        });
        notifications.show({
          title: 'Success',
          message: 'Successfully updated grant fundraising',
        });
        router.push(`/p/manage/grant/${newGrantFundraising.id}`);
      },
    });
  function handleSubmit(values: z.infer<typeof fundraisingSchema>) {
    const formValues = { ...values, id: grantId };
    mutate(formValues);
  }

  return (
    <PartnerLayout>
      <Container fluid p={'xl'}>
        {!isLoading && data ? (
          <GrantFundraisingForm
            data={data as unknown as GrantFundWithOwner | undefined}
            handleSubmit={handleSubmit}
            isLoading={isPending}
            setFiles={setFiles}
            files={files}
            handleSetFiles={handleSetFiles}
          />
        ) : (
          <LoadingOverlay visible />
        )}
      </Container>
    </PartnerLayout>
  );
};

export default EditGrantFundraising;
