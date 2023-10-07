import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import GrantCard from '@/components/card/manage/grant-card';
import SectionHeader from '@/components/common/section-header';
import SupporterLayout from '@/components/layout/supporter-layout';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import type { GrantFundraising } from '@/lib/db/types';
import { api } from '@/utils/api';

export default function ManageProjects() {
  const router = useRouter();

  const { data: grantFundraising } =
    api.grantFundraising.getMyGrants.useQuery();

  return (
    <SupporterLayout>
      <Shell>
        <SectionHeader
          src={'/images/placeholder.svg'}
          variant="dark"
          className=""
        >
          <div className="flex w-full items-center justify-between">
            {/* <h2 className="text-3xl capitalize">Manage projects</h2> */}
            <Button
              className="rounded-full border bg-primary hover:bg-gray-200 hover:text-gray-950"
              onClick={() => router.push('/s/manage/new')}
            >
              Add
            </Button>
            <Link
              className="flex items-center gap-2 text-gray-950 hover:underline "
              href={'/s/manage/requests'}
            >
              Manage request
              <ArrowRight />
            </Link>
          </div>
        </SectionHeader>
        <div className="flex justify-between"></div>
        {/* <NormalTabs
          tabs={tabs}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        /> */}
        {grantFundraising?.map((grant, index) => (
          <GrantCard key={index} grant={grant as unknown as GrantFundraising} />
        ))}
      </Shell>
    </SupporterLayout>
  );
}
