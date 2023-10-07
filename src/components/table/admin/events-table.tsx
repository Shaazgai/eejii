import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

import type { User } from '@/lib/db/types';
import type { EventWithOwner } from '@/lib/types';

import { Button } from '../../ui/button';
import { IndexTable } from '../table';

const EventsTable = ({ data }: { data: EventWithOwner[] }) => {
  const columns: ColumnDef<EventWithOwner>[] = [
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

export default EventsTable;
