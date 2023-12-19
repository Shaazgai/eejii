import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { z } from 'zod';

import FundraisingForm from '@/components/form/fundraising-form';
import PartnerLayout from '@/components/layout/partner-layout';
import handleImageUpload from '@/lib/hooks/upload-image';
import type { FundWithOwner, S3ParamType } from '@/lib/types';
import imageResizer from '@/lib/utils/image-resizer';
import type { fundraisingSchema } from '@/lib/validation/fundraising-schema';
import { api } from '@/utils/api';
import { Container, LoadingOverlay } from '@mantine/core';
import type { FileWithPath } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';

const EditFundraising = () => {
  const router = useRouter();
  const [fundId, setFundId] = useState('');
  const [files, setFiles] = useState<FileWithPath[]>([]);

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
      setFundId(router.query.id as string);
    }
  }, [router.isReady]);

  const context = api.useContext();
  const { data, isLoading } = api.fundraising.getById.useQuery({ id: fundId });

  const { mutate: createPresignedUrl } =
    api.fundraising.createPresignedUrl.useMutation({
      onSuccess: res => {
        const { url, fields } = res?.data as unknown as {
          url: string;
          fields: S3ParamType;
        };
        const file = files.find(f => f.name === res.fileName);
        handleImageUpload(url, fields, file as File);
      },
    });
  const { mutate, isLoading: isPending } = api.fundraising.update.useMutation({
    onSuccess: newFundraising => {
      if (files.length > 0) {
        files.map(file => {
          createPresignedUrl({
            fundId: newFundraising.id,
            name: file?.name as string,
            type: 'main',
            contentType: file?.type as string,
          });
        });
      }
      context.fundraising.getById.invalidate({ id: newFundraising.id });
      notifications.show({
        title: 'Success',
        message: 'Successfully updated fund',
      });
      router.push(`/p/manage/${newFundraising.id}/invite`);
    },
  });
  function handleSubmit(values: z.infer<typeof fundraisingSchema>) {
    const formValues = { ...values, id: fundId };
    mutate(formValues);
  }

  return (
    <PartnerLayout>
      <Container fluid p={'xl'}>
        {!isLoading && data ? (
          <FundraisingForm
            data={data as unknown as FundWithOwner | undefined}
            handleSubmit={handleSubmit}
            isLoading={isPending}
            setFiles={setFiles}
            files={files}
            handleSetFiles={handleSetFiles}
          />
        ) : (
          <LoadingOverlay />
        )}
      </Container>
    </PartnerLayout>
  );
};

export default EditFundraising;
