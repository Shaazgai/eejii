import { useState } from 'react';

import VolunteerLayout from '@/components/layout/volunteer-layout';
import EventList from '@/components/list/event-list';
import ProjectList from '@/components/list/fund-list';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Shell } from '@/components/shells/shell';
import { ProjectStatus } from '@/lib/db/enums';
import type { Event, Project } from '@/lib/types';
import { api } from '@/utils/api';

const Volunteer = () => {
  const { data: events, isLoading: isEventLoading } = api.event.getAll.useQuery(
    { page: 1, limit: 10, enabled: true, status: ProjectStatus.APPROVED }
  );
  const { data: project, isLoading: isFundLoading } =
    api.project.getAll.useQuery({
      page: 1,
      limit: 10,
      enabled: true,
      status: ProjectStatus.APPROVED,
    });

  // console.log(process.env.AWS_PATH);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [
    {
      title: `Event`,
      index: 0,
    },
    {
      title: `Project`,
      index: 1,
    },
  ];
  return (
    <VolunteerLayout>
      <Shell>
        <div>
          <NormalTabs
            tabs={tabs}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
          />
        </div>
        {activeIndex === 0 && (
          <EventList
            events={events?.items as unknown as Event[]}
            isVolunteer={true}
            isLoading={isEventLoading}
          />
        )}
        {activeIndex === 1 && (
          <ProjectList
            projects={project?.items as unknown as Project[]}
            isLoading={isFundLoading}
          />
        )}
      </Shell>
    </VolunteerLayout>
  );
};

export default Volunteer;
