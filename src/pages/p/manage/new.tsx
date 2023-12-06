import EventForm from '@/components/form/event-form';
import FundraisingForm from '@/components/form/fundraising-form';
import GrantFundraisingForm from '@/components/form/grant-fundraising-form';
import PartnerLayout from '@/components/layout/partner-layout';
import handleImageUpload from '@/lib/hooks/upload-image';
import type { S3ParamType } from '@/lib/types';
import type { eventSchema } from '@/lib/validation/event-schema';
import type { fundraisingSchema } from '@/lib/validation/fundraising-schema';
import tabsClasses from '@/styles/Tabs.module.css';
import { api } from '@/utils/api';
import {
  ActionIcon,
  Container,
  Flex,
  Paper,
  Space,
  Tabs,
  Title,
} from '@mantine/core';
import type { FileWithPath } from '@mantine/dropzone';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { z } from 'zod';

const NewEvent = () => {
  const router = useRouter();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const { mutate: createPresignedUrl } =
    api.event.createPresignedUrl.useMutation();
  const { mutate, isLoading: isPending } = api.event.create.useMutation({
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
    mutate(values);
  }
  return (
    <EventForm
      data={undefined}
      handleSubmit={handleSubmit}
      isPending={isPending}
      setFiles={setFiles}
    />
  );
};

const NewFundraising = () => {
  const router = useRouter();
  const [files, setFiles] = useState<FileWithPath[]>([]);

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
    mutate(values);
  }
  return (
    <FundraisingForm
      data={undefined}
      handleSubmit={handleSubmit}
      setFiles={setFiles}
      isPending={isPending}
    />
  );
};

const NewGrantFundraising = () => {
  const router = useRouter();
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const { mutate: createPresignedUrl } =
    api.grantFundraising.createPresignedUrl.useMutation();
  const { mutate, isLoading: isPending } =
    api.grantFundraising.create.useMutation({
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
    mutate(values);
  }
  return (
    <GrantFundraisingForm
      data={undefined}
      handleSubmit={handleSubmit}
      setFiles={setFiles}
      isPending={isPending}
    />
  );
};
export default function NewProject() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <PartnerLayout>
      <Container fluid p={'xl'}>
        <Tabs
          defaultValue="fundraising"
          classNames={{
            list: tabsClasses.list,
            tab: tabsClasses.tab,
          }}
        >
          <Tabs.List defaultValue={'fundraising'}>
            <Tabs.Tab value="fundraising" onClick={() => setActiveIndex(0)}>
              Fundraising
            </Tabs.Tab>
            <Tabs.Tab
              value="grant_fundraising"
              onClick={() => setActiveIndex(1)}
            >
              Grant fundraising
            </Tabs.Tab>
            <Tabs.Tab value="event" onClick={() => setActiveIndex(2)}>
              Event
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Space h={'lg'} />
        <Paper withBorder p={20} radius={'md'}>
          <Flex justify={'start'} align={'center'} gap={20}>
            <ActionIcon
              component={Link}
              href={'/p/manage'}
              radius={'xl'}
              size={'lg'}
              variant="light"
            >
              <IconArrowLeft />
            </ActionIcon>
            <Title order={2}>
              {activeIndex == 0 && 'Fundraising'}
              {activeIndex == 1 && 'Grant fundraising'}
              {activeIndex == 2 && 'Event'}
            </Title>
          </Flex>
        </Paper>
        <Space h={'lg'} />
        {activeIndex == 0 && <NewFundraising />}
        {activeIndex == 1 && <NewGrantFundraising />}
        {activeIndex == 2 && <NewEvent />}
      </Container>
    </PartnerLayout>
  );
}
