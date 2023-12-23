import { useState } from 'react';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import EventsTable from '@/components/table/admin/events-table';
import type { Event } from '@/lib/types';
import { api } from '@/utils/api';

export default function Index() {
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: eventsData, isLoading } = api.event.getAll.useQuery({
    page: page,
    limit: 10,
  });

  const tabs = [
    {
      title: 'Pending',
      index: 0,
    },
    {
      title: 'Approved',
      index: 1,
    },
    {
      title: 'Cancelled',
      index: 2,
    },
    {
      title: 'Done',
      index: 3,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <NormalTabs
            tabs={tabs}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
          />
        </div>
        <div>
          {!isLoading && (
            <EventsTable
              data={eventsData?.items as unknown as Event[]}
              page={page}
              setPage={setPage}
              totalPage={eventsData?.pagination.totalPages as number}
              totalCount={eventsData?.pagination.totalCount as number}
              hasNextPage={eventsData?.pagination.hasNextPage as boolean}
              hasPrevPage={eventsData?.pagination.hasPrevPage as boolean}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
