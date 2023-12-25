import { useState } from 'react';

import VolunteerLayout from '@/components/layout/volunteer-layout';
import { EventList } from '@/components/list/event-list';
import { ProjectStatus } from '@/lib/db/enums';
import type { Event } from '@/lib/types';
import { api } from '@/utils/api';

const Volunteer = () => {
  const [page] = useState(1);
  const { data: events, isLoading: isEventLoading } =
    api.event.findAll.useQuery({
      page: page,
      limit: 20,
      enabled: true,
      status: ProjectStatus.APPROVED,
    });

  return (
    <VolunteerLayout>
      <EventList
        events={events?.items as unknown as Event[]}
        isLoading={isEventLoading}
      />
    </VolunteerLayout>
  );
};

export default Volunteer;
