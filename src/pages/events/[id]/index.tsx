import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';

import { FallbackImage } from '@/components/common/fallback-image';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { EventList } from '@/components/list/event-list';
import { getServerAuthSession } from '@/lib/auth';
import { EventType } from '@/lib/db/enums';
import type { Event } from '@/lib/types';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { api } from '@/utils/api';
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Container,
  Flex,
  Grid,
  LoadingOverlay,
  Paper,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconLink,
} from '@tabler/icons-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default function EventViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { id } = props;
  const { data: event, isLoading } = api.event.findById.useQuery({
    id: id as string,
  });
  const { data: relatedEvents, isLoading: isRelatedLoading } =
    api.event.findRelated.useQuery({
      excludeId: event?.id as unknown as string,
      limit: 6,
    });
  const image =
    process.env.NEXT_PUBLIC_AWS_PATH +
    '/' +
    event?.Images.find(i => i.type === 'main')?.path;

  console.log(event);
  // const { mutate } = api.eventUser.sendRequest.useMutation({
  //   onSuccess: newReq => console.log(newReq),
  // });
  // function handleSendRequest() {
  //   mutate({ eventId: data?.id as unknown as string, role: 'mopper' });
  // }
  return (
    <BasicBaseLayout>
      <Space h={'lg'} />
      {!isLoading ? (
        <Container size={'xl'}>
          <Flex justify={'start'} gap={10} mb={10}>
            <ActionIcon
              component={Link}
              href="/p/manage/event"
              radius={'xl'}
              size={'xl'}
              variant="light"
            >
              <IconArrowLeft />
            </ActionIcon>
            <Title order={2} pl={10}>
              {event?.title}
            </Title>
          </Flex>
          <Grid columns={12}>
            <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
              <Flex gap={20}>
                <Text>
                  {format(
                    event?.startTime as unknown as Date,
                    'yyyy MMMM do H:mm:ss'
                  )}
                </Text>
                <Text>
                  {format(
                    event?.endTime as unknown as Date,
                    'yyyy MMMM do H:mm:ss'
                  )}
                </Text>
              </Flex>
              <Stack mt={20}>
                <FallbackImage
                  src={image}
                  width={1000}
                  height={400}
                  fullWidth
                  alt="image"
                  radius={'lg'}
                />
                <Flex justify={'start'} gap={10}>
                  {event?.Categories &&
                    event?.Categories.length > 0 &&
                    event.Categories.map(c => (
                      <Badge color="gray" key={c.id}>
                        {c.name}
                      </Badge>
                    ))}
                </Flex>
              </Stack>
              <Flex justify={'start'}>
                <Title
                  order={3}
                  p={10}
                  style={{
                    borderBottom: '2px solid var(--mantine-color-teal-8)',
                  }}
                >
                  Танилцуулага
                </Title>
              </Flex>
              <Text>{event?.description}</Text>
              <Flex gap={10} mt={20}>
                <ActionIcon radius={'lg'} variant="outline" size={'lg'} p={5}>
                  <IconBrandFacebook />
                </ActionIcon>
                <ActionIcon radius={'lg'} variant="outline" size={'lg'} p={5}>
                  <IconBrandInstagram />
                </ActionIcon>
                <ActionIcon radius={'lg'} variant="outline" size={'lg'} p={5}>
                  <IconBrandTwitter />
                </ActionIcon>
                <ActionIcon radius={'lg'} variant="outline" size={'lg'} p={5}>
                  <IconLink />
                </ActionIcon>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <Stack>
                <Paper withBorder p={5} radius={'lg'}>
                  <Text ta={'center'}>
                    {(event?.type as unknown as EventType) ===
                    EventType.VOLUNTEERING
                      ? 'Voluntering event'
                      : 'Event'}
                  </Text>
                </Paper>
                <Paper withBorder py={15} px={20} radius={'lg'}>
                  <Stack>
                    <Title order={4} ta={'center'}>
                      Organizer
                    </Title>
                    <Flex gap={10} align={'center'} justify={'center'}>
                      <Avatar />
                      <Text ta={'center'} fw={500}>
                        {event?.Owner?.organizationName
                          ? event?.Owner?.organizationName
                          : event?.Owner?.email}
                      </Text>
                    </Flex>
                    <Button fullWidth radius={'xl'}>
                      Participate
                    </Button>
                  </Stack>
                </Paper>
                <Paper withBorder py={15} px={20} radius={'lg'}>
                  <Stack>
                    <Text>Хамтрагч байгуулага</Text>
                    {event?.Collaborators.map(collaborator => (
                      <Flex
                        align={'center'}
                        key={collaborator.id as unknown as string}
                        gap="md"
                      >
                        <Avatar />
                        <Text>
                          {collaborator.User?.organizationName ??
                            collaborator.User?.email}
                        </Text>
                      </Flex>
                    ))}
                  </Stack>
                </Paper>
              </Stack>
            </Grid.Col>
          </Grid>
          <Space h="lg" />
          <EventList
            events={relatedEvents as unknown as Event[]}
            isLoading={isRelatedLoading}
          />
        </Container>
      ) : (
        <LoadingOverlay visible />
      )}
    </BasicBaseLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerAuthSession(context);

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      db: db,
      userId: session?.user.id ? session.user.id : undefined,
      userType: session?.user.userType ? session?.user.userType : undefined,
      role: session?.user.role,
    },
    transformer: superjson, // optional - adds superjson serialization
  });

  const id = context.params?.id;

  if (typeof id !== 'string') throw new Error('no id');

  await helpers.event.findById.prefetch({ id: id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};
