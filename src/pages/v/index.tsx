// import { FallbackImage } from '@/components/common/fallback-image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import Swiper core and required modules
import { FallbackImage } from '@/components/common/fallback-image';
import VolunteerLayout from '@/components/layout/volunteer-layout';
import EventSlider from '@/components/list/slider/event-slider';
import FundSlider from '@/components/list/slider/fund-slider';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ProjectStatus } from '@/lib/db/enums';
import type { Event, Project } from '@/lib/types';
import { api } from '@/utils/api';

export default function Index() {
  const { data: events, isLoading: isEventLoading } = api.event.getAll.useQuery(
    { page: 1, limit: 10, enabled: true, status: ProjectStatus.APPROVED }
  );
  const { data: projects, isLoading: isFundLoading } =
    api.project.getAll.useQuery({
      page: 1,
      limit: 10,
      enabled: true,
      status: ProjectStatus.APPROVED,
    });

  return (
    <VolunteerLayout>
      <div className="h-[300px] w-[1500] bg-primary">
        <h1 className="hidden">sdsd</h1>
        <FallbackImage
          width={1500}
          height={300}
          className="aspect-video h-[376px]  w-full object-cover object-center"
          alt="bg"
          src={''}
        />
      </div>
      <Shell>
        <div className="flex space-x-48   md:w-full ">
          <Card className="h-40 -translate-y-20">
            <CardHeader className="text-3xl">
              Та ямар нөлөө үзүүлэхийг хүсч байна вэ?
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-5">
                <span>Үйлдэл сонгох</span>
                <Input className="w-48" />
                <span>Төрөл сонгох</span>
                <Input className="w-48" />
                <Button className="bg-[#3c888D]">Төсөл хайх</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="h-[313px] -translate-y-40">
            <CardHeader>
              <h1 className="h-16 w-[272px]">end volunteer level-iin zurag</h1>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5 text-center">
                <button className="ml-20 h-[30px] w-[120px] rounded-full bg-[#F3C98B] text-center text-[16px] uppercase text-[#3c888D]">
                  LEVEL-1
                </button>
                <span className="text-center"> 15/20 xp</span>
                <span>xp status</span>
                <button className="ml-16 h-[44px] w-[144px] rounded-full border-solid border-[#F3C98B] bg-[#3c888D]">
                  Дэлгэрэнгүй
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="-translate-y-10">
          <EventSlider
            events={events?.items as unknown as Event[]}
            isEventLoading={isEventLoading}
          />
        </div>
        <div className="-translate-y-10">
          <FundSlider
            projects={projects?.items as unknown as Project[]}
            isFundLoading={isFundLoading}
          />
        </div>
      </Shell>
    </VolunteerLayout>
  );
}

// export const getServerSideProps: GetServerSideProps = async context => {
//   const events = await api.event.getAll.useQuery();
//   const project = await api.project.getAll.useQuery();

//   return {
//     props: {
//       events: null,
//     },
//   };
// };
