import React from 'react';
import Link from 'next/link';
import {
  Facebook,
  MoveUpRight,
  Instagram,
  ChevronDown,
  CalendarHeart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MoveUpRight } from 'lucide-react';
import Link from 'next/link';

export const Medium = () => {
  return (
    <>
      <section className="h-[200vh] w-full bg-[#ffffff]">
        <div className="flex h-screen w-full justify-around pl-20 pr-20">
          <div className="flex h-[1500px] w-[933px] flex-col justify-around">
            <div className="flex justify-around">
              <div className="h-[375px] w-[295px]">
                <img
                  src="/images/media/media_1.png"
                  alt="mediaIMG"
                  className="h-[188px] w-[295px]"
                />
                <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                  12 сарын 20,2022
                </Button>
                <h1 className="h-12 pt-2 font-bold">
                  Түлэнхийн төвийн хүүхдийн тоглоосмын өрөөг тохижууллаа
                </h1>
                <p className="font-sm pt-3 text-[#807e7e]">
                  Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн төвийн
                  Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн тоглоомын өрөөг
                  тохижуулах...
                </p>
                <Link
                  href="/mediums"
                  className="m-auto flex pt-3 text-[20px] font-bold text-primary"
                >
                  Унших{' '}
                  <span className="relative left-2 top-2">
                    <MoveUpRight size="21" />
                  </span>
                </Link>
              </div>
              <div className="h-[375px] w-[295px]">
                <img
                  src="/images/media/media_2.png"
                  alt="mediaIMG"
                  className="h-[188px] w-[295px]"
                />
                <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                  12 сарын 20,2022
                </Button>
                <h1 className="h-12 pt-2 font-bold">
                  Гэмтэл Согог Судлалын Үндэсний төв болон
                </h1>
                <p className="font-sm pt-3 text-[#807e7e]">
                  Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн төвийн
                  Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн тоглоомын өрөөг
                  тохижуулах...
                </p>
                <Link
                  href="#"
                  className="m-auto flex pt-3 text-[20px] font-bold text-primary"
                >
                  Унших{' '}
                  <span className="relative left-2 top-2">
                    <MoveUpRight size="21" />
                  </span>
                </Link>
              </div>
              <div className="h-[375px] w-[295px]">
                <img
                  src="/images/media/media_3.png"
                  alt="mediaIMG"
                  className="h-[188px] w-[295px]"
                />
                <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                  12 сарын 20,2022
                </Button>
                <h1 className="h-12 pt-2 font-bold">
                  "Хайр дүүрэн цүнх" сайн үйлсийн аянд хандив ирлээ
                </h1>
                <p className="font-sm pt-3 text-[#807e7e]">
                  Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн төвийн
                  Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн тоглоомын өрөөг
                  тохижуулах...
                </p>
                <Link
                  href="#"
                  className="m-auto flex pt-3 text-[20px] font-bold text-primary"
                >
                  Унших{' '}
                  <span className="relative left-2 top-2">
                    <MoveUpRight size="21" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex justify-around">
              <div className="h-[375px] w-[295px]">
                <img
                  src="/images/media/media_4.png"
                  alt="mediaIMG"
                  className="h-[188px] w-[295px]"
                />
                <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                  12 сарын 20,2022
                </Button>
                <h1 className="h-12 pt-2 font-bold">12 сарын шидтэнүүд</h1>
                <p className="font-sm pt-3 text-[#807e7e]">
                  Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн төвийн
                  Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн тоглоомын өрөөг
                  тохижуулах...
                </p>
                <Link
                  href="#"
                  className="m-auto flex pt-3 text-[20px] font-bold text-primary"
                >
                  Унших{' '}
                  <span className="relative left-2 top-2">
                    <MoveUpRight size="21" />
                  </span>
                </Link>
              </div>
              <div className="h-[375px] w-[295px]">
                <img
                  src="/images/media/media_5.png"
                  alt="mediaIMG"
                  className="h-[188px] w-[295px]"
                />
                <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                  12 сарын 20,2022
                </Button>
                <h1 className="h-12 pt-2 font-bold">Playtime Festival 2022</h1>
                <p className="font-sm pt-3 text-[#807e7e]">
                  Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн төвийн
                  Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн тоглоомын өрөөг
                  тохижуулах...
                </p>
                <Link
                  href="#"
                  className="m-auto flex pt-3 text-[20px] font-bold text-primary"
                >
                  Унших{' '}
                  <span className="relative left-2 top-2">
                    <MoveUpRight size="21" />
                  </span>
                </Link>
              </div>
              <div className="h-[375px] w-[295px]">
                <img
                  src="/images/media/media_6.png"
                  alt="mediaIMG"
                  className="h-[188px] w-[295px]"
                />
                <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                  12 сарын 20,2022
                </Button>
                <h1 className="h-12 pt-2 font-bold">
                  Lotus children centre Бадамлянхуа хүүхдийн төвд очлоо
                </h1>
                <p className="font-sm pt-3 text-[#807e7e]">
                  Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн төвийн
                  Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн тоглоомын өрөөг
                  тохижуулах...
                </p>
                <Link
                  href="#"
                  className="m-auto flex pt-3 text-[20px] font-bold text-primary"
                >
                  Унших{' '}
                  <span className="relative left-2 top-2">
                    <MoveUpRight size="21" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex justify-around">
              <div className="h-[375px] w-[295px]">
                <img
                  src="/images/media/media_7.png"
                  alt="mediaIMG"
                  className="h-[188px] w-[295px]"
                />
                <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                  12 сарын 20,2022
                </Button>
                <h1 className="h-12 pt-2 font-bold">
                  Рояаль Олон улсын их сургууль платформын анхдагч
                </h1>
                <p className="pt-3 text-[#807e7e]">
                  Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн төвийн
                  Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн тоглоомын өрөөг
                  тохижуулах...
                </p>
                <Link
                  href="#"
                  className="m-auto flex pt-3 text-[20px] font-bold text-primary"
                >
                  Унших{' '}
                  <span className="relative left-2 top-2">
                    <MoveUpRight size="21" />
                  </span>
                </Link>
              </div>
              <div className="h-[375px] w-[295px]">
                <img
                  src="/images/media/media_8.png"
                  alt="mediaIMG"
                  className="h-[188px] w-[295px]"
                />
                <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                  12 сарын 20,2022
                </Button>
                <h1 className="h-12 pt-2 font-bold">
                  Бадамлянхуа асрамжийн төв анхны түнш байгууллага боллоо
                </h1>
                <p className="pt-3 text-[#807e7e]">
                  Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн төвийн
                  Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн тоглоомын өрөөг
                  тохижуулах...
                </p>
                <Link
                  href="#"
                  className="m-auto flex pt-3 text-[20px] font-bold text-primary"
                >
                  Унших{' '}
                  <span className="relative left-2 top-2">
                    <MoveUpRight size="21" />
                  </span>
                </Link>
              </div>
              <div className="h-[375px] w-[295px]">
                <img
                  src="/images/media/media_9.png"
                  alt="mediaIMG"
                  className="h-[188px] w-[295px]"
                />
                <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                  12 сарын 20,2022
                </Button>
                <h1 className="h-12 pt-2 font-bold">
                  Be a Good Human арга хэмжээ амжилттай зохион байгуулагдлаа
                </h1>
                <p className="pt-3 text-[#807e7e]">
                  Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн төвийн
                  Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн тоглоомын өрөөг
                  тохижуулах...
                </p>
                <Link
                  href="#"
                  className="m-auto flex pt-3 text-[20px] font-bold text-primary"
                >
                  Унших{' '}
                  <span className="relative left-2 top-2">
                    <MoveUpRight size="21" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-20  h-[289px] w-[367px]">
            <div className="flex h-[289px] w-[287px] flex-col justify-around">
              <h1 className="text-3xl">Мэдээ</h1>
              <Link href="/">
                <h6 className="h-[36px] border-b border-brand10 text-xl font-semibold">
                  Сургалт
                </h6>
              </Link>

              <Link href="/">
                {' '}
                <h6 className="h-[36px] border-b border-brand10 text-xl font-semibold">
                  Шинэ төсөл
                </h6>
              </Link>

              <Link href="/">
                {' '}
                <h6 className="h-[36px] border-b border-brand10 text-xl font-semibold">
                  Сайн дурын ажил
                </h6>
              </Link>
              <h6 className="h-[36px] text-xl font-semibold">Чөлөөт цаг</h6>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
