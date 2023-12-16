import handleImageUpload from '@/lib/hooks/upload-image';
import type { S3ParamType, User } from '@/lib/types';
import { inputStyle } from '@/styles/inputStyle';
import { notifications } from '@mantine/notifications';

import imageResizer from '@/lib/utils/image-resizer';
import { api } from '@/utils/api';
import {
  ActionIcon,
  Button,
  Flex,
  Image,
  Paper,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import type { FileWithPath } from '@mantine/dropzone';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';

export const BioForm = ({ user }: { user: User }) => {
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm({
    initialValues: {
      address: user.addressShort ?? '',
      organization: user.organization ?? '',
      bio: user.bio ?? '',
    },
  });

  const profileImage = user?.Image.find(i => i.type === 'profile');

  async function handleSetFiles(images: FileWithPath[]) {
    const resizedFiles = await Promise.all(
      images.map(async file => {
        const resizedFile = await imageResizer(file);
        return resizedFile;
      })
    );
    setFiles(resizedFiles as unknown as File[]);
  }

  const context = api.useContext();
  const { mutate: createPresignedUrl } =
    api.partner.createPresignedUrl.useMutation({
      onSuccess: async res => {
        const { url, fields } = res?.data as unknown as {
          url: string;
          fields: S3ParamType;
        };
        const file = files.find(f => f.name === res.fileName);
        handleImageUpload(url, fields, file as File);
      },
    });
  const { mutate, isLoading } = api.partner.updateBio.useMutation({
    onSuccess: async resUser => {
      if (files.length > 0) {
        files.map(file => {
          createPresignedUrl({
            userId: resUser.id,
            name: file?.name as string,
            type: 'profile',
            contentType: file?.type as string,
          });
        });
      }
      context.user.getMe.invalidate();
      notifications.show({
        title: 'Success',
        message: 'Successfully updated bio',
      });
    },
  });

  function handleSubmit(values: typeof form.values) {
    mutate({
      bio: values.bio,
      address: values.address,
      organization: values.organization,
    });
  }

  return (
    <Paper withBorder p={40} radius={'lg'}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex justify={'space-between'} gap={40}>
          <Stack w={'100%'}>
            <Title order={3}>Bio</Title>
            <TextInput
              {...form.getInputProps('organization')}
              placeholder="Name"
              description="Your name here"
              inputWrapperOrder={['label', 'error', 'input', 'description']}
              styles={inputStyle}
            />
            <TextInput
              {...form.getInputProps('bio')}
              placeholder="Bio"
              description="here"
              inputWrapperOrder={['label', 'error', 'input', 'description']}
              styles={inputStyle}
            />
            <TextInput
              {...form.getInputProps('address')}
              placeholder="Address"
              description="DESC here"
              inputWrapperOrder={['label', 'error', 'input', 'description']}
              styles={inputStyle}
            />
          </Stack>
          <Stack>
            <div>
              <Text>Picture</Text>
              <Text c={'dimmed'} fz={12}>
                Upload profile pic
              </Text>
            </div>
            {profileImage ? (
              <Paper pos={'relative'}>
                <Image
                  height={200}
                  width={320}
                  radius={'md'}
                  fit="contain"
                  placeholder="/placeholder.svg"
                  src={
                    process.env.NEXT_PUBLIC_AWS_PATH + '/' + profileImage.path
                  }
                  onLoad={() =>
                    URL.revokeObjectURL(
                      process.env.NEXT_PUBLIC_AWS_PATH + '/' + profileImage.path
                    )
                  }
                  alt="image"
                />
                <ActionIcon
                  // onClick={}
                  pos={'absolute'}
                  top={0}
                  color="red"
                  right={0}
                >
                  <IconX />
                </ActionIcon>
              </Paper>
            ) : files.length > 0 ? (
              <Paper>
                {files.map((file, i) => {
                  const imageUrl = URL.createObjectURL(file);
                  return (
                    <Paper key={i} pos={'relative'}>
                      <Image
                        height={200}
                        width={320}
                        radius={'md'}
                        fit="contain"
                        src={imageUrl}
                        onLoad={() => URL.revokeObjectURL(imageUrl)}
                        alt="image"
                      />
                      <ActionIcon
                        onClick={() => setFiles([])}
                        pos={'absolute'}
                        top={0}
                        color="red"
                        right={0}
                      >
                        <IconX />
                      </ActionIcon>
                    </Paper>
                  );
                })}
              </Paper>
            ) : (
              <Dropzone
                accept={IMAGE_MIME_TYPE}
                maxFiles={1}
                maxSize={1024 ** 2}
                h={200}
                w={320}
                onDrop={handleSetFiles}
              >
                <Text ta="center">Drop images here</Text>
              </Dropzone>
            )}
          </Stack>
        </Flex>
        <Space h={'lg'} />
        <Flex justify={'end'}>
          <Button
            radius={'xl'}
            type="submit"
            disabled={isLoading || !form.isValid}
          >
            Submit
          </Button>
        </Flex>
      </form>
    </Paper>
  );
};
