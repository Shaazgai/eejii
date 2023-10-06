import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import GrantRequestCard from '@/components/card/request/grant-request-card';
import SupporterLayout from '@/components/layout/supporter-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Shell } from '@/components/shells/shell';
import type { GrantAssociationWithGrant } from '@/lib/types';
import { api } from '@/utils/api';

const Requests = () => {
  const session = useSession();
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState('approved');
  const { data: grantAssociation, isLoading: isGrantLoading } =
    api.grantAssociation.findAll.useQuery({
      grantsOwnerId: session.data?.user.id,
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
    <SupporterLayout>
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
    </SupporterLayout>
  );
};

export default Requests;
