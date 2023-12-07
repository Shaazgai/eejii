import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, CheckCheck, XIcon } from 'lucide-react';
import Link from 'next/link';

import type { User } from '@/lib/db/types';
import type { GrantFundWithOwner } from '@/lib/types';

import { ProjectStatus } from '@/lib/db/enums';
import { api } from '@/utils/api';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '../../ui/button';
import { IndexTable } from '../table';
import { DataTablePagination } from '../table-pagination';

const GrantFundsTable = ({
  data,
  page,
  setPage,
  totalPage,
  totalCount,
  hasNextPage,
  hasPrevPage,
}: {
  data: GrantFundWithOwner[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}) => {
  const columns: ColumnDef<GrantFundWithOwner>[] = [
    {
      accessorKey: 'title',
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
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button
            className="hover:bg-zinc-800 hover:text-gray-200"
            size={'sm'}
            variant={'ghost'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return format(row.getValue('createdAt'), 'PPP, HH:mm');
      },
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'contact',
      header: 'Contact',
    },
    {
      accessorKey: 'Owner',
      header: 'Owner',
      cell: ({ row }) => {
        const owner = row.getValue('Owner') as User;
        return <Link href={'#'}>{owner.email}</Link>;
      },
    },
    {
      accessorKey: 'id',
      header: 'Action',
      cell: ({ row }) => {
        const context = api.useContext();
        const { mutate, isLoading } =
          api.grantFundraising.changeStatus.useMutation({
            onSuccess: _ => {
              context.grantFundraising.getAll.invalidate();
            },
          });

        const requestId = row.getValue('id') as string;
        return (
          <div className="flex flex-row gap-2">
            <Button
              disabled={isLoading}
              variant={'default'}
              size={'icon'}
              onClick={() =>
                mutate({
                  id: requestId,
                  status: ProjectStatus.APPROVED,
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
                  id: requestId,
                  status: ProjectStatus.DENIED,
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
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            count={totalCount}
          />
        </div>
      ) : (
        'loading'
      )}
    </div>
  );
};

export default GrantFundsTable;
