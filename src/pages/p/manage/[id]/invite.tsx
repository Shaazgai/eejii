import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PartnerLayout from '@/components/layout/partner-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Button } from '@/components/ui/button';
import { api } from '@/utils/api';

const PartnerList = ({ fundraisingId }: { fundraisingId: string }) => {
  const { data: partners } = api.partner.findAllForFundInvitation.useQuery({
    fundId: fundraisingId,
  });
  const context = api.useContext();
  const { mutate, isLoading } = api.partner.inviteToFundraising.useMutation({
    onSuccess: () => {
      context.partner.findAllForFundInvitation.invalidate();
    },
  });

  return (
    <div>
      <h3 className="font-bold">Partners</h3>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {partners ? (
          partners?.map((partner, i) => (
            <li className="py-3 sm:py-4" key={i}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {/* <img
                    className="h-8 w-8 rounded-full"
                    src="/eejii.jpeg"
                    alt="avatar image"
                  /> */}
                  {partner?.id as unknown as string}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {partner.organization}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {partner.email}
                  </p>
                  {/* <p>{partner.id}</p> */}
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Button
                    disabled={isLoading}
                    onClick={() => {
                      mutate({
                        id: fundraisingId,
                        partnerId: partner.id as unknown as string,
                        supporterId: null,
                      });
                    }}
                  >
                    Invite
                  </Button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <span>...Loading</span>
        )}
      </ul>
    </div>
  );
};

const SupporterList = ({ fundraisingId }: { fundraisingId: string }) => {
  const { data: supporters } = api.supporter.findAllForFundInvitation.useQuery({
    fundId: fundraisingId,
  });
  const context = api.useContext();
  const { mutate, isLoading } = api.partner.inviteToFundraising.useMutation({
    onSuccess: () => {
      context.supporter.findAllForFundInvitation.invalidate();
    },
  });
  return (
    <div>
      <h3 className="font-bold">Supporters</h3>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {supporters ? (
          supporters.map((supporter, i) => (
            <li className="py-3 sm:py-4" key={i}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="/eejii.jpeg"
                    alt="avatar image"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {supporter.organization}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {supporter.email}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Button
                    disabled={isLoading}
                    onClick={() => {
                      mutate({
                        id: fundraisingId,
                        partnerId: null,
                        supporterId: supporter.id as unknown as string,
                      });
                    }}
                  >
                    Invite
                  </Button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <span>...Loading</span>
        )}
      </ul>
    </div>
  );
};

const Invite = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const [fundId, setFundId] = useState('');
  useEffect(() => {
    if (router.isReady) {
      setFundId(router.query.id as string);
    }
  }, [router.isReady]);
  const tabs = [
    {
      title: 'Partner',
      index: 0,
    },
    {
      title: 'Supporter',
      index: 1,
    },
  ];
  return (
    <PartnerLayout>
      <div className="space-y-5 p-24">
        <NormalTabs
          tabs={tabs}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        />

        {activeIndex == 0 && <PartnerList fundraisingId={fundId} />}
        {activeIndex == 1 && <SupporterList fundraisingId={fundId} />}
      </div>
    </PartnerLayout>
  );
};

export default Invite;
