import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { z } from 'zod';

import FundraisingForm from '@/components/form/fundraising-form';
import PartnerLayout from '@/components/layout/partner-layout';
import handleImageUpload from '@/lib/hooks/upload-image';
import type { S3ParamType } from '@/lib/types';
import type { fundraisingSchema } from '@/lib/validation/fundraising-schema';
import { api } from '@/utils/api';
import { Container, LoadingOverlay } from '@mantine/core';
import type { FileWithPath } from '@mantine/dropzone';

const EditFundraising = () => {
  const router = useRouter();
  const [fundId, setFundId] = useState('');
  const [files, setFiles] = useState<FileWithPath[]>([]);

  useEffect(() => {
    if (router.isReady) {
      setFundId(router.query.id as string);
    }
  }, [router.isReady]);
  const { data, isLoading } = api.fundraising.getById.useQuery({ id: fundId });

  const { mutate: createPresignedUrl } =
    api.fundraising.createPresignedUrl.useMutation();
  const { mutate, isLoading: isPending } = api.fundraising.create.useMutation({
    onSuccess: newFundraising => {
      if (files.length > 0) {
        files.map(file => {
          const res = createPresignedUrl({
            fundId: newFundraising.id,
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
            data={data as z.infer<typeof fundraisingSchema> | undefined}
            handleSubmit={handleSubmit}
            isPending={isPending}
            setFiles={setFiles}
          />
        ) : (
          <LoadingOverlay />
        )}
      </Container>
    </PartnerLayout>
  );
};

export default EditFundraising;
