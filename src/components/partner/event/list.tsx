import type { Event } from '@/lib/db/types';
import type { EventWithOwner } from '@/lib/types';
import { SimpleGrid, Skeleton } from '@mantine/core';
import { EventCard } from './card';

export const EventListPrivate = ({
  events,
  isLoading,
}: {
  events: EventWithOwner[];
  isLoading: boolean;
}) => {
  return (
    <>
      {!isLoading ? (
        <SimpleGrid spacing={20}>
          {events.map((item, i) => (
            <EventCard key={i} event={item as unknown as Event} />
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height={40} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
