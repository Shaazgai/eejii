import GrantCard from '@/components/card/manage/grant-card';
import ManageProjectsHeading from '@/components/layout/heading/manage-projects-heading';
import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';
import type { GrantFundraising } from '@/lib/db/types';
import { api } from '@/utils/api';

export default function ManageProjects() {
  const { data: grantFundraisings, isLoading: isGrantFundraisingLoading } =
    api.grantFundraising.getMyGrants.useQuery();

  return (
    <PartnerLayout>
      <Shell variant="sidebar" className="px-10">
        <ManageProjectsHeading />
        {!isGrantFundraisingLoading
          ? grantFundraisings?.map((grant, index) => (
              <GrantCard
                key={index}
                grant={grant as unknown as GrantFundraising}
              />
            ))
          : '...loading'}
      </Shell>
    </PartnerLayout>
  );
}
