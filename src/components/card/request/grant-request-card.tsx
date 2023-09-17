import { Button } from '@/components/ui/button';
import type { GrantAssociationWithGrant } from '@/lib/types';
import { api } from '@/utils/api';

const ProjectOwnerAction = ({
  type,
  status,
  handleRequest,
}: {
  type: string;
  status: string;
  handleRequest: (arg: string) => void;
}) => {
  return (
    <div>
      {type === 'request' && status === 'pending' && (
        <div className="space-x-2">
          <Button variant="default" onClick={() => handleRequest('approved')}>
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
      {type === 'invitation' && status === 'pending' && (
        <div className="space-x-2">
          <Button
            variant="destructive"
            onClick={() => handleRequest('cancelled')}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

const ParticipantAction = ({
  type,
  status,
  handleRequest,
}: {
  type: string;
  status: string;
  handleRequest: (arg: string) => void;
}) => {
  return (
    <div>
      {type === 'invitation' && status === 'pending' && (
        <div className="space-x-2">
          <Button variant="default" onClick={() => handleRequest('approved')}>
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
      {type === 'request' && status === 'pending' && (
        <div className="space-x-2">
          <Button
            variant="destructive"
            onClick={() => handleRequest('cancelled')}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};
const GrantRequestCard = ({
  grantAssociation,
  isOwner,
}: {
  grantAssociation: GrantAssociationWithGrant;
  isOwner: boolean;
}) => {
  const grant = grantAssociation.Grant;
  const context = api.useContext();
  const { mutate } = api.grantAssociation.handleGrantRequest.useMutation({
    onSuccess: () => context.grantAssociation.findAll.invalidate(),
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
        <div className="flex flex-col border-r p-4">
          <div>{grant?.title}</div>
          <div>{grant?.description}</div>
        </div>
        <div className="flex items-center border-r p-4">
          <div>{grantAssociation.type}</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        {isOwner ? (
          <ProjectOwnerAction
            type={grantAssociation.type as string}
            status={grantAssociation.status as string}
            handleRequest={handleRequest}
          />
        ) : (
          <ParticipantAction
            type={grantAssociation.type as string}
            status={grantAssociation.status as string}
            handleRequest={handleRequest}
          />
        )}
      </div>
    </div>
  );
};

export default GrantRequestCard;
