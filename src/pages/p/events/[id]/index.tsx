import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';

import PartnerLayout from '@/components/layout/partner-layout';
import { getServerAuthSession } from '@/lib/auth';
import type { Contact } from '@/lib/types';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import classes from '@/styles/CardGradient.module.css';
import { api } from '@/utils/api';
import {
  ActionIcon,
  Badge,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default function EventViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { id } = props;
  const { data, isLoading } = api.event.findById.useQuery({ id: id as string });

  const mainImage =
    process.env.NEXT_PUBLIC_AWS_PATH +
    '/' +
    data?.Images?.find(f => f.type === 'main')?.path;

  return (
    <PartnerLayout>
      {!isLoading && data ? (
        <Container fluid p={'xl'}>
          <Flex justify={'space-between'}>
            <Group>
              <ActionIcon
                component={Link}
                href="/p/manage/event"
                radius={'xl'}
                size={'lg'}
                variant="light"
              >
                <IconArrowLeft />
              </ActionIcon>
              <Title
                order={2}
                className="border-l-[3px] border-primary"
                pl={10}
              >
                {data?.title}
              </Title>
            </Group>
            <Button
              component={Link}
              href={`/p/manage/event/${data.id}/edit`}
              radius={'xl'}
            >
              Edit details
            </Button>
          </Flex>
          <Space h={'lg'} />
          <SimpleGrid cols={{ base: 1, lg: 2 }}>
            <Stack>
              <Paper withBorder radius="lg" style={{ overflow: 'hidden' }}>
                <Image
                  alt="image"
                  src={mainImage}
                  placeholder="/images/placeholder.svg"
                />
                <Flex p={'lg'} gap={10}>
                  {data.Categories &&
                    data.Categories.map((c, i) => (
                      <Badge key={i}>{c.name}</Badge>
                    ))}
                </Flex>
              </Paper>
              <Paper withBorder radius="lg" p={'lg'}>
                <Title order={4}>Description</Title>
                <Divider my={'sm'} />
                {data?.description}
              </Paper>
            </Stack>
            <Stack>
              <Paper withBorder radius="lg" className={classes.cardTopBorder}>
                <Image
                  alt="image"
                  src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
                  radius={12}
                />
                <Space h={'lg'} />
                <Table>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>
                        <Text fw={500} fz="18">
                          Organized by
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text>{data?.Owner?.organizationName}</Text>
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Text fw={500} fz="18">
                          Location
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text>{data?.location}</Text>
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Text fw={500} fz="18">
                          Point of contact
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Stack>
                          <Text>{(data?.contact as Contact)?.email}</Text>
                          <Text>{(data?.contact as Contact)?.phone}</Text>
                        </Stack>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Paper>
              <Paper withBorder radius="lg" p={'lg'}>
                <Title order={4}>Needed shifts</Title>
                <Divider my={'sm'} />
                <Table>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>
                        <Text fz={16} fw={500}>
                          Duration
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        {data?.startTime && data?.endTime ? (
                          <Text>
                            {format(
                              data?.startTime as unknown as Date,
                              'E MMMM-d, yyy'
                            )}
                            {format(
                              data?.endTime as unknown as Date,
                              'E MMMM-d, yyy'
                            )}
                            (UTC+08:00) Asia/Ulaanbaatar
                          </Text>
                        ) : (
                          'NO TIME'
                        )}
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Text fw={500} fz="16">
                          Volunteer needed
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        {/* //TODO total volunteer number */}
                        {/* <Text>{data.}</Text> */}
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Paper>
            </Stack>
          </SimpleGrid>
        </Container>
      ) : (
        <LoadingOverlay visible />
      )}
    </PartnerLayout>
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
