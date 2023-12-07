import type { MyVolunteer } from '@/lib/types';
import { Button, Skeleton, Table, Text } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

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
      <Table.Tbody>
        {!isLoading ? (
          volunteers && volunteers.length ? (
            volunteers.map((v, i) => (
              <Table.Tr key={i}>
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
                  <Button leftSection={<IconEdit />} variant="outline">
                    Edit
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            'No volunteers'
          )
        ) : (
          <Table.Tr>
            <Table.Td>
              <Skeleton h={20} />
            </Table.Td>
            <Table.Td>
              <Skeleton h={20} />
            </Table.Td>
            <Table.Td>
              <Skeleton h={20} />
            </Table.Td>
            <Table.Td>
              <Skeleton h={20} />
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
};
