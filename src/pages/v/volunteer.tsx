import { useState } from 'react';

import VolunteerLayout from '@/components/layout/volunteer-layout';
import EventList from '@/components/list/event-list';
import FundraisingList from '@/components/list/fund-list';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Shell } from '@/components/shells/shell';
import type { EventWithOwner, FundWithOwner } from '@/lib/types';
import { api } from '@/utils/api';
import { ProjectStatus } from '@/lib/db/enums';

const Volunteer = () => {
  const { data: events, isLoading: isEventLoading } = api.event.getAll.useQuery(
    { page: 1, limit: 10, enabled: true, status: ProjectStatus.APPROVED }
  );
  const { data: fundraising, isLoading: isFundLoading } =
    api.fundraising.getAll.useQuery({
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
      title: `Fundraising`,
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
            events={events?.items as unknown as EventWithOwner[]}
            isVolunteer={true}
            isLoading={isEventLoading}
          />
        )}
        {activeIndex === 1 && (
          <FundraisingList
            fundraisings={fundraising?.items as unknown as FundWithOwner[]}
            isLoading={isFundLoading}
          />
        )}
      </Shell>
    </VolunteerLayout>
  );
};

export default Volunteer;
