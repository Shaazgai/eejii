import {
  ActionIcon,
  Text,
  Flex,
  Avatar,
  Button,
  Grid,
  Paper,
  Stack,
  Title,
  Badge,
  Container,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconLink,
} from '@tabler/icons-react';
import { format } from 'date-fns';
import { FallbackImage } from '../common/fallback-image';
import type { Event } from '@/lib/types';
import { EventType } from '@/lib/db/enums';

export const EventDetail = ({
  event,
  goBack,
}: {
  event: Event;
  goBack: () => void;
}) => {
  const image =
    process.env.NEXT_PUBLIC_AWS_PATH +
    '/' +
    event?.Images.find(i => i.type === 'main')?.path;

  return (
    <>
      {event && (
        <Container size={'xl'} mt={'lg'}>
          <Flex justify={'start'} gap={10} mb={10}>
            <ActionIcon
              onClick={goBack}
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
          <Grid columns={12} gutter={'xl'}>
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
                      <Badge color="gray.5" key={c.id}>
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
                    borderBottom: '2px solid var(--mantine-color-primary-8)',
                  }}
                >
                  Танилцуулага
                </Title>
              </Flex>
              <Text mt={20}>{event?.description}</Text>
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
        </Container>
      )}
    </>
  );
};
