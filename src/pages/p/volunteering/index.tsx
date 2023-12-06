import { useRouter } from 'next/router';

import SectionHeader from '@/components/common/section-header';
import PartnerLayout from '@/components/layout/partner-layout';
import { LinkTabs } from '@/components/pagers/link-tabs';
import { EventCard } from '@/components/partner/event/card';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import type { Event } from '@/lib/db/types';
import { api } from '@/utils/api';

export default function Volunteers() {
  const router = useRouter();
  const tabs = [
    {
      title: `Сайн дурын арга хэмжээ`,
      href: '/p/volunteering',
    },
    {
      title: `Сайн дурын ажилчид`,
      href: '/p/volunteering/volunteers',
    },
  ];

  const { data: events, isLoading } = api.event.getMyEvents.useQuery({});

  return (
    <PartnerLayout>
      <Shell>
        <SectionHeader
          src={'/images/placeholder.svg'}
          variant="dark"
          className=""
        >
          <div className="flex w-full items-center justify-between pl-4 pr-7 pt-4">
            <h2 className="text-3xl  font-semibold text-brand400">
              Сайн дурынхан
            </h2>
            <Button
              className="hover:bg-primarySecond"
              onClick={() => router.push('/p/manage/new')}
            >
              Эвэнт нэмэх
            </Button>
          </div>
        </SectionHeader>
        <LinkTabs tabs={tabs} />
      </Shell>
      {!isLoading && events
        ? events.map((event, i) => (
            <EventCard event={event as unknown as Event} key={i} />
          ))
        : '...Loading'}
    </PartnerLayout>
  );
}
