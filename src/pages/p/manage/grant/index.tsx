import PartnerLayout from '@/components/layout/partner-layout';
import { GrantFundraisingListPrivate } from '@/components/partner/grant-fundraising/list';
import { ProjectStatus } from '@/lib/db/enums';
import segmentClasses from '@/styles/SegmentedControl.module.css';
import tabsClasses from '@/styles/Tabs.module.css';
import { api } from '@/utils/api';
import {
  BackgroundImage,
  Button,
  Container,
  Flex,
  SegmentedControl,
  Space,
  Tabs,
  Text,
  TextInput,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ManageProjects() {
  const router = useRouter();
  const { name, status } = router.query;
  const { data: grantFundraisings, isLoading } =
    api.grantFundraising.getMyGrants.useQuery({
      name: name as string,
      status: status as ProjectStatus,
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
              Manage projects
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
          defaultValue="grant_fundraising"
          classNames={{
            list: tabsClasses.list,
            tab: tabsClasses.tab,
          }}
        >
          <Tabs.List>
            <Tabs.Tab
              value="fundraising"
              onClick={() => router.push('/p/manage')}
            >
              Fundraising
            </Tabs.Tab>
            <Tabs.Tab value="grant_fundraising">Grant fundraising</Tabs.Tab>
            <Tabs.Tab
              value="event"
              onClick={() => router.push('/p/manage/event')}
            >
              Event
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Space h={'lg'} />
        <TextInput
          label="Search"
          placeholder="Seach"
          description="Search what you need"
          inputWrapperOrder={['label', 'error', 'input', 'description']}
          variant="unstyled"
          size="lg"
          radius={0}
          styles={{
            input: {
              borderBottom: '1px solid var(--mantine-color-gray-3)',
            },
          }}
          onChange={e => {
            e.preventDefault();
            const value = e.currentTarget.value;
            router.push({
              pathname: router.pathname,
              query: { ...router.query, name: value },
            });
          }}
        />

        <Space h={'lg'} />
        <SegmentedControl
          classNames={{
            control: segmentClasses.segment_control,
          }}
          color="white"
          fw={700}
          data={[
            ProjectStatus.APPROVED,
            ProjectStatus.PENDING,
            ProjectStatus.DONE,
            ProjectStatus.DENIED,
          ]}
          defaultValue={status as string}
          onChange={value => {
            router.push({
              pathname: router.pathname,
              query: { ...router.query, status: value },
            });
          }}
          styles={{
            root: {
              background: 'none',
            },
            label: {
              borderRadius: '50px',
            },
            indicator: {
              backgroundColor: 'var(--mantine-color-blue-4)',
            },
          }}
        />

        <Space h={'lg'} />
        <GrantFundraisingListPrivate
          grantFundraisings={grantFundraisings}
          isLoading={isLoading}
        />
      </Container>
    </PartnerLayout>
  );
}
