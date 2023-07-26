import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PartnerLayout from '@/components/layout/partner-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Button } from '@/components/ui/button';
import type { PartnerType, SupporterType, VolunteerType } from '@/lib/types';
import { api } from '@/utils/api';

const PartnerList = ({ eventId }: { eventId: string }) => {
  const { data: partners } = api.partner.findAllForEventInvitation.useQuery({
    eventId: eventId,
  });
  const context = api.useContext();
  const { mutate, isLoading } = api.partner.inviteToEvent.useMutation({
    onSuccess: () => {
      context.partner.findAllForEventInvitation.invalidate();
    },
  });

  return (
    <div>
      <h3 className="font-bold">Partners</h3>
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

const SupporterList = ({ eventId }: { eventId: string }) => {
  const { data: supporters } = api.supporter.findAllForEventInvitation.useQuery(
    {
      eventId: eventId,
    }
  );
  const context = api.useContext();
  const { mutate, isLoading } = api.partner.inviteToEvent.useMutation({
    onSuccess: () => {
      context.supporter.findAllForEventInvitation.invalidate();
    },
  });
  return (
    <div>
      <h3 className="font-bold">Supporters</h3>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {supporters ? (
          supporters.map((supporter: SupporterType) => (
            <li className="py-3 sm:py-4" key={supporter.id}>
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
                        id: eventId,
                        partnerId: null,
                        supporterId: supporter.id,
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

const VolunteerList = ({ eventId }: { eventId: string }) => {
  const { data: volunteers } = api.volunteer.findAllForEventInvitation.useQuery(
    {
      eventId: eventId,
    }
  );
  const context = api.useContext();
  const { mutate, isLoading } = api.partner.inviteToEvent.useMutation({
    onSuccess: () => {
      context.volunteer.findAllForEventInvitation.invalidate();
    },
  });
  return (
    <div>
      <h3 className="font-bold">Supporters</h3>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {volunteers ? (
          volunteers.map((volunteer: VolunteerType) => (
            <li className="py-3 sm:py-4" key={volunteer.id}>
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
                    {volunteer.firstName}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {volunteer.email}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Button
                    disabled={isLoading}
                    onClick={() => {
                      mutate({
                        id: eventId,
                        volunteerId: volunteer.id,
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
  useEffect(() => {
    if (router.isReady) {
      setEventId(router.query.id as string);
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

        {activeIndex == 0 && <PartnerList eventId={eventId} />}
        {activeIndex == 1 && <SupporterList eventId={eventId} />}
        {activeIndex == 2 && <VolunteerList eventId={eventId} />}
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
