import { useState } from 'react';

import VolunteerLayout from '@/components/layout/volunteer-layout';
import EventList from '@/components/list/event-list';
import { Shell } from '@/components/shells/shell';
import type { EventWithOwner } from '@/lib/types';
import { api } from '@/utils/api';
import { ProjectStatus } from '@/lib/db/enums';

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
          events={events?.items as unknown as EventWithOwner[]}
          isLoading={isEventLoading}
        />
        {/* {activeIndex === 1 && ( */}
        {/*   <FundraisingList */}
        {/*     fundraisings={fundraising as unknown as FundWithOwner[]} */}
        {/*     isLoading={isFundLoading} */}
        {/*   /> */}
        {/* )} */}
      </Shell>
    </VolunteerLayout>
  );
};

export default Volunteer;
