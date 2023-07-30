import { useState } from 'react';

import FundRequestCard from '@/components/card/request/fund-request-card';
import PartnerLayout from '@/components/layout/partner-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Shell } from '@/components/shells/shell';
import type { FundraisingType } from '@/lib/types';
import { api } from '@/utils/api';

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: myCollaborations, isLoading: isCollabLoading } =
    api.fundraising.getMyCollaborated.useQuery();
  const { data: myPendingCollabs, isLoading: isPendingLoading } =
    api.fundraising.getMyPending.useQuery();
  const { data: notRelatedFunds, isLoading: isExploreLoading } =
    api.fundraising.getNotRelated.useQuery();
  const tabs = [
    {
      title: `My collaborations`,
      index: 0,
    },
    {
      title: `Pending`,
      index: 1,
    },
    {
      title: `Explore`,
      index: 2,
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
          <NormalTabs
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            tabs={tabs}
          />
          {activeIndex === 0 && (
            <div className="space-y-4">
              {myCollaborations && myCollaborations.length > 0 ? (
                !isCollabLoading && myCollaborations ? (
                  myCollaborations.map(collab => (
                    <FundRequestCard
                      fundraising={collab as FundraisingType}
                      key={collab.id}
                    />
                  ))
                ) : (
                  <span>..Loading</span>
                )
              ) : (
                <span>No collab</span>
              )}
            </div>
          )}
          {activeIndex === 1 && (
            <div className="space-y-4">
              {myPendingCollabs && myPendingCollabs?.length > 0 ? (
                !isPendingLoading && myPendingCollabs ? (
                  myPendingCollabs.map(collab => (
                    <FundRequestCard
                      fundraising={collab as FundraisingType}
                      key={collab.id}
                    />
                  ))
                ) : (
                  <span>..Loading</span>
                )
              ) : (
                <span>No collab</span>
              )}
            </div>
          )}
          {activeIndex == 2 && (
            <div className="space-y-4">
              {notRelatedFunds && notRelatedFunds.length > 0 ? (
                !isExploreLoading && notRelatedFunds ? (
                  notRelatedFunds.map(collab => (
                    <FundRequestCard
                      fundraising={collab as FundraisingType}
                      key={collab.id}
                    />
                  ))
                ) : (
                  <span>..Loading</span>
                )
              ) : (
                <span>No collab</span>
              )}
            </div>
          )}
        </div>
      </Shell>
    </PartnerLayout>
  );
};

export default Index;
