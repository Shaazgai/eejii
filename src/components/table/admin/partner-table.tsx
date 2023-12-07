import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, CheckCheck, XIcon } from 'lucide-react';

import type { User } from '@/lib/db/types';

// import type { User } from '@/lib/types';
import { RequestType } from '@/lib/db/enums';
import { api } from '@/utils/api';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '../../ui/button';
import { IndexTable } from '../table';
import { DataTablePagination } from '../table-pagination';

const PartnerTable = ({
  data,
  page,
  setPage,
  hasNextPage,
  hasPrevPage,
  totalPage,
  count,
}: {
  data: User[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPage: number;
  count: number;
}) => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'email',
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
      accessorKey: 'phoneNumber',
      header: ({ column }) => {
        return (
          <Button
            className="hover:bg-zinc-800 hover:text-gray-200"
            size={'sm'}
            variant={'ghost'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Phone number
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'firstName',
      header: 'First name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last name',
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
    },
    {
      accessorKey: 'birthday',
      header: 'Birthday',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created at',
      cell: ({ row }) => {
        return format(row.getValue('createdAt'), 'PPP, HH:mm');
      },
    },
    {
      accessorKey: 'requestStatus',
      header: 'Request status',
    },
    {
      accessorKey: 'id',
      header: 'Action',
      cell: ({ row }) => {
        const context = api.useContext();
        const { mutate, isLoading } = api.user.changeStatus.useMutation({
          onSuccess: _ => {
            context.partner.findAll.invalidate();
          },
        });

        const requestId = row.getValue('id') as string;
        console.log(requestId);
        return (
          <div className="flex flex-row gap-2">
            <Button
              disabled={isLoading}
              variant={'default'}
              size={'icon'}
              onClick={() =>
                mutate({
                  userId: requestId,
                  status: RequestType.REQUEST_APPROVED,
                })
              }
            >
              <CheckCheck />
            </Button>
            <Button
              disabled={isLoading}
              variant={'destructive'}
              size={'icon'}
              onClick={() =>
                mutate({
                  userId: requestId,
                  status: RequestType.REQUEST_DENIED,
                })
              }
            >
              <XIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  // const searchFields = [
  //   {
  //     name: 'Title',
  //     code: 'projectTitle',
  //   },
  //   {
  //     name: 'Status',
  //     code: 'status',
  //   },
  // ];
  return (
    <div>
      {data ? (
        <div className="space-y-5">
          <IndexTable columns={columns} data={data} searchFields={null} />
          <DataTablePagination
            page={page}
            setPage={setPage}
            totalPage={totalPage}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            count={count}
          />
        </div>
      ) : (
        'loading'
      )}
    </div>
  );
};

export default PartnerTable;
