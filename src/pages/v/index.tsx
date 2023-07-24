import VolunteerLayout from '@/components/layout/volunteer-layout';
import EventList from '@/components/list/event-list';
import FundraisingList from '@/components/list/fund-list';
import { Shell } from '@/components/shells/shell';
import type { EventType, FundraisingType } from '@/lib/types';
import { api } from '@/utils/api';

export default function Index() {
  const { data: events, isLoading: isEventLoading } =
    api.event.getAll.useQuery();
  const { data: fundraisings, isLoading: isFundLoading } =
    api.fundraising.getAll.useQuery();
  return (
    <VolunteerLayout>
      <Shell>
        <div>
          <EventList
            events={events?.slice(0, 3) as EventType[]}
            isLoading={isEventLoading}
          />
        </div>
        <div>
          <FundraisingList
            fundraisings={fundraisings?.slice(0, 3) as FundraisingType[]}
            isLoading={isFundLoading}
          />
        </div>
        {/* <div>
          <EventList />
        </div> */}
      </Shell>
    </VolunteerLayout>
  );
}

// export const getServerSideProps: GetServerSideProps = async context => {
//   const events = await api.event.getAll.useQuery();
//   const fundraising = await api.fundraising.getAll.useQuery();

//   return {
//     props: {
//       events: null,
//     },
//   };
// };
