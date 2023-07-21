import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import PartnerLayout from '@/components/layout/partner-layout';
import { IndexTable } from '@/components/manage-table';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import type { FundaisingType } from '@/lib/types';
import { api } from '@/utils/api';

const columns: ColumnDef<FundaisingType>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-md bg-zinc-800/30">
          Image
        </div>
      );
    },
  },
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
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      );
    },
  },
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
    accessorKey: 'phone',
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-zinc-800 hover:text-gray-200"
          size={'sm'}
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created at",
  // },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight />
          </Button>
        </div>
      );
    },
  },
];

const searchFields = [
  {
    name: 'Email',
    code: 'email',
  },
  {
    name: 'Name',
    code: 'name',
  },
];

export default function ManageProjects() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: fundraising, isLoading: isFundraisingLoading } =
    api.fundraising.getAll.useQuery();
  console.log(
    '🚀 ~ file: index.tsx:15 ~ ManageProjects ~ fundraising:',
    isFundraisingLoading
  );
  const { data: grantFundraising, isLoading: isGrantFundraisingLoading } =
    api.grantFundraising.getAll.useQuery();
  const { data: event, isLoading: isEventLoading } =
    api.event.getAll.useQuery();

  const tabs = [
    {
      title: `Fundraising (${fundraising?.length})`,
      index: 0,
    },
    {
      title: `Grant-fundraising (${grantFundraising?.length})`,
      index: 1,
    },
    {
      title: `Event (${event?.length})`,
      index: 2,
    },
  ];

  return (
    <PartnerLayout>
      <Shell>
        <div className="flex justify-between">
          <h2>manage-projects</h2>
          <Button onClick={() => router.push('manage/new')}>Add</Button>
        </div>
        <NormalTabs
          tabs={tabs}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        {!isFundraisingLoading && fundraising && (
          <IndexTable
            data={fundraising}
            columns={columns}
            searchFields={searchFields}
          />
        )}
      </Shell>
    </PartnerLayout>
  );
}
