import { Button } from '@/components/ui/button';
import type { EventAssociationWithEvent } from '@/lib/types';
import { api } from '@/utils/api';

const EventRequestCard = ({
  eventAssociation,
}: {
  eventAssociation: EventAssociationWithEvent;
}) => {
  const event = eventAssociation.Event;
  const { mutate } = api.eventAssociation.handleEventRequest.useMutation({
    onSuccess: res => console.log(res),
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
        <div className="flex flex-col p-4">
          <div>{event?.title}</div>
          <div>{event?.description}</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        {eventAssociation.type === 'invitation' &&
          eventAssociation.status === 'pending' && (
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

export default EventRequestCard;
