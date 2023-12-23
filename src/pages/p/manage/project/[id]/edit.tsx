import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { z } from 'zod';

import ProjectForm from '@/components/form/project-form';
import PartnerLayout from '@/components/layout/partner-layout';
import handleImageUpload from '@/lib/hooks/upload-image';
import type { Project, S3ParamType } from '@/lib/types';
import imageResizer from '@/lib/utils/image-resizer';
import type { projectSchema } from '@/lib/validation/project-schema';
import { api } from '@/utils/api';
import { Container, LoadingOverlay } from '@mantine/core';
import type { FileWithPath } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';

const EditProject = () => {
  const router = useRouter();
  const [projectId, setFundId] = useState('');
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
  const { data, isLoading } = api.project.getById.useQuery({ id: projectId });

  const { mutate: createPresignedUrl } =
    api.project.createPresignedUrl.useMutation({
      onSuccess: res => {
        const { url, fields } = res?.data as unknown as {
          url: string;
          fields: S3ParamType;
        };
        const file = files.find(f => f.name === res.fileName);
        handleImageUpload(url, fields, file as File);
      },
    });
  const { mutate, isLoading: isPending } = api.project.update.useMutation({
    onSuccess: newProject => {
      if (files.length > 0) {
        files.map(file => {
          createPresignedUrl({
            projectId: newProject.id,
            name: file?.name as string,
            type: 'main',
            contentType: file?.type as string,
          });
        });
      }
      context.project.getById.invalidate({ id: newProject.id });
      notifications.show({
        title: 'Success',
        message: 'Successfully updated fund',
      });
      router.push(`/p/manage/${newProject.id}/invite`);
    },
  });
  function handleSubmit(values: z.infer<typeof projectSchema>) {
    const formValues = { ...values, id: projectId };
    mutate(formValues);
  }

  return (
    <PartnerLayout>
      <Container fluid p={'xl'}>
        {!isLoading && data ? (
          <ProjectForm
            data={data as unknown as Project | undefined}
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

export default EditProject;
