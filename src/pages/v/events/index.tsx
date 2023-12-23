import { useState } from 'react';

import VolunteerLayout from '@/components/layout/volunteer-layout';
import EventList from '@/components/list/event-list';
import { Shell } from '@/components/shells/shell';
import { ProjectStatus } from '@/lib/db/enums';
import type { Event } from '@/lib/types';
import { api } from '@/utils/api';

const Volunteer = () => {
  const [page] = useState(1);
  const { data: events, isLoading: isEventLoading } = api.event.getAll.useQuery(
    {
      page: page,
      limit: 20,
      enabled: true,
      status: ProjectStatus.APPROVED,
    }
  );

  return (
    <VolunteerLayout>
      <Shell>
        {/* <div> */}
        {/*   <NormalTabs */}
        {/*     tabs={tabs} */}
        {/*     setActiveIndex={setActiveIndex} */}
        {/*     activeIndex={activeIndex} */}
        {/*   /> */}
        {/* </div> */}
        <EventList
          isVolunteer={true}
          events={events?.items as unknown as Event[]}
          isLoading={isEventLoading}
        />
        {/* {activeIndex === 1 && ( */}
        {/*   <ProjectList */}
        {/*     projects={project as unknown as Project[]} */}
        {/*     isLoading={isFundLoading} */}
        {/*   /> */}
        {/* )} */}
      </Shell>
      <h1 className="h-[454px] w-full bg-primary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
        officiis perspiciatis cupiditate velit enim aperiam qui error voluptas,
        voluptate fuga accusantium aliquid laudantium magni quo optio aliquam.
        Dicta, repudiandae eligendi.
      </h1>
    </VolunteerLayout>
  );
};

export default Volunteer;
