import ProjectCard from '@/components/card/manage/fund-card';
import ManageProjectsHeading from '@/components/layout/heading/manage-projects-heading';
import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';
import type { Fundraising } from '@/lib/db/types';
import { api } from '@/utils/api';

export default function ManageProjects() {
  const { data: fundraising, isLoading: isFundraisingLoading } =
    api.fundraising.getMyFunds.useQuery();

  return (
    <PartnerLayout>
      <Shell variant="sidebar" className="px-10">
        <ManageProjectsHeading />
        {!isFundraisingLoading
          ? fundraising?.map((fund, index) => (
              <ProjectCard
                key={index}
                fundraising={fund as unknown as Fundraising}
              />
            ))
          : '..loading'}
      </Shell>
    </PartnerLayout>
  );
}
