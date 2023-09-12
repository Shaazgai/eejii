import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';

import type { User } from '@/lib/db/types';

// import type { User } from '@/lib/types';
import { Button } from '../../ui/button';
import { IndexTable } from '../table';

const PartnerTable = ({ data }: { data: User[] }) => {
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
      // cell: ({ row }) => {
      //   const requestId = row.getValue('requestId') as string;
      //   console.log(requestId);
      //   return (
      //     <div className="flex flex-row gap-2">
      //       <span>
      //         <Button
      //           disabled={isLoading}
      //           onClick={() =>
      //             mutate({
      //               id: requestId,
      //               projectType: type,
      //               status: 'approved',
      //             })
      //           }
      //         >
      //           Approve
      //         </Button>
      //         <Button
      //           disabled={isLoading}
      //           onClick={() =>
      //             mutate({
      //               id: requestId,
      //               projectType: type,
      //               status: 'denied',
      //             })
      //           }
      //         >
      //           Deny
      //         </Button>
      //       </span>
      //     </div>
      //   );
      // },
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
        <IndexTable columns={columns} data={data} searchFields={null} />
      ) : (
        'loading'
      )}
    </div>
  );
};

export default PartnerTable;
