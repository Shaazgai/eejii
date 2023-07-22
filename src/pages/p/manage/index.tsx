import { useRouter } from 'next/router';

import ProjectCard from '@/components/card/manage/fund-card';
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
      <Shell>
        <div className="flex justify-between">
          <h2>manage-projects</h2>
          <Button onClick={() => router.push('manage/new')}>Add</Button>
        </div>
        <LinkTabs tabs={tabs} />

        {fundraising?.map((fund, index) => (
          <ProjectCard key={index} fundraising={fund as FundraisingType} />
        ))}
      </Shell>
    </PartnerLayout>
  );
}
