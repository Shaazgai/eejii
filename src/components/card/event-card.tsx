import type { Event, EventRole } from '@/lib/types';

import {
  Avatar,
  Box,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { FallbackImage } from '../common/fallback-image';

export default function EventCardPublic({ event }: { event: Event }) {
  const image =
    Array.isArray(event.Images) && event.Images.length > 0
      ? process.env.NEXT_PUBLIC_AWS_PATH +
        '/' +
        event.Images.find(i => i.type === 'main')?.path
      : null;
  return (
    <Paper
      shadow="md"
      radius={'lg'}
      style={{ overflow: 'hidden' }}
      component={Link}
      href={`/events/${event.id}`}
    >
      <Box pos={'relative'}>
        <FallbackImage
          src={image as string}
          width={300}
          height={200}
          radius={0}
          alt="event-image"
        />
      </Box>
      <Box p={20}>
        <Stack>
          <Flex>
            <Group>
              <Text c={'dimmed'} fw={500}>
                {format(event?.startTime as unknown as Date, 'yyyy-M-dd H:mm')}
              </Text>
              <Divider size={'md'} orientation="vertical" />
              <Flex align={'center'} gap={5}>
                <IconUser color="var(--mantine-color-teal-filled)" size={20} />
                <Text c={'dimmed'} fw={500}>
                  {(event.roles as EventRole).number}
                </Text>
              </Flex>
            </Group>
          </Flex>
          <Title order={4}>{event.title}</Title>
          <Flex align={'center'} gap={10}>
            <Avatar />
            <Text>{event?.Owner.organizationName ?? event?.Owner.email}</Text>
          </Flex>
        </Stack>
      </Box>
    </Paper>
  );
}
