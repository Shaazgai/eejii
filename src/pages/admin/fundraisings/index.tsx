import { useState } from 'react';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import FundraisingsTable from '@/components/table/admin/fundraisings-table';
import type { FundWithOwner } from '@/lib/types';
import { api } from '@/utils/api';

export default function Index() {
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: fundraisingsData, isLoading } = api.fundraising.getAll.useQuery(
    {
      page: page,
      limit: 10,
    }
  );

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
            <FundraisingsTable
              data={fundraisingsData?.items as unknown as FundWithOwner[]}
              page={page}
              setPage={setPage}
              totalPage={fundraisingsData?.pagination.totalPages as number}
              totalCount={fundraisingsData?.pagination.totalCount as number}
              hasNextPage={fundraisingsData?.pagination.hasNextPage as boolean}
              hasPrevPage={fundraisingsData?.pagination.hasPrevPage as boolean}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
