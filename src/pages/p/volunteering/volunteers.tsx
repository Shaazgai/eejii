import PartnerLayout from '@/components/layout/partner-layout';
import { VolunteersTable } from '@/components/partner/volunteering/volunteers-table';
import type { MyVolunteer } from '@/lib/types';
import tabsClasses from '@/styles/Tabs.module.css';
import { api } from '@/utils/api';
import {
  BackgroundImage,
  Button,
  Container,
  Flex,
  Paper,
  Select,
  Space,
  Tabs,
  Text,
  TextInput,
} from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Volunteers() {
  const router = useRouter();
  const session = useSession();

  const { data: volunteers, isLoading } =
    api.eventAssociation.getMyVolunteer.useQuery({
      partnerId: session.data?.user.id as string,
    });
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
              Volunteers
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
          defaultValue="volunteers"
          classNames={{
            list: tabsClasses.list,
            tab: tabsClasses.tab,
          }}
        >
          <Tabs.List>
            <Tabs.Tab
              value="events"
              onClick={() => router.push('/p/volunteering')}
            >
              Events
            </Tabs.Tab>
            <Tabs.Tab value="volunteers">Volunteers</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Space h={'lg'} />
        <Paper shadow="sm" p={10} withBorder>
          <Flex gap={10} w={'100%'} justify={'space-between'}>
            <TextInput
              leftSection={<IconSearch />}
              placeholder="Search"
              w={'100%'}
            />
            <Select
              data={['By event', 'By name']}
              placeholder="Select search type"
            />
            <Select data={['By level', 'By name']} placeholder="Sort" />
          </Flex>
          <VolunteersTable
            volunteers={volunteers as unknown as MyVolunteer[]}
            isLoading={isLoading}
          />
        </Paper>
      </Container>
    </PartnerLayout>
  );
}
