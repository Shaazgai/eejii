/* eslint-disable unused-imports/no-unused-vars */
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import type { z } from 'zod';

import type { Contact, EventRole, EventWithOwner } from '@/lib/types';
import { eventSchema } from '@/lib/validation/event-schema';
import { api } from '@/utils/api';

import { inputStyle } from '@/styles/inputStyle';
import {
  Button,
  Chip,
  Flex,
  Group,
  InputLabel,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import type { FileWithPath } from '@mantine/dropzone';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { FormStep } from './form-stepper';

const EventForm = ({
  data,
  isPending,
  handleSubmit,
  setFiles,
}: {
  data: EventWithOwner | undefined;
  isPending: boolean;
  handleSubmit: (values: z.infer<typeof eventSchema>) => void;
  setFiles: (files: FileWithPath[]) => void;
}) => {
  const { data: categories, isLoading: isCategoryLoading } =
    api.category.getAll.useQuery({ name: null, type: null });

  const eventCategories = data?.Categories.map(c => c.categoryId) ?? [''];
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: data?.title ?? '',
      description: data?.description ?? '',
      location: data?.location ?? '',
      startTime: (data?.startTime as unknown as Date) ?? new Date(),
      endTime: (data?.endTime as unknown as Date) ?? new Date(),
      requiredTime: data?.requiredTime ?? '',
      categories: eventCategories,
      contact: {
        phone: (data?.contact as Contact)?.phone ?? '',
        email: (data?.contact as Contact)?.email ?? '',
      },
      roles: {
        skills: (data?.roles as EventRole)?.skills ?? '',
        duties: (data?.roles as EventRole)?.duties ?? '',
        number: (data?.roles as EventRole)?.number ?? '',
      },
    },
    validate: zodResolver(eventSchema),
  });
  // const [file, setFile] = useState<File | null>(null);

  // async function handleImage(event: FormEvent<HTMLInputElement>) {
  //   const selectedFile = event.currentTarget.files?.[0] as File;
  //   if (selectedFile) {
  //     const resizedFile = await imageResizer(selectedFile, 300, 300);
  //     setFile(resizedFile as unknown as File);
  //   }
  // }

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  function handleSelectCategory(values: string[]) {
    setSelectedCategories(values);
    form.setFieldValue('categories', values);
  }
  // console.log(selectedCategories);
  // console.log(data);

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
                description="DESC here"
                inputWrapperOrder={['label', 'error', 'input', 'description']}
                styles={inputStyle}
              />
            </Paper>
          </Stack>
        </div>
        <div>
          <div className="flex gap-4">
            <FormStep line step={2} />
            <Stack w={'100%'}>
              <InputLabel size="xl">Roles</InputLabel>
              <Paper withBorder p={20} radius={'xl'} py={30}>
                <TextInput
                  {...form.getInputProps('roles.duties')}
                  placeholder="duties"
                  w={'100%'}
                  size="lg"
                  description="DESC here"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  styles={inputStyle}
                />
                <TextInput
                  {...form.getInputProps('roles.skills')}
                  placeholder="Skills"
                  w={'100%'}
                  size="lg"
                  description="DESC here"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
                  styles={inputStyle}
                />
                <TextInput
                  {...form.getInputProps('roles.number')}
                  placeholder="How many volunteers neeeded"
                  w={'100%'}
                  size="lg"
                  description="DESC here"
                  inputWrapperOrder={['label', 'error', 'input', 'description']}
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
              <Dropzone accept={IMAGE_MIME_TYPE} h={100} onDrop={setFiles}>
                <Text ta="center">Drop images here</Text>
              </Dropzone>

              <SimpleGrid
                cols={{ base: 1, sm: 4 }}
                // mt={previews.length > 0 ? 'xl' : 0}
              >
                {/* {previews} */}
              </SimpleGrid>
            </Paper>
          </Stack>
        </div>
        <div className="flex gap-4">
          <FormStep line step={3} />
          <Stack w={'100%'}>
            <InputLabel size="xl">Category</InputLabel>
            <Paper withBorder p={20} radius={'xl'} py={30}>
              {!isCategoryLoading && categories ? (
                <Chip.Group
                  multiple
                  value={selectedCategories}
                  onChange={handleSelectCategory}
                >
                  <Group justify="center" mt="md">
                    {categories.map(c => (
                      <Chip value={c.id} key={c.id}>
                        {c.name}
                      </Chip>
                    ))}
                  </Group>
                </Chip.Group>
              ) : (
                <Flex gap={10}>
                  <Skeleton h={30} w={90} radius="xl" />
                  <Skeleton h={30} w={110} radius={'xl'} />
                  <Skeleton h={30} w={70} radius={'xl'} />
                  <Skeleton h={30} w={90} radius={'xl'} />
                </Flex>
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
          <FormStep line step={6} />
          <Stack w={'100%'}>
            <InputLabel size="xl">Location</InputLabel>
            <Paper withBorder p={20} radius={'xl'} py={30}>
              <Textarea
                {...form.getInputProps('location')}
                placeholder="Write description"
                w={'100%'}
                size="md"
              />
            </Paper>
          </Stack>
        </div>
        <div className="flex gap-4">
          <FormStep line step={6} />
          <Stack w={'100%'}>
            <InputLabel size="xl">Required time</InputLabel>
            <Paper withBorder p={20} radius={'xl'} py={30}>
              <Textarea
                {...form.getInputProps('requiredTime')}
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
                  disabled={!form.isValid}
                  loading={isPending}
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

export default EventForm;
