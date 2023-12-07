import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PartnerLayout from '@/components/layout/partner-layout';
import { UserList } from '@/components/list/invite-user-list';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Button } from '@/components/ui/button';
import { UserType } from '@/lib/db/enums';
import type { User } from '@/lib/db/types';
import { api } from '@/utils/api';

const Invite = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [eventId, setEventId] = useState('');
  const [userType, setUserType] = useState<string | null>('USER_PARTNER');

  const context = api.useContext();
  const { data: users, isLoading: isUsersLoading } =
    api.event.findUsersToInvite.useQuery({
      eventId: eventId,
      userType: userType as string,
    });
  const { mutate: invite, isLoading: isInviteLoading } =
    api.eventAssociation.inviteToEvent.useMutation({
      onSuccess: () => {
        context.event.findUsersToInvite.invalidate();
      },
    });

  useEffect(() => {
    if (router.isReady) {
      setEventId(router.query.id as string);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (activeIndex === 0) {
      setUserType(UserType.USER_PARTNER);
    } else if (activeIndex === 1) {
      setUserType(UserType.USER_SUPPORTER);
    } else if (activeIndex === 2) {
      setUserType(UserType.USER_VOLUNTEER);
    }

    console.log(userType);
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
    {
      title: 'Volunteer',
      index: 2,
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
            projectId={eventId}
            userType={userType as string}
            isInviteLoading={isInviteLoading}
          />
        )}
        <div className="flex justify-end">
          <Button
            onClick={() => {
              router.push(`/p/manage/event/${eventId}`);
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
