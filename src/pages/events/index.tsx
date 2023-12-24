import { FallbackImage } from '@/components/common/fallback-image';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { EventList } from '@/components/list/event-list';
import { EventType, ProjectStatus } from '@/lib/db/enums';
import type { Event } from '@/lib/types';
import { api } from '@/utils/api';
import {
  BackgroundImage,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Pagination,
  Paper,
  Space,
  Tabs,
  TextInput,
  Title,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Index() {
  const router = useRouter();
  const { type, q, page } = router.query;

  const [activePage, setPage] = useState(page ? +page : 1);
  const [search, setSearch] = useState(q);
  const [activeTab, setActiveTab] = useState<string | null>(
    (type as string) ?? EventType.EVENT
  );

  function handleSetPage(value: number) {
    setPage(value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: value },
    });
  }

  function handleActiveTab(value: string | null) {
    router.push(
      {
        query: { ...router.query, type: value },
      },
      undefined,
      { scroll: false }
    );
    setActiveTab(value);
  }

  const {
    data: events,
    isLoading,
    refetch,
  } = api.event.getAll.useQuery({
    page: activePage,
    limit: 10,
    enabled: true,
    status: ProjectStatus.APPROVED,
    type: type as EventType,
    title: q as string,
  });

  useEffect(() => {
    refetch();
  }, [q]);

  const totalPages = events?.pagination.totalPages;
  return (
    <BasicBaseLayout>
      <FallbackImage
        w={'100%'}
        width={1600}
        radius={0}
        height={400}
        src="/images/eventss/main.png"
        alt="main"
      />
      <Container size={'xl'}>
        <Grid gutter={'xl'} columns={12} className="-translate-y-16">
          <Grid.Col span={{ base: 12, md: 7, lg: 8 }}>
            <Paper shadow="md" py={30} px={40} radius={'lg'}>
              <Title mb={10}>Та ямар төсөл дэмжихийг хүсч байна вэ?</Title>
              <Flex justify={'space-between'} gap={10}>
                <TextInput
                  w={'100%'}
                  placeholder="Нэр"
                  required
                  defaultValue={q}
                  onChange={e => {
                    e.preventDefault();
                    setSearch(e.currentTarget.value);
                  }}
                  size="lg"
                  radius={'xl'}
                />
                <Button
                  onClick={() =>
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, q: search },
                    })
                  }
                  radius={'xl'}
                  size="lg"
                  miw={150}
                >
                  Төсөл хайх
                </Button>
              </Flex>
            </Paper>
            <Space h={'xl'} />
            <Title order={3} mb={10}>
              Онцгой төсөл
            </Title>
            <Paper>
              <BackgroundImage
                h={360}
                src="/images/eventss/main.png"
                radius={'lg'}
                style={{ overflow: 'hidden' }}
              >
                <Flex
                  direction={'column'}
                  align={'center'}
                  c={'white'}
                  h={'100%'}
                  justify={'center'}
                  style={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <h2 className="text-lg font-semibold">
                    'Mother event Hospice'
                  </h2>
                  <h1 className="pb-12 text-3xl font-semibold">
                    "Mother" Hospice and Palliative Care Center
                  </h1>
                  <Button className="h-[44px] w-[144px] rounded-none bg-primary">
                    Хандив өгөх
                  </Button>
                </Flex>
              </BackgroundImage>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5, lg: 4 }}>
            <Paper
              withBorder
              // shadow="md"
              radius={'lg'}
              h={{ base: 300, md: 640, lg: 598 }}
            >
              <div>hi</div>
            </Paper>
          </Grid.Col>
        </Grid>
        <Tabs
          className="-translate-y-8"
          value={activeTab}
          onChange={handleActiveTab}
        >
          <Tabs.List>
            <Tabs.Tab value={EventType.EVENT}>Event</Tabs.Tab>
            <Tabs.Tab value={EventType.VOLUNTEERING}>
              Volunteering event
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <EventList events={events?.items as Event[]} isLoading={isLoading} />
        <Space h={'lg'} />
        <Center>
          <Pagination
            radius="xl"
            value={activePage}
            onChange={handleSetPage}
            total={totalPages ?? 1}
          />
        </Center>
      </Container>
    </BasicBaseLayout>
  );
}
