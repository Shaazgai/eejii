import EventCardPublic from '@/components/card/event-card';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import type { EventWithOwner } from '@/lib/types';
import { api } from '@/utils/api';

export default function Index() {
  const { data: events, isFetching } = api.event.getAll.useQuery();
  console.log('🚀 ~ file: index.tsx:7 ~ index ~ isFetching:', isFetching);
  console.log('🚀 ~ file: index.tsx:7 ~ index ~ data:', events);
  return (
    <BasicBaseLayout>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:md:grid-cols-3">
          {events?.map((event, index) => (
            <EventCardPublic
              event={event as unknown as EventWithOwner}
              key={index}
              isVolunteer={false}
            />
          ))}
        </div>
      </div>
    </BasicBaseLayout>
  );
}
