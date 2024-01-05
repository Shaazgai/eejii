import { Button } from '@/components/ui/button';
import { api } from '@/utils/api';
import { SimpleGrid, BackgroundImage } from '@mantine/core';
import { MoveUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Banner() {
  const { data: banner1 } = api.banner.findAll.useQuery({
    positionCode: 'home_left_top',
    limit: 1,
  });
  const HomeLeft = banner1
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner1[0]?.path
    : 'null';
  const { data: banner2 } = api.banner.findAll.useQuery({
    positionCode: 'home_right_top',
    limit: 1,
  });
  const HomeRight = banner2
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner2[0]?.path
    : 'null';

  const { data: banner3 } = api.banner.findAll.useQuery({
    positionCode: 'home_in_right',
    limit: 1,
  });
  const HomeInRight = banner3
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner3[0]?.path
    : 'null';
  const { data: banner4 } = api.banner.findAll.useQuery({
    positionCode: 'home_left_middle',
    limit: 1,
  });
  const HomeMiddleLeft = banner4
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner4[0]?.path
    : 'null';
  const { data: banner5 } = api.banner.findAll.useQuery({
    positionCode: 'home_right_middle',
    limit: 1,
  });
  const HomeMiddleRight = banner5
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner5[0]?.path
    : 'null';

  const { data: banner6 } = api.banner.findAll.useQuery({
    positionCode: 'home_heart_banner',
    limit: 1,
  });
  const HomeHeart = banner6
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner6[0]?.path
    : 'null';
  return (
    <section className="w-full bg-white p-16 text-center">
      <div className="w-full">
        <div>
          <h1 className="h-24 font-serif text-4xl font-extrabold text-primaryDark">
            Хамтдаа <br /> хайр дүүрэн ертөнцийг бүтээе
          </h1>
          <p className="text-xl">
            Монгол дахь хүмүүнлэгийн үйл ажиллагаа <br /> болон сайн дурынхныг
            дэмжих сан
          </p>
          <h2 className="pt-2 text-xl font-bold uppercase text-primary">
            All in one
          </h2>
        </div>
        <SimpleGrid
          cols={{ base: 1, md: 3, lg: 5 }}
          className="flex  w-full items-end justify-around"
        >
          <div className="flex w-full h-[434.64px] flex-col justify-between">
            <BackgroundImage src={HomeLeft}>
              <div className="flex h-[299.64px] flex-col items-start justify-center bg-cover pl-3 text-start">
                <h4 className="h-[46px] w-[73px] text-3xl text-[34px] font-bold text-[#ffffff] ">
                  55%
                </h4>
                <p className="h-[94px] w-[201px] text-[16px] text-[#FFFCF9] ">
                  Манай нийт <br /> оролцогчдын 55 хувийг <br /> нь сайн дурын
                  ажилчид эзэлж байна
                </p>
                <Link href="#" className="relative top-8">
                  <Button className="flex h-[58px] w-[201px] justify-between rounded-3xl border-transparent bg-brand40 text-[12px] font-semibold text-white hover:bg-brand40">
                    Бидэнтэй нэгдэх
                    <span className="h-[31.5px] w-[30.75px] rounded-full border border-transparent bg-brand800 pl-[2px] pt-[2.5px]">
                      <MoveUpRight />
                    </span>
                  </Button>
                </Link>
              </div>
            </BackgroundImage>
            <div className="flex h-[119px]  items-center justify-center rounded-3xl bg-[#1b2b2c]">
              {/* <Check className=" bg-primary rounded-full w-[55px] h-[55px] text-white"/> */}
              <img
                src="/images/homie/Checkmark.png"
                alt="chekMarkIMG"
                className="h-[55px] w-[55px]"
              />
              <h1 className="pl-2 font-bold text-white">Be a good Human</h1>
            </div>
          </div>
          <BackgroundImage src={HomeMiddleLeft}>
            <div className="h-[297.61px] bg-cover">
              <h6 className="relative left-4 top-52 h-[57px] w-[173px] text-[22px] font-bold text-white">
                Нийт 20+ cайн дурын ажлууд
              </h6>
            </div>
          </BackgroundImage>

          <div className="flex h-[235px]  flex-col justify-around rounded-3xl border bg-[#e8e8e8] pt-7">
            <p className="h-[72px] w-[201px]">
              Бид нийт 4.819.065,00 төгрөгийн хандив цуглуулжээ
            </p>
            <Button className="ml-2 flex h-[58px]  justify-between rounded-3xl border-transparent bg-[#cacaca] text-[12px] font-bold text-[#000000] hover:text-white">
              Хандив өгөх
              <span className="h-[31.5px] w-[30.75px] rounded-full border border-transparent bg-[#000000] pl-[2px] pt-[2.5px] text-white">
                <MoveUpRight />
              </span>
            </Button>
          </div>
          <BackgroundImage src={HomeMiddleRight}>
            <div className="h-[297.61px] bg-cover">
              <h6 className="relative left-4 top-52 h-[57px] w-[173px] text-start text-[22px] font-bold text-white">
                Нийт 30+ төсөл хөтөлбөрүүд
              </h6>
            </div>
          </BackgroundImage>
          <div className="flex h-[434.64px] flex-col justify-between">
            <BackgroundImage src={HomeRight}>
              <div className="flex h-[299.64px]  flex-col items-start justify-center bg-cover pl-3 text-start">
                <img
                  src={HomeInRight}
                  alt="suppIMG"
                  className="h-[94px] w-[191px]"
                />
                <p className="flex h-[94px]  flex-col justify-center text-[16px] text-[#39462a] ">
                  энэ сард нийт 3 төсөл шинээр нэмэгдлээ
                </p>
                <Link href="#" className="relative top-2">
                  <Button className="flex h-[58px] w-[201px] justify-between rounded-3xl border-transparent bg-brand950 text-[12px] font-bold text-brand400 hover:bg-brand950">
                    Дэлгэрэнгүй
                    <span className="h-[31.5px] w-[30.75px] rounded-full border border-transparent bg-brand400 pl-[2px] pt-[2.5px] text-brand800">
                      <MoveUpRight />
                    </span>
                  </Button>
                </Link>
              </div>
            </BackgroundImage>

            <div className="flex h-[119px]  items-center justify-center rounded-3xl bg-[#245255]">
              {/* <Check className=" bg-primary rounded-full w-[55px] h-[55px] text-white"/> */}
              <img
                src={HomeHeart}
                alt="heartIMG"
                className="h-[55px] w-[55px]"
              />
              <h1 className="pl-2 font-bold text-brand800">
                Be someone's <br /> hope today
              </h1>
            </div>
          </div>
        </SimpleGrid>
      </div>
    </section>
  );
}
