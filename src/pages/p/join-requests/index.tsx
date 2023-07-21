import { useState } from 'react';

import PartnerLayout from '@/components/layout/partner-layout';
import { Button } from '@/components/ui/button';
import { api } from '@/utils/api';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('fundraising');
  const utils = api.useContext();
  const { data: requests } = api.partner.getJoinRequests.useQuery(
    {
      type: type,
      status: null,
    },
    { onSuccess: () => setLoading(false) }
  );

  console.log(requests);
  const { mutate, isLoading } = api.partner.handleRequest.useMutation({
    onSuccess: res => {
      console.log(res);
      utils.partner.getJoinRequests.invalidate();
    },
  });

  return (
    <PartnerLayout>
      <div>
        {loading && 'loadiing..'}
        {requests?.map((request, i) => {
          return (
            <span key={i}>
              {request.id}
              <br />
              {request.status}
              <Button
                disabled={isLoading}
                onClick={() =>
                  mutate({ id: request.id, type: type, status: 'approved' })
                }
              >
                Approve
              </Button>
              <Button
                disabled={isLoading}
                onClick={() =>
                  mutate({ id: request.id, type: type, status: 'denied' })
                }
              >
                Deny
              </Button>
            </span>
          );
        })}
      </div>
    </PartnerLayout>
  );
};

export default Index;
