import EventCard from '@/components/card/manage/event-card';
import ManageProjectsHeading from '@/components/layout/heading/manage-projects-heading';
import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';
import type { Event } from '@/lib/db/types';
import { api } from '@/utils/api';

export default function ManageProjects() {
  const { data: events, isLoading: isEventLoading } =
    api.event.getMyEvents.useQuery();

  return (
    <PartnerLayout>
      <Shell variant="sidebar" className="px-10">
        <ManageProjectsHeading />
        {!isEventLoading
          ? events?.map((event, index) => (
              <EventCard key={index} event={event as unknown as Event} />
            ))
          : '..loading'}
      </Shell>
    </PartnerLayout>
  );
}
