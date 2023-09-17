import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import EventRequestCard from '@/components/card/request/event-request-card';
import FundRequestCard from '@/components/card/request/fund-request-card';
import GrantRequestCard from '@/components/card/request/grant-request-card';
import PartnerLayout from '@/components/layout/partner-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import type {
  EventAssociationWithEvent,
  FundAssociationWithFund,
  GrantAssociationWithGrant,
} from '@/lib/types';
import { api } from '@/utils/api';

const Index = () => {
  const session = useSession();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState('approved');

  const { data: eventAssociation, isLoading: isEventLoading } =
    api.eventAssociation.findAll.useQuery({
      userId: session.data?.user.id,
      status: status,
    });
  const { data: fundAssociation, isLoading: isFundLoading } =
    api.fundAssociation.findAll.useQuery({
      userId: session.data?.user.id,
      status: status,
    });
  const { data: grantAssociation, isLoading: isGrantLoading } =
    api.grantAssociation.findAll.useQuery({
      userId: session.data?.user.id,
      status: status,
    });
  useEffect(() => {
    if (activeIndex === 0) {
      setStatus('approved');
    } else if (activeIndex === 1) {
      setStatus('pending');
    }
  }, [activeIndex]);
  const tabs = [
    {
      title: `My collaborations`,
      index: 0,
    },
    {
      title: `Pending`,
      index: 1,
    },
  ];

  return (
    <PartnerLayout>
      <Shell variant="sidebar" className="px-10">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-semibold">Collaborations</h1>
            <p className="text-gray-700">
              Search through exciting projects and send request to join them
            </p>
          </div>
          <div className="flex justify-between">
            <NormalTabs
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              tabs={tabs}
            />
            <Button
              variant={'outline'}
              onClick={() => router.push('/p/collaboration/explore')}
            >
              Explore <ArrowRight />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3>Events</h3>
              {!isEventLoading
                ? eventAssociation?.map((event, i) => (
                    <EventRequestCard
                      isOwner={false}
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
                      isOwner={false}
                      fundAssociation={
                        fund as unknown as FundAssociationWithFund
                      }
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
                      isOwner={false}
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
        </div>
      </Shell>
    </PartnerLayout>
  );
};

export default Index;
