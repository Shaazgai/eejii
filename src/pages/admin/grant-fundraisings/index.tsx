import { useState } from 'react';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import GrantFundsTable from '@/components/table/admin/grantfunds-table';
import type { GrantFundWithOwner } from '@/lib/types';
import { api } from '@/utils/api';

export default function Index() {
  const { data: grantFundraisings } = api.grantFundraising.getAll.useQuery();
  console.log(grantFundraisings);
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
          {grantFundraisings && (
            <GrantFundsTable
              data={grantFundraisings as unknown as GrantFundWithOwner[]}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
