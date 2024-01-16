import type { Project } from '@/lib/types';
import { Avatar, Button, Flex, Paper, Stack, Text, Title } from '@mantine/core';

export const OrganizerInfo = ({ project }: { project: Project }) => {
  return (
    <Paper withBorder py={15} px={20} radius={'lg'}>
      <Stack>
        <Title order={4} ta={'center'}>
          Organizer
        </Title>
        <Flex gap={10} align={'center'} justify={'center'}>
          <Avatar />
          <Text ta={'center'} fw={500}>
            {project?.Owner?.organizationName
              ? project?.Owner?.organizationName
              : project?.Owner?.email}
          </Text>
        </Flex>
        <Button fullWidth radius={'xl'}>
          Participate
        </Button>
      </Stack>
    </Paper>
  );
};
