import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function Banner() {
  return (
    <section className="h-screen w-full bg-white p-16 text-center">
      <div className="h-screen w-full">
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
        <div className="flex h-[434.64px]  w-full items-end justify-around">
          <div className="flex h-[434.64px] flex-col justify-between">
            {/* <div className="h-[299.64px] w-[222.75px] border2 bg-primary rounded-3xl">
              <h4 className="w-[73px] h-[46px] text-[#ffffff] text-3xl font-bold">55%</h4>
              <p className="w-[201px] h-[94px] text-[16px] text-[#c4dbdd]">Манай нийт оролцогчдын 55 хувийг нь сайн дурын ажилчид эзэлж байна</p>
          </div>  */}
            <div className="flex h-[299.64px] w-[222.75px] flex-col items-start justify-center bg-[url('/images/homie/folderLeft.png')] bg-cover pl-3 text-start">
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
            <div className="flex h-[119px] w-[220px] items-center justify-center rounded-3xl bg-[#1b2b2c]">
              {/* <Check className=" bg-primary rounded-full w-[55px] h-[55px] text-white"/> */}
              <img
                src="/images/homie/Checkmark.png"
                alt="chekMarkIMG"
                className="h-[55px] w-[55px]"
              />
              <h1 className="pl-2 font-bold text-white">Be a good Human</h1>
            </div>
          </div>
          <div className="h-[297.61px] w-[220px] bg-[url('/images/homie/folderLeftIMG.png')] bg-cover">
            <h6 className="relative left-4 top-52 h-[57px] w-[173px] text-[22px] font-bold text-white">
              Нийт 20+ cайн дурын ажлууд
            </h6>
          </div>
          <div className="flex h-[235px] w-[220px] flex-col justify-around rounded-3xl border bg-[#e8e8e8] pt-7">
            <p className="h-[72px] w-[201px]">
              Бид нийт 4.819.065,00 төгрөгийн хандив цуглуулжээ
            </p>
            <Button className="ml-2 flex h-[58px] w-[201px] justify-between rounded-3xl border-transparent bg-[#cacaca] text-[12px] font-bold text-[#000000] hover:text-white">
              Хандив өгөх
              <span className="h-[31.5px] w-[30.75px] rounded-full border border-transparent bg-[#000000] pl-[2px] pt-[2.5px] text-white">
                <MoveUpRight />
              </span>
            </Button>
          </div>
          <div className="h-[297.61px] w-[220px] bg-[url('/images/homie/folderRightIMG.png')] bg-cover">
            <h6 className="relative left-4 top-52 h-[57px] w-[173px] text-start text-[22px] font-bold text-white">
              Нийт 30+ төсөл хөтөлбөрүүд
            </h6>
          </div>
          <div className="flex h-[434.64px] flex-col justify-between">
            <div className="flex h-[299.64px] w-[222.75px] flex-col items-start justify-center bg-[url('/images/homie/folderRight.png')] bg-cover pl-3 text-start">
              <img
                src="/images/homie/folderINimg.png"
                alt="suppIMG"
                className="h-[94px] w-[191px]"
              />
              <p className="flex h-[94px] w-[201px] flex-col justify-center text-[16px] text-[#39462a] ">
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
            <div className="flex h-[119px] w-[220px] items-center justify-center rounded-3xl bg-[#245255]">
              {/* <Check className=" bg-primary rounded-full w-[55px] h-[55px] text-white"/> */}
              <img
                src="/images/homie/Heart.png"
                alt="heartIMG"
                className="h-[55px] w-[55px]"
              />
              <h1 className="pl-2 font-bold text-brand800">
                Be someone's <br /> hope today
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
