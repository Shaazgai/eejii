// import { FallbackImage } from '@/components/common/fallback-image';
import VolunteerLayout from '@/components/layout/volunteer-layout';
import EventSlider from '@/components/list/slider/event-slider';
import FundSlider from '@/components/list/slider/fund-slider';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { EventType, FundraisingType } from '@/lib/types';
import { api } from '@/utils/api';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function Index() {
  const { data: events, isLoading: isEventLoading } =
    api.event.getAll.useQuery();
  const { data: fundraisings, isLoading: isFundLoading } =
    api.fundraising.getAll.useQuery();

  return (
    <VolunteerLayout>
      <div className="h-[300px] w-[1500] bg-[#3c888D]">
        <h1 className="hidden">sdsd</h1>
        {/* <FallbackImage
          width={1500}
          height={300}
          className="aspect-video h-[376px]  w-full object-cover object-center"
          alt="bg"
          src={''}
        /> */}
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
              <div className="flex flex-col text-center gap-5">
              <button className="uppercase w-[120px] h-[30px] bg-[#F3C98B] rounded-full text-[16px] ml-20 text-[#3c888D] text-center">LEVEL-1</button>
              <span className="text-center"> 15/20 xp</span>
                  <span>xp status</span>
              <button className="w-[144px] h-[44px] border-solid rounded-full border-[#F3C98B] bg-[#3c888D] ml-16">Дэлгэрэнгүй</button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="-translate-y-10">
          <EventSlider
            events={events as EventType[]}
            isEventLoading={isEventLoading}
          />
          <div className="">
            <Swiper
              className="h-[250px] w-[1300px]"
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: false }}
              scrollbar={{ draggable: false }}
              onSwiper={swiper => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >
              <SwiperSlide className="rounded-xl">
                <h3>Hello world</h3>
                <p>Lets create full...</p>
              </SwiperSlide>
              <SwiperSlide>
                {''}
                <h3>Hello world</h3>
                <p>Lets create full...</p>
              </SwiperSlide>
              <SwiperSlide>
                {' '}
                <h3>Hello world</h3>
                <p>Lets create full...</p>
              </SwiperSlide>
              <SwiperSlide>
                {' '}
                <h3>Hello world</h3>
                <p>Lets create full...</p>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="-translate-y-10">
          <FundSlider
            fundraisings={fundraisings as FundraisingType[]}
            isFundLoading={isFundLoading}
          />
          <div>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              consequuntur ipsam animi sed ex quisquam dolorem sapiente est
              magnam! Nam nobis iusto beatae iure deserunt necessitatibus
              excepturi similique sint vero.
            </h3>
            <p>asdsdsas</p>
          </div>
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
