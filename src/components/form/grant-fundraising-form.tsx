/* eslint-disable unused-imports/no-unused-vars */
import { useForm, zodResolver } from '@mantine/form';
import type { z } from 'zod';

import { fundraisingSchema } from '@/lib/validation/fundraising-schema';

import { inputStyle } from '@/styles/inputStyle';
import {
  Button,
  Flex,
  InputLabel,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import type { FileWithPath } from '@mantine/dropzone';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { FormStep } from './form-stepper';

const GrantFundraisingForm = ({
  data,
  isPending,
  handleSubmit,
  setFiles,
}: {
  data: z.infer<typeof fundraisingSchema> | undefined;
  isPending: boolean;
  handleSubmit: (values: z.infer<typeof fundraisingSchema>) => void;
  setFiles: (files: FileWithPath[]) => void;
}) => {
  const form = useForm<z.infer<typeof fundraisingSchema>>({
    validateInputOnChange: true,
    initialValues: {
      title: data?.title ?? '',
      description: data?.description ?? '',
      startTime: data?.startTime ?? new Date(),
      endTime: data?.endTime ?? new Date(),
      goalAmount: data?.goalAmount ?? 0,
      currentAmount: data?.currentAmount ?? 0,
      contact: {
        phone: data?.contact.phone ?? '',
        email: data?.contact.email ?? '',
      },
    },
    validate: zodResolver(fundraisingSchema),
  });

  // const [file, setFile] = useState<File | null>(null);
  // async function handleImage(event: FormEvent<HTMLInputElement>) {
  //   const selectedFile = event.currentTarget.files?.[0] as File;
  //   if (selectedFile) {
  //     const resizedFile = await imageResizer(selectedFile, 300, 300);
  //     setFile(resizedFile as unknown as File);
  //   }
  // }

  return (
    <div className="">
      <h3 className="mb-5 border-b border-gray-200 pb-1">
        Хандив олох төсөл үүсгэх
      </h3>
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
                  <Button type="submit" loading={isPending}>
                    Submit
                  </Button>
                  <Button>Cancel</Button>
                </div>
              </Paper>
            </Stack>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GrantFundraisingForm;
