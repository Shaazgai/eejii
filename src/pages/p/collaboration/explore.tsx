import React, { useState } from 'react';

import PartnerLayout from '@/components/layout/partner-layout';
import EventList from '@/components/list/event-list';
import FundraisingList from '@/components/list/fund-list';
import GrantFundraisingList from '@/components/list/grant-list';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Shell } from '@/components/shells/shell';
import type { GrantFundraising } from '@/lib/db/types';
import type { EventWithOwner, FundWithOwner } from '@/lib/types';
import { api } from '@/utils/api';

export const ExploreFundraisings = () => {
  const { data: fundraisings, isLoading: isFundLoading } =
    api.fundraising.getNotRelated.useQuery();
  return (
    <div>
      {!isFundLoading ? (
        <FundraisingList
          fundraisings={fundraisings as FundWithOwner[]}
          isLoading={isFundLoading}
        />
      ) : (
        '...Loading'
      )}
    </div>
  );
};

export const ExploreEvents = () => {
  const { data, isLoading } = api.event.getNotRelated.useQuery();
  return (
    <div>
      {!isLoading ? (
        <EventList
          events={data as EventWithOwner[]}
          isLoading={isLoading}
          isVolunteer={false}
        />
      ) : (
        '...Loading'
      )}
    </div>
  );
};
export const ExploreGrants = () => {
  const { data, isLoading } = api.grantFundraising.getNotRelated.useQuery();
  return (
    <div>
      {!isLoading ? (
        <GrantFundraisingList
          grants={data as GrantFundraising[]}
          isLoading={isLoading}
        />
      ) : (
        '...Loading'
      )}
    </div>
  );
};
const Explore = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [
    {
      title: `Events`,
      index: 0,
    },
    {
      title: `Fundraisings`,
      index: 1,
    },
    {
      title: `Grant Fundraisings`,
      index: 2,
    },
  ];
  return (
    <PartnerLayout>
      <Shell variant="sidebar" className="px-10">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-semibold">Explore projects</h1>
            <p className="text-gray-700">
              Search through exciting projects and send request to join them
            </p>
          </div>
          <NormalTabs
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            tabs={tabs}
          />
        </div>
        <div>
          {activeIndex === 0 && <ExploreEvents />}
          {activeIndex === 1 && <ExploreFundraisings />}
          {activeIndex === 2 && <ExploreGrants />}
        </div>
      </Shell>
    </PartnerLayout>
  );
};

export default Explore;
