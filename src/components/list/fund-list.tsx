import FundCard from '@/components/card/fund-card';
import type { Fundraising } from '@/lib/db/types';

const FundraisingList = ({
  fundraisings,
  isLoading,
}: {
  fundraisings: Fundraising[];
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
          fundraisings.map((fund, i) => {
            return <FundCard key={i} fund={fund} isVolunteer={true} />;
          })}
      </div>
    </div>
  );
};

export default FundraisingList;
