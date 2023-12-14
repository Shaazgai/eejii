import { useRouter } from 'next/router';

import PartnerLayout from '@/components/layout/partner-layout';
import { EventListPrivateV2 } from '@/components/partner/event/list-v2';
import tabsClasses from '@/styles/Tabs.module.css';
import { api } from '@/utils/api';
import {
  BackgroundImage,
  Button,
  Container,
  Flex,
  Space,
  Tabs,
  Text,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

export default function Volunteers() {
  const router = useRouter();
  const { data: events, isLoading } = api.event.getMyEvents.useQuery({});

  return (
    <PartnerLayout>
      <Container fluid p={'xl'}>
        <BackgroundImage
          src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
          radius="sm"
          h={300}
        >
          <Flex p="md" justify={'space-between'} align={'center'}>
            <Text c="white" fz={'xl'} fw={700}>
              Voluneering
            </Text>
            <Button
              component={Link}
              href={'/p/manage/new'}
              size="lg"
              radius={'xl'}
              c="white"
              fz={'lg'}
              leftSection={<IconPlus />}
            >
              Add project
            </Button>
          </Flex>
        </BackgroundImage>
        <Space h={'md'} />
        <Tabs
          defaultValue="events"
          classNames={{
            list: tabsClasses.list,
            tab: tabsClasses.tab,
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="events">Events</Tabs.Tab>
            <Tabs.Tab
              value="volunteers"
              onClick={() => router.push('/p/volunteering/volunteers')}
            >
              Volunteers
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Space h={'lg'} />
        <EventListPrivateV2 events={events} isLoading={isLoading} />
      </Container>
    </PartnerLayout>
  );
}
