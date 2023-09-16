import type { GrantFundraising } from '@/lib/db/types';

import GrantCardPublic from '../card/grant-card';

const GrantFundraisingList = ({
  grants,
  isLoading,
}: {
  grants: GrantFundraising[];
  isLoading: boolean;
}) => {
  return (
    <div>
      <div className="mb-5 border-b pb-2 font-bold">
        <h2 className=" text-2xl">Grants</h2>
      </div>
      {isLoading && '..Loading'}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!isLoading &&
          grants?.length > 0 &&
          grants.map((grant, i) => {
            return <GrantCardPublic key={i} grant={grant} />;
          })}
      </div>
    </div>
  );
};

export default GrantFundraisingList;
