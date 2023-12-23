/* eslint-disable unused-imports/no-unused-vars */
import { useForm, zodResolver } from '@mantine/form';

import type { z } from 'zod';

import { projectSchema } from '@/lib/validation/project-schema';

import type { Contact, Project } from '@/lib/types';
import { inputStyle } from '@/styles/inputStyle';
import { api } from '@/utils/api';
import {
  ActionIcon,
  Button,
  Flex,
  Image,
  InputLabel,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import type { FileWithPath } from '@mantine/dropzone';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconX } from '@tabler/icons-react';
import { FormStep } from './form-stepper';

const ProjectForm = ({
  data,
  isLoading,
  handleSubmit,
  setFiles,
  files,
  handleSetFiles,
}: {
  data: Project | undefined;
  isLoading: boolean;
  handleSubmit: (values: z.infer<typeof projectSchema>) => void;
  setFiles: (files: File[]) => void;
  files: File[];
  handleSetFiles: (images: FileWithPath[]) => void;
}) => {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: data?.title || '',
      description: data?.description || '',
      startTime: (data?.startTime as unknown as Date) ?? new Date(),
      endTime: (data?.endTime as unknown as Date) ?? new Date(),
      goalAmount: data?.goalAmount || 0,
      currentAmount: data?.currentAmount || 0,
      contact: {
        phone: (data?.contact as Contact)?.phone ?? '',
        email: (data?.contact as Contact)?.email ?? '',
      },
    },
    validate: zodResolver(projectSchema),
  });

  const mainImage = data?.Images?.find(i => i.type === 'main');

  const context = api.useContext();
  const { mutate: deleteImage } = api.project.deleteImage.useMutation({
    onSuccess: () => {
      context.project.getById.invalidate({
        id: data?.id as unknown as string,
      });
    },
  });

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div className="space-y-4">
        <div className="flex gap-4">
          <FormStep step={1} line />
          <Stack w={'100%'}>
            <InputLabel size="xl">Title</InputLabel>
            <Paper withBorder p={20} radius={'xl'} py={30}>
              <TextInput
                {...form.getInputProps('title')}
                placeholder="Title"
                w={'100%'}
                size="lg"
                styles={inputStyle}
              />
            </Paper>
          </Stack>
        </div>
        <div>
          <div className="flex gap-4">
            <FormStep line step={2} />
            <Stack w={'100%'}>
              <InputLabel size="xl">Link</InputLabel>
              <Paper withBorder p={20} radius={'xl'} py={30}>
                <TextInput
                  {...form.getInputProps('link')}
                  placeholder="Link"
                  w={'100%'}
                  size="lg"
                  styles={inputStyle}
                />
              </Paper>
            </Stack>
          </div>
        </div>
        <div className="flex gap-4">
          <FormStep line step={3} />
          <Stack w={'100%'}>
            <InputLabel size="xl">Images</InputLabel>
            <Paper withBorder p={20} radius={'xl'} py={30}>
              {mainImage ? (
                <Paper pos={'relative'}>
                  <Image
                    height={200}
                    width={320}
                    radius={'md'}
                    fit="contain"
                    placeholder="/placeholder.svg"
                    src={
                      process.env.NEXT_PUBLIC_AWS_PATH + '/' + mainImage.path
                    }
                    onLoad={() =>
                      URL.revokeObjectURL(
                        process.env.NEXT_PUBLIC_AWS_PATH + '/' + mainImage.path
                      )
                    }
                    alt="image"
                  />
                  <ActionIcon
                    onClick={() =>
                      deleteImage({ id: mainImage?.id as unknown as string })
                    }
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
                  h={100}
                  onDrop={handleSetFiles}
                >
                  <Text ta="center">Drop images here</Text>
                </Dropzone>
              )}
            </Paper>
          </Stack>
        </div>

        <div className="flex gap-4">
          <FormStep line step={4} />
          <Stack w={'100%'}>
            <InputLabel size="xl">Contact</InputLabel>
            <Paper withBorder p={20} radius={'xl'} py={30}>
              <span>
                Энэхүү үйл ажиллагаан холбогдох хүний талаар мэдээллйиг
                оруулаарай
              </span>
              <Flex gap={20}>
                <TextInput
                  {...form.getInputProps('contact.phone')}
                  placeholder="Phone"
                  w={'100%'}
                  size="lg"
                  styles={inputStyle}
                />
                <TextInput
                  {...form.getInputProps('contact.email')}
                  placeholder="Email"
                  w={'100%'}
                  size="lg"
                  styles={inputStyle}
                />
              </Flex>
            </Paper>
          </Stack>
        </div>
        <div className="flex gap-4">
          <FormStep line step={5} />
          <Stack w={'100%'}>
            <InputLabel size="xl">
              Арга хэмжээ эхлэх болон дуусах хугацаа
            </InputLabel>
            <Paper withBorder p={20} radius={'xl'} py={30}>
              <Flex gap={20}>
                <DateTimePicker
                  defaultValue={
                    data?.startTime !== undefined
                      ? (data?.startTime as unknown as Date)
                      : null
                  }
                  {...form.getInputProps('startTime')}
                  valueFormat="YYYY-M-DD hh:mm:ss"
                  label="Pick date and time"
                  placeholder="Pick start time"
                  w={'100%'}
                />
                <DateTimePicker
                  defaultValue={
                    data?.endTime !== undefined
                      ? (data?.endTime as unknown as Date)
                      : null
                  }
                  {...form.getInputProps('endTime')}
                  valueFormat="YYYY-M-DD hh:mm:ss"
                  label="Pick date and time"
                  placeholder="Pick end time"
                  w={'100%'}
                />
              </Flex>
            </Paper>
          </Stack>
        </div>
        <div className="flex gap-4">
          <FormStep line step={6} />
          <Stack w={'100%'}>
            <InputLabel size="xl">Description</InputLabel>
            <Paper withBorder p={20} radius={'xl'} py={30}>
              <Textarea
                {...form.getInputProps('description')}
                placeholder="Write description"
                w={'100%'}
                size="md"
              />
            </Paper>
          </Stack>
        </div>
        <div className="flex gap-4">
          <FormStep step={7} />
          <Stack w={'100%'}>
            <InputLabel size="xl">Check</InputLabel>
            <Paper withBorder p={20} radius={'xl'} py={30}>
              <Text fz="18" c={'dimmed'}>
                ОРУУЛСАН МЭДЭЭЛЛҮҮДЭЭ ШАЛГААРАЙ. БҮХ ХЭСГИЙГ ЗӨВ БӨГЛӨСӨН
                ТОХИОЛДОЛД ХҮЛЭЭЛГИЙН ГОРИМД ОРЖ НИЙТЛЭГДЭНЭ.
              </Text>
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={!form.isValid}
                >
                  Submit
                </Button>
                <Button>Cancel</Button>
              </div>
            </Paper>
          </Stack>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
