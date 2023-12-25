import { UserStatus } from '@/lib/db/enums';
import type { User } from '@/lib/types';
import { api } from '@/utils/api';

import { ActionIcon, Badge, Code, Table } from '@mantine/core';
import { IconChecks, IconX } from '@tabler/icons-react';
import { format } from 'date-fns';

const Row = ({ user }: { user: User }) => {
  const context = api.useContext();
  const { mutate, isLoading } = api.user.changeStatus.useMutation({
    onSuccess: _ => {
      context.volunteer.findAll.invalidate();
    },
  });
  return (
    <Table.Tr key={user.id as unknown as string}>
      <Table.Td>
        {format(user.createdAt as unknown as Date, 'yyyy-M-dd H:mm:ss')}
      </Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.phoneNumber}</Table.Td>
      <Table.Td>
        {user.firstName} {user.lastName}
      </Table.Td>
      <Table.Td>{user.gender}</Table.Td>
      <Table.Td>
        {format(user.birthDate as unknown as Date, 'yyyy-M-dd H:mm:ss')}
      </Table.Td>
      <Table.Td>
        <Code>{user.registerCode}</Code>
      </Table.Td>
      <Table.Td>
        {user.requestStatus === UserStatus.REQUEST_APPROVED ? (
          <Badge color="blue">Approved</Badge>
        ) : user.requestStatus === UserStatus.REQUEST_PENDING ? (
          <Badge color="orange">Pending</Badge>
        ) : user.requestStatus === UserStatus.REQUEST_DENIED ? (
          <Badge color="red">Denied</Badge>
        ) : (
          <Badge color="gray">No request</Badge>
        )}
      </Table.Td>
      <Table.Td>
        <div className="flex flex-row gap-2">
          {user.requestStatus === UserStatus.REQUEST_PENDING && (
            <ActionIcon
              disabled={isLoading}
              color="blue"
              size={'lg'}
              radius={'xl'}
              onClick={() =>
                mutate({
                  userId: user.id as unknown as string,
                  status: UserStatus.REQUEST_APPROVED,
                })
              }
            >
              <IconChecks />
            </ActionIcon>
          )}
          {user.requestStatus !== UserStatus.REQUEST_DENIED && (
            <ActionIcon
              disabled={isLoading}
              radius={'xl'}
              size={'lg'}
              color="red"
              onClick={() =>
                mutate({
                  userId: user.id as unknown as string,
                  status: UserStatus.REQUEST_APPROVED,
                })
              }
            >
              <IconX />
            </ActionIcon>
          )}
        </div>
      </Table.Td>
    </Table.Tr>
  );
};
export const VolunteerTable = ({ data }: { data: User[] }) => {
  return (
    <Table withTableBorder withColumnBorders highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Created at</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Phone number</Table.Th>
          <Table.Th>Full name</Table.Th>
          <Table.Th>Gender</Table.Th>
          <Table.Th>Birth date</Table.Th>
          <Table.Th>Register code</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map(user => (
          <Row key={user.id as unknown as string} user={user} />
        ))}
      </Table.Tbody>
    </Table>
  );
};
