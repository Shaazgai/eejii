import { useRouter } from 'next/router';
import { useState } from 'react';

import GrantCard from '@/components/card/manage/grant-card';
import SupporterLayout from '@/components/layout/supporter-layout';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import type { FundraisingType } from '@/lib/types';
import { api } from '@/utils/api';

export default function ManageProjects() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: fundraising, isLoading: isFundraisingLoading } =
    api.fundraising.getAll.useQuery();
  console.log(
    '🚀 ~ file: index.tsx:15 ~ ManageProjects ~ fundraising:',
    fundraising
  );
  const { data: grantFundraising, isLoading: isGrantFundraisingLoading } =
    api.grantFundraising.getAll.useQuery();
  const { data: event, isLoading: isEventLoading } =
    api.event.getAll.useQuery();

  // const tabs = [
  //   {
  //     title: `Fundraising (${fundraising?.length})`,
  //     index: 0,
  //   },
  //   {
  //     title: `Grant-fundraising (${grantFundraising?.length})`,
  //     index: 1,
  //   },
  //   {
  //     title: `Event (${event?.length})`,
  //     index: 2,
  //   },
  // ];

  return (
    <SupporterLayout>
      <Shell>
        <div className="flex justify-between">
          <h2>manage-projects</h2>
          <Button onClick={() => router.push('manage/new')}>Add</Button>
        </div>
        {/* <NormalTabs
          tabs={tabs}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        /> */}
        {grantFundraising?.map((grant, index) => (
          <GrantCard key={index} grant={grant as FundraisingType} />
        ))}
      </Shell>
    </SupporterLayout>
  );
}
