import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import EventRequestCard from '@/components/card/request/event-request-card';
import FundRequestCard from '@/components/card/request/fund-request-card';
import PartnerLayout from '@/components/layout/partner-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Shell } from '@/components/shells/shell';
import type { EventUser, ProjectUser } from '@/lib/types';
import { api } from '@/utils/api';

const Requests = () => {
  const session = useSession();
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState('approved');
  const { data: eventUser, isLoading: isEventLoading } =
    api.eventUser.findAll.useQuery({
      eventsOwnerId: session.data?.user.id,
      status: status,
    });
  const { data: projectUser, isLoading: isFundLoading } =
    api.projectUser.findAll.useQuery({
      fundsOwnerId: session.data?.user.id,
      status: status,
    });

  useEffect(() => {
    if (activeIndex === 0) {
      setStatus('approved');
    } else if (activeIndex === 1) {
      setStatus('pending');
    } else if (activeIndex === 2) {
      setStatus('cancelled');
    }
  }, [activeIndex]);
  const tabs = [
    {
      title: `Approved`,
      index: 0,
    },
    {
      title: `Pending`,
      index: 1,
    },
    {
      title: `Cancelled`,
      index: 2,
    },
  ];
  return (
    <PartnerLayout>
      <Shell variant="sidebar" className="px-10">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-semibold">Manage requests</h1>
            <p className="text-gray-700">
              Manage your projects join requests and monitor your invitations
              status
            </p>
          </div>
          <NormalTabs
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            tabs={tabs}
          />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3>Events</h3>
            {!isEventLoading
              ? eventUser?.map((event, i) => (
                  <EventRequestCard
                    isOwner={true}
                    eventUser={event as unknown as EventUser}
                    key={i}
                  />
                ))
              : '..Loading'}
            {eventUser?.length === 0 && 'No result'}
          </div>
          <div className="space-y-2">
            <h3>Projects</h3>
            {!isFundLoading
              ? projectUser?.map((fund, i) => (
                  <FundRequestCard
                    isOwner={true}
                    projectUser={fund as unknown as ProjectUser}
                    key={i}
                  />
                ))
              : '..Loading'}
            {projectUser?.length === 0 && 'No result'}
          </div>
        </div>
      </Shell>
    </PartnerLayout>
  );
};

export default Requests;
