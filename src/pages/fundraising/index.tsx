import 'swiper/css';
import 'swiper/css/navigation';

// import Swiper core and required modules
// import { FallbackImage } from '@/components/common/fallback-image';
// import VolunteerLayout from '@/components/layout/volunteer-layout';
import EventSlider from '@/components/list/slider/event-slider';
import FundSlider from '@/components/list/slider/fund-slider';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ProjectStatus } from '@/lib/db/enums';
import type { EventWithOwner, FundWithOwner } from '@/lib/types';
import { api } from '@/utils/api';
import BasicBaseLayout from '@/components/layout/basic-base-layout';

export default function Index() {
  const { data: events, isLoading: isEventLoading } = api.event.getAll.useQuery(
    { page: 1, limit: 10, enabled: true, status: ProjectStatus.APPROVED }
  );
  const { data: fundraisings, isLoading: isFundLoading } =
    api.fundraising.getAll.useQuery({
      page: 1,
      limit: 10,
      enabled: true,
      status: ProjectStatus.APPROVED,
    });

  return (
    <BasicBaseLayout>
      <div className="h-[376px] w-full bg-[#3c888D]">
        <img
          src="/images/projectss/main.png"
          alt="main"
          className="h-[376px] w-full object-cover"
        />
      </div>
      <Shell>
        <div className="flex space-x-5  pl-12 md:w-full">
          <Card className="h-[180px] w-[830px] -translate-y-20 border-transparent">
            <CardHeader className="text-3xl font-semibold">
              Та ямар төсөл дэмжихийг хүсч байна вэ?
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-5 pl-7 pt-3">
                <Input
                  placeholder="Нэр"
                  required
                  className="h-[48px] w-[270px] rounded-full bg-brand450"
                />
                <Input
                  placeholder="Төлөв сонгох"
                  required
                  className="h-[48px] w-[270px] rounded-full bg-brand450"
                />
                <Button className="h-[44px] w-[144px] bg-primary">
                  Төсөл хайх
                </Button>
              </div>
            </CardContent>
            <div className="pl-0 pr-10 pt-20">
              <CardHeader className="pl-0 text-2xl font-semibold">
                Онцгой төсөл
              </CardHeader>
              <CardContent className="pl-0">
                <div className="flex h-[276px] w-[830px] flex-col items-center justify-around bg-[url('/images/projectss/specialBG.png')] pb-12 pt-12 text-brand450">
                  <h2 className="text-lg font-semibold">
                    'Mother project Hospice'
                  </h2>
                  <h1 className="pb-12 text-3xl font-semibold">
                    "Mother" Hospice and Palliative Care Center
                  </h1>
                  <Button className="h-[44px] w-[144px] rounded-none bg-primary">
                    Хандив өгөх
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
          <Card className="h-[600px] w-[345px] -translate-y-20 border-transparent bg-primary">
            Ad space 5
          </Card>
        </div>
        <div className="-translate-y-10">
          <EventSlider
            events={events?.items as unknown as EventWithOwner[]}
            isEventLoading={isEventLoading}
          />
        </div>
        <div className="-translate-y-10">
          <FundSlider
            fundraisings={fundraisings?.items as unknown as FundWithOwner[]}
            isFundLoading={isFundLoading}
          />
        </div>
      </Shell>
    </BasicBaseLayout>
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
