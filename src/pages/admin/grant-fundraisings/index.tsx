import { useState } from 'react';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import GrantFundsTable from '@/components/table/admin/grantfunds-table';
import type { GrantFundWithOwner } from '@/lib/types';
import { api } from '@/utils/api';

export default function Index() {
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: grantFundraisingsData, isLoading } =
    api.grantFundraising.getAll.useQuery({
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
            <GrantFundsTable
              data={grantFundraisingsData as unknown as GrantFundWithOwner[]}
              page={page}
              setPage={setPage}
              totalPage={grantFundraisingsData?.pagination.totalPages as number}
              totalCount={
                grantFundraisingsData?.pagination.totalCount as number
              }
              hasNextPage={
                grantFundraisingsData?.pagination.hasNextPage as boolean
              }
              hasPrevPage={
                grantFundraisingsData?.pagination.hasPrevPage as boolean
              }
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
