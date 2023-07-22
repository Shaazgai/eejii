import GrantCardPublic from '@/components/card/grant-card';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { api } from '@/utils/api';

export default function index() {
  const { data: grantFundraisings, isFetching } =
    api.grantFundraising.getAll.useQuery();
  console.log('🚀 ~ file: index.tsx:7 ~ index ~ isFetching:', isFetching);
  console.log('🚀 ~ file: index.tsx:7 ~ index ~ data:', grantFundraisings);
  return (
    <BasicBaseLayout>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:md:grid-cols-3">
          {grantFundraisings?.map((grant, index) => (
            <GrantCardPublic grant={grant} key={index} />
          ))}
        </div>
      </div>
    </BasicBaseLayout>
  );
}
