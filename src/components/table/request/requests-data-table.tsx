import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';

import type { JoinRequestTableProps } from '@/lib/types';
import { api } from '@/utils/api';

import { Button } from '../../ui/button';
import { IndexTable } from '../table';

const RequestsDataTable = ({
  data,
  type,
}: {
  data: JoinRequestTableProps[];
  type: string;
}) => {
  const utils = api.useContext();
  const { mutate, isLoading } = api.partner.handleRequest.useMutation({
    onSuccess: res => {
      console.log(res);
      utils.partner.getMytProjectsJoinRequestsOrInvitations.invalidate();
    },
  });
  const columns: ColumnDef<JoinRequestTableProps>[] = [
    {
      accessorKey: 'type',
      header: 'Request/Invitation',
    },
    {
      accessorKey: 'userType',
      header: 'User',
    },
    {
      accessorKey: 'projectTitle',
      header: ({ column }) => {
        return (
          <Button
            className="hover:bg-zinc-800 hover:text-gray-200"
            size={'sm'}
            variant={'ghost'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'userEmail',
      header: ({ column }) => {
        return (
          <Button
            className="hover:bg-zinc-800 hover:text-gray-200"
            size={'sm'}
            variant={'ghost'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'userPhoneNumbers',
      header: ({ column }) => {
        return (
          <Button
            className="hover:bg-zinc-800 hover:text-gray-200"
            size={'sm'}
            variant={'ghost'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Phones
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const phoneNumbers = row.getValue('userPhoneNumbers') as {
          primary_phone?: string;
          secondary_phone?: string;
        };

        return (
          <div>
            {phoneNumbers.primary_phone}
            <br />
            {phoneNumbers.secondary_phone}
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created at',
      cell: ({ row }) => {
        return format(row.getValue('createdAt'), 'PPP, HH:mm');
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'requestId',
      header: 'Action',
      cell: ({ row }) => {
        const requestId = row.getValue('requestId') as string;
        console.log(requestId);
        return (
          <div className="flex flex-row gap-2">
            <span>
              <Button
                disabled={isLoading}
                onClick={() =>
                  mutate({
                    id: requestId,
                    projectType: type,
                    status: 'approved',
                  })
                }
              >
                Approve
              </Button>
              <Button
                disabled={isLoading}
                onClick={() =>
                  mutate({
                    id: requestId,
                    projectType: type,
                    status: 'denied',
                  })
                }
              >
                Deny
              </Button>
            </span>
          </div>
        );
      },
    },
  ];

  const searchFields = [
    {
      name: 'Title',
      code: 'projectTitle',
    },
    {
      name: 'Status',
      code: 'status',
    },
  ];
  return (
    <div>
      {data ? (
        <IndexTable columns={columns} data={data} searchFields={searchFields} />
      ) : (
        'loading'
      )}
    </div>
  );
};

export default RequestsDataTable;
