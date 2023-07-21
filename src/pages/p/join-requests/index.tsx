import { useEffect, useState } from 'react';

import PartnerLayout from '@/components/layout/partner-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import RequestsDataTable from '@/components/table/request/requests-data-table';
import type { JoinRequestTableProps } from '@/lib/types';
import { api } from '@/utils/api';

const Index = () => {
  const [type, setType] = useState('fundraising');
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: requests } =
    api.partner.getMytProjectsJoinRequestsOrInvitations.useQuery({
      projectType: type,
      status: null,
      requestType: 'request',
    });

  const tabs = [
    {
      title: `Fundraising`,
      index: 0,
    },
    {
      title: `Grant-fundraising`,
      index: 1,
    },
    {
      title: `Event`,
      index: 2,
    },
  ];

  useEffect(() => {
    if (activeIndex === 0) {
      setType('fundraising');
    } else if (activeIndex === 1) {
      setType('grantFundraising');
    } else if (activeIndex === 2) {
      setType('event');
    }
  }, [activeIndex]);

  return (
    <PartnerLayout>
      <div>
        <NormalTabs
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          tabs={tabs}
        />
        {requests ? (
          <RequestsDataTable
            data={requests as JoinRequestTableProps[]}
            type={type}
          />
        ) : (
          'loadiing..'
        )}
      </div>
    </PartnerLayout>
  );
};

export default Index;
