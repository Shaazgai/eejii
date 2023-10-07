import { Button } from '@/components/ui/button';
import type { EventAssociationWithEvent } from '@/lib/types';
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

const EventRequestCard = ({
  eventAssociation,
  isOwner,
}: {
  eventAssociation: EventAssociationWithEvent;
  isOwner: boolean;
}) => {
  const event = eventAssociation.Event;
  const context = api.useContext();
  const { mutate } = api.eventAssociation.handleEventRequest.useMutation({
    onSuccess: () => context.eventAssociation.findAll.invalidate(),
  });

  function handleRequest(status: string) {
    mutate({
      id: eventAssociation.id as unknown as string,
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
          <div>{event?.title}</div>
          <div>{event?.description}</div>
        </div>
        <div className="flex items-center border-r p-4">
          <div>{eventAssociation.type}</div>
        </div>
        <div className="flex items-center border-r p-4">
          <div>{eventAssociation.id as unknown as string}</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        {isOwner ? (
          <ProjectOwnerAction
            type={eventAssociation.type as string}
            status={eventAssociation.status as string}
            handleRequest={handleRequest}
          />
        ) : (
          <ParticipantAction
            type={eventAssociation.type as string}
            status={eventAssociation.status as string}
            handleRequest={handleRequest}
          />
        )}
      </div>
    </div>
  );
};

export default EventRequestCard;