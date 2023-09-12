import { useState } from 'react';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import PartnerTable from '@/components/table/admin/partner-table';
import SupporterTable from '@/components/table/admin/supporter-table';
import VolunteerTable from '@/components/table/admin/volunteer-table';
import type { User } from '@/lib/db/types';
import { api } from '@/utils/api';

export const Partners = () => {
  const {
    data: partners,
    isLoading: isPartnerLoading,
    isFetching: isPartnerFetching,
  } = api.partner.findAll.useQuery();
  return (
    <div>
      {!isPartnerLoading && !isPartnerFetching ? (
        <PartnerTable data={partners as unknown as User[]} />
      ) : (
        'Loading'
      )}
    </div>
  );
};

export const Supporters = () => {
  const {
    data: supporters,
    isLoading: isSupporterLoading,
    isFetching: isSupporterFetching,
  } = api.supporter.findAll.useQuery();
  return (
    <div>
      {!isSupporterLoading && !isSupporterFetching ? (
        <SupporterTable data={supporters as unknown as User[]} />
      ) : (
        'Loading'
      )}
    </div>
  );
};
export const Volunteers = () => {
  const {
    data: volunteers,
    isLoading: isVolunteerLoading,
    isFetching: isVolunteerFetching,
  } = api.volunteer.findAll.useQuery();
  return (
    <div>
      {!isVolunteerLoading && !isVolunteerFetching ? (
        <VolunteerTable data={volunteers as unknown as User[]} />
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
