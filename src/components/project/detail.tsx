import { FallbackImage } from '@/components/common/fallback-image';
import { ProjectType } from '@/lib/db/enums';
import type { Project } from '@/lib/types';
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Container,
  Flex,
  Grid,
  Paper,
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

export const ProjectDetail = ({
  project,
  goBack,
}: {
  project: Project | undefined;
  goBack: () => void;
}) => {
  const image =
    process.env.NEXT_PUBLIC_AWS_PATH +
    '/' +
    project?.Images?.find(i => i.type === 'main')?.path;
  return (
    <>
      {project && (
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
              {project?.title}
            </Title>
          </Flex>
          <Grid columns={12}>
            <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
              <Flex gap={20}>
                <Text>
                  {format(
                    project?.startTime as unknown as Date,
                    'yyyy MMMM do H:mm:ss'
                  )}
                </Text>
                <Text>
                  {format(
                    project?.endTime as unknown as Date,
                    'yyyy MMMM do H:mm:ss'
                  )}
                </Text>
              </Flex>
              <Stack mt={20}>
                <FallbackImage
                  src={image}
                  width={1000}
                  height={400}
                  alt="image"
                  radius={'lg'}
                />
                <Flex justify={'start'} gap={10}>
                  {project?.Categories &&
                    project?.Categories?.length > 0 &&
                    project?.Categories?.map(c => (
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
              <Text mt={20}>{project?.description}</Text>
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
                    {(project?.type as unknown as ProjectType) ===
                    ProjectType.FUNDRAISING
                      ? 'Fundraising project'
                      : 'Grant Fundraising'}
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
                <Paper withBorder py={15} px={20} radius={'lg'}>
                  <Stack>
                    <Text>Хамтрагч байгуулага</Text>
                    {project?.Collaborators?.map(collaborator => (
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
