import { Button } from '@/components/ui/button';
import type { GrantAssociationWithGrant } from '@/lib/types';
import { api } from '@/utils/api';

const GrantRequestCard = ({
  grantAssociation,
}: {
  grantAssociation: GrantAssociationWithGrant;
}) => {
  const grant = grantAssociation.Grant;
  const { mutate } = api.grantAssociation.handleGrantRequest.useMutation({
    onSuccess: res => console.log(res),
  });

  function handleRequest(status: string) {
    mutate({
      id: grantAssociation.id as unknown as string,
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
          <div>{grant?.title}</div>
          <div>{grant?.description}</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        {grantAssociation.type === 'invitation' &&
          grantAssociation.status === 'pending' && (
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

export default GrantRequestCard;
