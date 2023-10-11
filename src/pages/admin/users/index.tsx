import { useState } from 'react';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import PartnerTable from '@/components/table/admin/partner-table';
import SupporterTable from '@/components/table/admin/supporter-table';
import VolunteerTable from '@/components/table/admin/volunteer-table';
import type { User } from '@/lib/db/types';
import { api } from '@/utils/api';

export const Partners = () => {
  const [page, setPage] = useState(1);
  const {
    data: partnersData,
    isLoading: isPartnerLoading,
    isFetching: isPartnerFetching,
  } = api.partner.findAll.useQuery({
    page: page,
    limit: 10,
  });
  return (
    <div>
      {!isPartnerLoading && !isPartnerFetching ? (
        <PartnerTable
          data={partnersData?.items as unknown as User[]}
          page={page}
          setPage={setPage}
          totalPage={partnersData?.pagination.totalPages as number}
          hasNextPage={partnersData?.pagination.hasNextPage as boolean}
          hasPrevPage={partnersData?.pagination.hasPrevPage as boolean}
          count={partnersData?.pagination.totalCount as number}
        />
      ) : (
        'Loading'
      )}
    </div>
  );
};

export const Supporters = () => {
  const [page, setPage] = useState(1);
  const {
    data: supportersData,
    isLoading: isSupporterLoading,
    isFetching: isSupporterFetching,
  } = api.supporter.findAll.useQuery({
    page: page,
    limit: 10,
  });

  return (
    <div>
      {!isSupporterLoading && !isSupporterFetching ? (
        <SupporterTable
          data={supportersData?.items as unknown as User[]}
          page={page}
          setPage={setPage}
          totalPage={supportersData?.pagination.totalPages as number}
          hasNextPage={supportersData?.pagination.hasNextPage as boolean}
          hasPrevPage={supportersData?.pagination.hasPrevPage as boolean}
          count={supportersData?.pagination.totalCount as number}
        />
      ) : (
        'Loading'
      )}
    </div>
  );
};
export const Volunteers = () => {
  const [page, setPage] = useState(1);
  const {
    data: volunteersData,
    isLoading: isVolunteerLoading,
    isFetching: isVolunteerFetching,
  } = api.volunteer.findAll.useQuery({
    page: page,
    limit: 10,
  });
  return (
    <div>
      {!isVolunteerLoading && !isVolunteerFetching ? (
        <VolunteerTable
          data={volunteersData?.items as unknown as User[]}
          page={page}
          setPage={setPage}
          totalPage={volunteersData?.pagination.totalPages as number}
          hasNextPage={volunteersData?.pagination.hasNextPage as boolean}
          hasPrevPage={volunteersData?.pagination.hasPrevPage as boolean}
          count={volunteersData?.pagination.totalCount as number}
        />
      ) : (
        'Loading'
      )}
    </div>
  );
};

export default function Index() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    {
      title: 'Volunteer',
      index: 0,
    },
    {
      title: 'Partner',
      index: 1,
    },
    {
      title: 'Supporter',
      index: 2,
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
          {activeIndex === 0 && <Volunteers />}
          {activeIndex === 1 && <Partners />}
          {activeIndex === 2 && <Supporters />}
        </div>
      </div>
    </DashboardLayout>
  );
}
