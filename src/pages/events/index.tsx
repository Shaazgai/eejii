import EventCardPublic from '@/components/card/event-card';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { ProjectStatus } from '@/lib/db/enums';
import type { EventWithOwner } from '@/lib/types';
import { api } from '@/utils/api';

export default function Index() {
  const { data: events, isLoading: isEventLoading } = api.event.getAll.useQuery(
    { page: 1, limit: 10, enabled: true, status: ProjectStatus.APPROVED }
  );
  return (
    <BasicBaseLayout>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:md:grid-cols-3">
          {!isEventLoading &&
            events?.items?.map((event, index) => (
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
