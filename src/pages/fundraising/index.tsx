import FundCardPublic from '@/components/card/fund-card';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { ProjectStatus } from '@/lib/db/enums';
import type { FundWithOwner } from '@/lib/types';
import { api } from '@/utils/api';

export default function Index() {
  const { data: fundraisings, isLoading: isFundLoading } =
    api.fundraising.getAll.useQuery({
      page: 1,
      limit: 20,
      enabled: true,
      status: ProjectStatus.APPROVED,
    });
  return (
    <BasicBaseLayout>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:md:grid-cols-3">
          {!isFundLoading &&
            fundraisings?.items?.map((fund, index: number) => (
              <FundCardPublic
                fund={fund as unknown as FundWithOwner}
                key={index}
                isVolunteer={false}
              />
            ))}
        </div>
      </div>
    </BasicBaseLayout>
  );
}
