import { useState } from 'react';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import EventsTable from '@/components/table/admin/events-table';
import type { Event } from '@/lib/db/types';
import { api } from '@/utils/api';

export default function Index() {
  const { data: events } = api.event.getAll.useQuery();
  console.log(events);
  const [activeIndex, setActiveIndex] = useState(0);

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
          {events && <EventsTable data={events as unknown as Event[]} />}
        </div>
      </div>
    </DashboardLayout>
  );
}
