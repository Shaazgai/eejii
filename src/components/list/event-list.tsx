import type { EventType } from '@/lib/types';

import EventCard from '../card/event-card';

const EventList = ({
  events,
  isLoading,
}: {
  events: EventType[];
  isLoading: boolean;
}) => {
  return (
    <div>
      {isLoading && '...Loading'}
      <div className="mb-5 border-b pb-2 font-bold">
        <h2 className=" text-2xl">Events</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {!isLoading &&
          events?.length > 0 &&
          events.map(event => {
            return <EventCard key={event.id} event={event} />;
          })}
      </div>
    </div>
  );
};

export default EventList;
