import { Button } from '@/components/ui/button';
import type { ProjectUser } from '@/lib/types';
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

const FundRequestCard = ({
  projectUser,
  isOwner,
}: {
  projectUser: ProjectUser;
  isOwner: boolean;
}) => {
  const project = projectUser.Project;
  console.log(projectUser);
  const context = api.useContext();
  const { mutate } = api.projectUser.handleFundRequest.useMutation({
    onSuccess: () => context.projectUser.findAll.invalidate(),
  });

  function handleRequest(status: string) {
    mutate({
      id: projectUser.id as unknown as string,
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
          <div>{project?.title}</div>
          <div>{project?.description}</div>
        </div>
        <div className="flex items-center border-r p-4">
          <div>{projectUser.type}</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        {isOwner ? (
          <ProjectOwnerAction
            type={projectUser.type as string}
            status={projectUser.status as string}
            handleRequest={handleRequest}
          />
        ) : (
          <ParticipantAction
            type={projectUser.type as string}
            status={projectUser.status as string}
            handleRequest={handleRequest}
          />
        )}
      </div>
    </div>
  );
};

export default FundRequestCard;
