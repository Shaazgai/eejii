import { useEffect, useState } from 'react';

import SupporterLayout from '@/components/layout/supporter-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import RequestsDataTable from '@/components/table/request/requests-data-table';
import { positions } from '@/lib/types';
import { api } from '@/utils/api';
const Index = () => {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('fundraising');
  const [activeIndex, setActiveIndex] = useState(0);

  const utils = api.useContext();
  const { data: requests } =
    api.supporter.getMytProjectsJoinRequestsOrInvitations.useQuery(
      {
        projectType: type,
        status: null,
        requestType: 'request',
      },
      { onSuccess: () => setLoading(false) }
    );

  console.log(requests);
  const { mutate, isLoading } = api.partner.handleRequest.useMutation({
    onSuccess: res => {
      console.log(res);
      utils.partner.getMytProjectsJoinRequestsOrInvitations.invalidate();
    },
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
    <SupporterLayout>
      <div>
        <NormalTabs
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          tabs={tabs}
        />
        {loading && 'loadiing..'}
        <RequestsDataTable data={positions} />
        {/* {requests?.map((request, i) => {
          return (
            <span key={i}>
              {request.id}
              <br />
              {request.status}
              <Button
                disabled={isLoading}
                onClick={() =>
                  mutate({ id: request.id, type: type, status: 'approved' })
                }
              >
                Approve
              </Button>
              <Button
                disabled={isLoading}
                onClick={() =>
                  mutate({ id: request.id, type: type, status: 'denied' })
                }
              >
                Deny
              </Button>
            </span>
          );
        })} */}
      </div>
    </SupporterLayout>
  );
};

export default Index;
