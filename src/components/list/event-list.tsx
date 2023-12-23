import type { Event } from '@/lib/types';

import EventCard from '../card/event-card';

const EventList = ({
  events,
  isLoading,
  isVolunteer,
}: {
  events: Event[];
  isLoading: boolean;
  isVolunteer: boolean;
}) => {
  return (
    <div>
      {isLoading && '...Loading'}
      <div className="mb-5 border-b pb-2 font-bold">
        <h2 className=" text-2xl">Events</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!isLoading &&
          events?.length > 0 &&
          events.map((event, i) => {
            return (
              <EventCard
                key={i}
                event={event as Event}
                isVolunteer={isVolunteer}
              />
            );
          })}
      </div>
    </div>
  );
};

export default EventList;
