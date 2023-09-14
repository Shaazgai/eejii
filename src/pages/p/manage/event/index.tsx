import { useRouter } from 'next/router';

import EventCard from '@/components/card/manage/event-card';
import PartnerLayout from '@/components/layout/partner-layout';
import { LinkTabs } from '@/components/pagers/link-tabs';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import type { FundaisingType } from '@/lib/types';
import { api } from '@/utils/api';
import SectionHeader from '@/components/common/section-header';

export default function ManageProjects() {
  const router = useRouter();

  const { data: fundraising, isLoading: isFundraisingLoading } =
    api.fundraising.getAll.useQuery();
  console.log(
    '🚀 ~ file: index.tsx:15 ~ ManageProjects ~ fundraising:',
    isFundraisingLoading
  );
  const { data: grantFundraising, isLoading: isGrantFundraisingLoading } =
    api.grantFundraising.getAll.useQuery();
  const { data: event, isLoading: isEventLoading } =
    api.event.getAll.useQuery();

  const tabs = [
    {
      title: `Fundraising (${fundraising?.length})`,
      href: '/p/manage',
    },
    {
      title: `Grant-fundraising (${grantFundraising?.length})`,
      href: '/p/manage/grant',
    },
    {
      title: `Event (${event?.length})`,
      href: '/p/manage/event',
    },
  ];

  return (
    <PartnerLayout>
      <Shell variant="sidebar" className="px-10">
        <SectionHeader
          src={'/images/placeholder.svg'}
          variant="dark"
          className=""
        >
          <div className="flex w-full items-center justify-between">
            <h2 className="text-3xl capitalize">Manage projects</h2>
            <Button
              className="rounded-full border bg-primary hover:bg-gray-200 hover:text-gray-950"
              // variant={'secondary'}
              onClick={() => router.push('/p/manage/new')}
            >
              Add
            </Button>
          </div>
        </SectionHeader>
        <LinkTabs tabs={tabs} />

        {event?.map((event, index) => (
          <EventCard key={index} fundraising={event as FundaisingType} />
        ))}
      </Shell>
    </PartnerLayout>
  );
}
