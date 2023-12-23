import { useState } from 'react';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import ProjectsTable from '@/components/table/admin/fundraisings-table';
import type { Project } from '@/lib/types';
import { api } from '@/utils/api';

export default function Index() {
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: projectsData, isLoading } = api.project.getAll.useQuery({
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
            <ProjectsTable
              data={projectsData?.items as unknown as Project[]}
              page={page}
              setPage={setPage}
              totalPage={projectsData?.pagination.totalPages as number}
              totalCount={projectsData?.pagination.totalCount as number}
              hasNextPage={projectsData?.pagination.hasNextPage as boolean}
              hasPrevPage={projectsData?.pagination.hasPrevPage as boolean}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
