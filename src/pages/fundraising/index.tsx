import FundCardPublic from '@/components/card/fund-card';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { api } from '@/utils/api';

export default function index() {
  const { data: fundraisings, isFetching } = api.fundraising.getAll.useQuery();
  console.log('🚀 ~ file: index.tsx:7 ~ index ~ isFetching:', isFetching);
  console.log('🚀 ~ file: index.tsx:7 ~ index ~ data:', fundraisings);
  return (
    <BasicBaseLayout>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:md:grid-cols-3">
          {fundraisings?.map((fund, index) => (
            <FundCardPublic fund={fund} key={index} />
          ))}
        </div>
      </div>
    </BasicBaseLayout>
  );
}
