import GrantCardPublic from '@/components/card/grant-card';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { ProjectStatus } from '@/lib/db/enums';
import type { GrantFundraising } from '@/lib/db/types';
import { api } from '@/utils/api';

export default function Index() {
  const { data: grantFundraisings, isLoading } =
    api.grantFundraising.getAll.useQuery({
      page: 1,
      limit: 20,
      enabled: true,
      status: ProjectStatus.APPROVED,
    });
  return (
    <BasicBaseLayout>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:md:grid-cols-3">
          {!isLoading &&
            grantFundraisings?.items?.map((grant, index) => (
              <GrantCardPublic
                grant={grant as unknown as GrantFundraising}
                key={index}
              />
            ))}
        </div>
      </div>
    </BasicBaseLayout>
  );
}
