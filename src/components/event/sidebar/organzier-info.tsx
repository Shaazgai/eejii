import type { Event } from '@/lib/types';
import { Avatar, Button, Flex, Paper, Stack, Text, Title } from '@mantine/core';

export const OrganizerInfo = ({ event }: { event: Event }) => {
  return (
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
  );
};
