import { useRouter } from 'next/router';

import GrantCard from '@/components/card/manage/grant-card';
import PartnerLayout from '@/components/layout/partner-layout';
import { LinkTabs } from '@/components/pagers/link-tabs';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import type { FundraisingType } from '@/lib/types';
import { api } from '@/utils/api';

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
        <div className="flex justify-between">
          <h2>manage-projects</h2>
          <Button onClick={() => router.push('/p/manage/new')}>Add</Button>
        </div>
        <LinkTabs tabs={tabs} />

        {grantFundraising?.map((grant, index) => (
          <GrantCard key={index} grant={grant as FundraisingType} />
        ))}
      </Shell>
    </PartnerLayout>
  );
}
