import { useRouter } from 'next/router';

import ProjectCard from '@/components/card/manage/fund-card';
import SectionHeader from '@/components/common/section-header';
import PartnerLayout from '@/components/layout/partner-layout';
import { LinkTabs } from '@/components/pagers/link-tabs';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
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
        <SectionHeader src={'/images/spider.jpg'} variant="dark" className="">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-3xl capitalize">Manage projects</h2>
            <Button
              className="rounded-full border bg-transparent hover:bg-gray-200 hover:text-gray-950"
              // variant={'secondary'}
              onClick={() => router.push('manage/new')}
            >
              Add
            </Button>
          </div>
        </SectionHeader>
        <div className="flex justify-between">
          <LinkTabs tabs={tabs} />
        </div>

        {fundraising?.map((fund, index) => (
          <ProjectCard key={index} fundraising={fund as FundraisingType} />
        ))}
      </Shell>
    </PartnerLayout>
  );
}
