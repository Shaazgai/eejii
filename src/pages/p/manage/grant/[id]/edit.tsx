import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { z } from 'zod';

import GrantFundraisingForm from '@/components/form/grant-fundraising-form';
import PartnerLayout from '@/components/layout/partner-layout';
import handleImageUpload from '@/lib/hooks/upload-image';
import type { S3ParamType } from '@/lib/types';
import type { fundraisingSchema } from '@/lib/validation/fundraising-schema';
import { api } from '@/utils/api';
import { Container, LoadingOverlay } from '@mantine/core';
import type { FileWithPath } from '@mantine/dropzone';

const EditGrantFundraising = () => {
  const router = useRouter();
  const [grantId, setGrantId] = useState('');
  const [files, setFiles] = useState<FileWithPath[]>([]);

  useEffect(() => {
    if (router.isReady) {
      setGrantId(router.query.id as string);
    }
  }, [router.isReady]);
  const { data, isLoading } = api.grantFundraising.getById.useQuery({
    id: grantId,
  });
  console.log(data);

  const { mutate: createPresignedUrl } =
    api.grantFundraising.createPresignedUrl.useMutation();
  const { mutate, isLoading: isPending } =
    api.grantFundraising.update.useMutation({
      onSuccess: newGrantFundraising => {
        if (files.length > 0) {
          files.map(file => {
            const res = createPresignedUrl({
              grantId: newGrantFundraising.id,
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
            data={data as z.infer<typeof fundraisingSchema> | undefined}
            handleSubmit={handleSubmit}
            isPending={isPending}
            setFiles={setFiles}
          />
        ) : (
          <LoadingOverlay visible />
        )}
      </Container>
    </PartnerLayout>
  );
};

export default EditGrantFundraising;
