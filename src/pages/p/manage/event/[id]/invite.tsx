import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PartnerLayout from '@/components/layout/partner-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Button } from '@/components/ui/button';
import { UserType } from '@/lib/db/enums';
import type { PartnerType } from '@/lib/types';
import { api } from '@/utils/api';

const UserList = ({
  eventId,
  userType,
}: {
  eventId: string;
  userType: string;
}) => {
  const { data: partners } = api.event.findUsersToInvite.useQuery({
    eventId: eventId,
    userType: userType,
  });
  const context = api.useContext();
  const { mutate, isLoading } = api.eventAssociation.inviteToEvent.useMutation({
    onSuccess: () => {
      context.event.findUsersToInvite.invalidate();
    },
  });

  return (
    <div>
      <h3 className="font-bold">
        {userType === UserType.USER_PARTNER
          ? 'Partners'
          : userType === UserType.USER_SUPPORTER
          ? 'Supporters'
          : 'Volunteers'}
      </h3>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {partners ? (
          partners.map((partner: PartnerType) => (
            <li className="py-3 sm:py-4" key={partner.id}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {/* <img
                    className="h-8 w-8 rounded-full"
                    src="/eejii.jpeg"
                    alt="avatar image"
                  /> */}
                  {partner.id}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {partner.organization}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {partner.email}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Button
                    disabled={isLoading}
                    onClick={() => {
                      mutate({
                        id: eventId,
                        partnerId: partner.id,
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
  const [eventId, setEventId] = useState('');
  const [userType, setUserType] = useState<string | null>(null);

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
        <UserList eventId={eventId} userType={userType} />

        {/* {activeIndex == 0 && <PartnerList eventId={eventId} />} */}
        {/* {activeIndex == 1 && <SupporterList eventId={eventId} />} */}
        {/* {activeIndex == 2 && <VolunteerList eventId={eventId} />} */}
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
