import { useState } from 'react';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import FundraisingsTable from '@/components/table/admin/fundraisings-table';
import type { FundWithOwner } from '@/lib/types';
import { api } from '@/utils/api';

export default function Index() {
  const { data: fundraisings } = api.fundraising.getAll.useQuery();
  console.log(fundraisings);
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
          {fundraisings && (
            <FundraisingsTable
              data={fundraisings as unknown as FundWithOwner[]}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
