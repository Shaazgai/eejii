import { FallbackImage } from '@/components/common/fallback-image';
import VolunteerLayout from '@/components/layout/volunteer-layout';
import EventSlider from '@/components/list/slider/event-slider';
import FundSlider from '@/components/list/slider/fund-slider';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { EventType, FundraisingType } from '@/lib/types';
import { api } from '@/utils/api';

export default function Index() {
  const { data: events, isLoading: isEventLoading } =
    api.event.getAll.useQuery();
  const { data: fundraisings, isLoading: isFundLoading } =
    api.fundraising.getAll.useQuery();

  return (
    <VolunteerLayout>
      <div className="">
        <FallbackImage
          width={1500}
          height={300}
          className="aspect-video h-[300px] w-full object-cover object-center"
          alt="bg"
          src={'/images/spider.jpg'}
        />
      </div>
      <Shell>
        <div className="m-auto -translate-y-20 md:w-[800px]">
          <Card className="">
            <CardHeader className="text-3xl">
              What kind of impact are you looking to make?
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-5">
                <span>I want to</span>
                <Input className="w-48" />
                <span>with</span>
                <Input className="w-48" />
                <Button>Show result</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="-translate-y-10">
          <EventSlider
            events={events as EventType[]}
            isEventLoading={isEventLoading}
          />
        </div>
        <div className="-translate-y-10">
          <FundSlider
            fundraisings={fundraisings as FundraisingType[]}
            isFundLoading={isFundLoading}
          />
        </div>
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
