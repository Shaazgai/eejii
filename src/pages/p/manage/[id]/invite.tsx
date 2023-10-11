import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PartnerLayout from '@/components/layout/partner-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Button } from '@/components/ui/button';
import { UserType } from '@/lib/db/enums';
import { api } from '@/utils/api';
import { UserList } from '@/components/list/invite-user-list';
import type { User } from '@/lib/db/types';

const Invite = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [fundId, setFundId] = useState('');
  const [userType, setUserType] = useState<string | null>(null);

  const context = api.useContext();
  const { data: users, isLoading: isUsersLoading } =
    api.fundraising.findUsersToInvite.useQuery({
      fundId: fundId,
      userType: userType as string,
    });
  const { mutate: invite, isLoading: isInviteLoading } =
    api.fundAssociation.inviteToFundraising.useMutation({
      onSuccess: () => {
        context.fundraising.findUsersToInvite.invalidate();
      },
    });

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

  function handleInvite(id: string, userId: string) {
    invite({ id: id, userId: userId });
  }

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

        {!isUsersLoading && (
          <UserList
            users={users as User[]}
            invite={handleInvite}
            projectId={fundId}
            userType={userType as string}
            isInviteLoading={isInviteLoading}
          />
        )}
        <div className="flex justify-end">
          <Button
            onClick={() => {
              router.push(`/p/manage/${fundId}`);
            }}
          >
            Skip
          </Button>
        </div>
      </div>
    </PartnerLayout>
  );
};

export default Invite;
