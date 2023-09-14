import FundCard from '@/components/card/fund-card';
import type { FundraisingType } from '@/lib/types';

const FundraisingList = ({
  fundraisings,
  isLoading,
}: {
  fundraisings: FundraisingType[];
  isLoading: boolean;
}) => {
  return (
    <div>
      <div className="mb-5 border-b pb-2 font-bold">
        <h2 className=" text-2xl">Fundraisings</h2>
      </div>
      {isLoading && '..Loading'}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!isLoading &&
          fundraisings?.length > 0 &&
          fundraisings.map(fund => {
            return <FundCard key={fund.id} fund={fund} isVolunteer={true} />;
          })}
      </div>
    </div>
  );
};

export default FundraisingList;
