import { Button } from '@/components/ui/button';
import type { FundAssociationWithFund } from '@/lib/types';
import { api } from '@/utils/api';

const FundRequestCard = ({
  fundAssociation,
}: {
  fundAssociation: FundAssociationWithFund;
}) => {
  const fundraising = fundAssociation.Fundraising;
  const { mutate } = api.fundAssociation.handleFundRequest.useMutation({
    onSuccess: res => console.log(res),
  });

  function handleRequest(status: string) {
    mutate({
      id: fundAssociation.id as unknown as string,
      status: status,
    });
  }
  return (
    <div className="flex w-full justify-between rounded-md border ">
      <div className="flex">
        <div className="flex items-center justify-center border-r p-4">
          2022.10.10
        </div>
        <div className="flex flex-col p-4">
          <div>{fundraising?.title}</div>
          <div>{fundraising?.description}</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        {fundAssociation.type === 'invitation' &&
          fundAssociation.status === 'pending' && (
            <div className="space-x-2">
              <Button
                variant="default"
                onClick={() => handleRequest('approved')}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleRequest('cancelled')}
              >
                Cancel
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};

export default FundRequestCard;
