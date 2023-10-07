import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PartnerLayout from '@/components/layout/partner-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Button } from '@/components/ui/button';
import { UserType } from '@/lib/db/enums';
import { api } from '@/utils/api';

const UserList = ({
  fundraisingId,
  userType,
}: {
  fundraisingId: string;
  userType: string;
}) => {
  const { data: users } = api.fundraising.findUsersToInvite.useQuery({
    fundId: fundraisingId,
    userType: userType,
  });
  const context = api.useContext();
  const { mutate, isLoading } =
    api.fundAssociation.inviteToFundraising.useMutation({
      onSuccess: () => {
        context.fundraising.findUsersToInvite.invalidate();
      },
    });

  return (
    <div>
      <h3 className="font-bold">
        {userType === UserType.USER_PARTNER ? 'Partners' : 'Supporters'}
      </h3>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {users ? (
          users?.map((user, i) => (
            <li className="py-3 sm:py-4" key={i}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {/* <img
                    className="h-8 w-8 rounded-full"
                    src="/eejii.jpeg"
                    alt="avatar image"
                  /> */}
                  {user?.id as unknown as string}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {user.organization}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                  {/* <p>{user.id}</p> */}
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Button
                    disabled={isLoading}
                    onClick={() => {
                      mutate({
                        id: fundraisingId,
                        userId: user.id,
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
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      setFundId(router.query.id as string);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (activeIndex === 0) {
      setUserType(UserType.USER_PARTNER);
    } else if (activeIndex === 1) {
      setUserType(UserType.USER_SUPPORTER);
    }
  }, [activeIndex]);

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

        <UserList fundraisingId={fundId} userType={userType as string} />
      </div>
    </PartnerLayout>
  );
};

export default Invite;
