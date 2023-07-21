import SupporterLayout from '@/components/layout/supporter-layout';
import SupporterJoinRequestTable from '@/components/table/request/supporter-join-request-table';
import type { JoinRequestTableProps } from '@/lib/types';
import { api } from '@/utils/api';
const Index = () => {
  const { data: requests } =
    api.supporter.getMytProjectsJoinRequestsOrInvitations.useQuery({
      projectType: 'grantFundraising',
      status: null,
      requestType: 'request',
    });

  console.log(requests);
  return (
    <SupporterLayout>
      <div>
        {requests ? (
          <SupporterJoinRequestTable
            data={requests as JoinRequestTableProps[]}
          />
        ) : (
          'loadiing..'
        )}
      </div>
    </SupporterLayout>
  );
};

export default Index;
