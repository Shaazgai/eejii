import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import PartnerLayout from '@/components/layout/partner-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Shell } from '@/components/shells/shell';
import { api } from '@/utils/api';
import EventRequestCard from '@/components/card/request/event-request-card';
import GrantRequestCard from '@/components/card/request/grant-request-card';
import FundRequestCard from '@/components/card/request/fund-request-card';
import type { EventAssociationWithEvent, FundAssociationWithFund, GrantAssociationWithGrant } from '@/lib/types';

const Requests = () => {
  const session = useSession();
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState('approved');
  const { data: eventAssociation, isLoading: isEventLoading } =
    api.eventAssociation.findAll.useQuery({
      eventsOwnerId: session.data?.user.id,
      status: status,
    });
  const { data: fundAssociation, isLoading: isFundLoading } =
    api.fundAssociation.findAll.useQuery({
      eventsOwnerId: session.data?.user.id,
      status: status,
    });
  const { data: grantAssociation, isLoading: isGrantLoading } =
    api.grantAssociation.findAll.useQuery({
      eventsOwnerId: session.data?.user.id,
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
              ? eventAssociation?.map((event, i) => (
                  <EventRequestCard
                    isOwner={true}
                    eventAssociation={
                      event as unknown as EventAssociationWithEvent
                    }
                    key={i}
                  />
                ))
              : '..Loading'}
            {eventAssociation?.length === 0 && 'No result'}
          </div>
          <div className="space-y-2">
            <h3>Fundraisings</h3>
            {!isFundLoading
              ? fundAssociation?.map((fund, i) => (
                  <FundRequestCard
                    isOwner={true}
                    fundAssociation={fund as unknown as FundAssociationWithFund}
                    key={i}
                  />
                ))
              : '..Loading'}
            {fundAssociation?.length === 0 && 'No result'}
          </div>
          <div>
            <h3>Grant Fundraisings</h3>
            {!isGrantLoading
              ? grantAssociation?.map((grant, i) => (
                  <GrantRequestCard
                    isOwner={true}
                    grantAssociation={
                      grant as unknown as GrantAssociationWithGrant
                    }
                    key={i}
                  />
                ))
              : '..Loading'}
            {grantAssociation?.length === 0 && 'No result'}
          </div>
        </div>
      </Shell>
    </PartnerLayout>
  );
};

export default Requests;
