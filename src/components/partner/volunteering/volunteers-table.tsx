import type { MyVolunteer } from '@/lib/types';
import {
  Avatar,
  Badge,
  Button,
  Flex,
  List,
  Modal,
  Skeleton,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconEye,
  IconMail,
  IconMapPin,
  IconPhone,
  IconPoint,
} from '@tabler/icons-react';

const VolunteerRow = ({ v }: { v: MyVolunteer }) => {
  const [opened, { open, close }] = useDisclosure(false);
  // TODO skills
  console.log(v);
  return (
    <Table.Tr>
      <Table.Td>
        {v.firstName} {v.lastName}
      </Table.Td>
      <Table.Td>
        <Text
          tt="capitalize"
          c={
            v.EventAssociation.status === 'pending'
              ? 'yellow'
              : v.EventAssociation.status === 'approved'
                ? 'green'
                : v.EventAssociation.status === 'cancelled'
                  ? 'red'
                  : 'gray'
          }
        >
          {v.EventAssociation.status}
        </Text>
      </Table.Td>
      <Table.Td>{v.email}</Table.Td>
      <Table.Td>
        <Button.Group>
          <Button leftSection={<IconEye />} variant="outline" onClick={open}>
            Show
          </Button>
          <Button leftSection={<IconPoint />} variant="outline">
            Certificate
          </Button>
        </Button.Group>
        <Modal.Root opened={opened} onClose={close} size="66%">
          <Modal.Overlay />
          <Modal.Content p={40} radius={'lg'}>
            <Flex gap={40}>
              <Stack>
                <Avatar
                  className="radius"
                  radius={'lg'}
                  size={200}
                  alt=""
                  src={'/images/projectss/main.png'}
                />
                <Text fw={500}>
                  {v.firstName} {v.lastName}
                  Toslmon khiloo
                </Text>
                <List>
                  <List.Item icon={<IconMail />}>{v.email}</List.Item>
                  <List.Item icon={<IconPhone />}>{v.phoneNumber}</List.Item>
                  <List.Item icon={<IconMapPin />}>
                    {v.Address?.city} {v.Address?.provinceName}{' '}
                    {v.Address?.street}
                  </List.Item>
                </List>
              </Stack>
              <Stack justify="space-between">
                <Stack>
                  <Text fw={500}>Bio:</Text>
                  <Text>{v.bio ?? 'No bio'}</Text>
                </Stack>
                <Stack>
                  <Text fw={500}>Skills:</Text>
                  <Flex gap={10}>
                    {v.skills
                      ? v.skills?.map(s => <Badge key={s}>{s}</Badge>)
                      : 'No skills'}
                  </Flex>
                </Stack>
              </Stack>
            </Flex>
            <Flex justify={'end'}>
              <Button radius={'xl'} onClick={close}>
                Close
              </Button>
            </Flex>
          </Modal.Content>
        </Modal.Root>
      </Table.Td>
    </Table.Tr>
  );
};
export const VolunteersTable = ({
  volunteers,
  isLoading,
}: {
  volunteers: MyVolunteer[] | undefined;
  isLoading: boolean;
}) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody mih={100}>
        {!isLoading ? (
          volunteers && volunteers.length ? (
            volunteers.map((v, i) => <VolunteerRow v={v} key={i} />)
          ) : (
            <Table.Tr>
              <Table.Td>'No volunteers'</Table.Td>
            </Table.Tr>
          )
        ) : (
          <Table.Tr>
            <Table.Td>
              <Skeleton h={40} />
            </Table.Td>
            <Table.Td>
              <Skeleton h={40} />
            </Table.Td>
            <Table.Td>
              <Skeleton h={40} />
            </Table.Td>
            <Table.Td>
              <Skeleton h={40} />
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
};
