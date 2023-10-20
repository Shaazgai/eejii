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

export const Medium = () => {
  return (
    <>
      <nav className="bg-white">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link href="#" className="flex h-[72px] w-[215px] items-center">
            <img
              src="/images/foundation_logo.jpg"
              className="h-[72px] w-[215px]"
              alt="foundation Logo"
            />
          </Link>
          <div className="hidden w-full items-center justify-between font-medium md:order-1 md:flex md:w-auto">
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
              <li>
                <button className="flex  w-full items-center justify-between rounded py-2 pl-3 pr-4 font-bold text-gray-900  dark:border-gray-700 dark:text-white dark:hover:bg-gray-700  md:p-0 md:hover:bg-transparent md:hover:text-primary md:dark:hover:bg-transparent">
                  Платформ <ChevronDown className="w-6 pt-1.5" />
                </button>
              </li>
              <li>
                <Link
                  href="/medium"
                  className="block rounded py-2 pl-3 pr-4 font-bold text-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-blue-500 md:p-0 md:hover:bg-transparent md:hover:text-primary md:dark:hover:bg-transparent"
                >
                  Медиа
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block rounded py-2 pl-3 pr-4 font-bold text-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700  md:p-0 md:hover:bg-transparent md:hover:text-primary md:dark:hover:bg-transparent"
                >
                  Бидний тухай
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block rounded py-2 pl-3 pr-4 font-bold text-gray-900  dark:border-gray-700 dark:text-white dark:hover:bg-gray-700  md:p-0 md:hover:bg-transparent md:hover:text-primary md:dark:hover:bg-transparent"
                >
                  Нэвтрэх
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* hidden */}
        <div className="absolute right-64 mt-1 hidden shadow-sm dark:border-gray-600 dark:bg-gray-800 md:bg-white">
          <div className="mx-auto flex h-[202px] w-[525px]">
            <ul className="h-[202px] w-[270px] p-8">
              <li>
                <Link
                  href="#"
                  className="block w-52 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex font-semibold">
                    <img
                      src="/images/projectsIcon.png"
                      alt="Prjects"
                      className="h-[24px] w-[29px]"
                    />
                    <h1 className="w-full pl-3">Төсөл хөтөлбөрүүд</h1>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex font-semibold">
                    {' '}
                    <CalendarHeart className="text-[#9747ff]" />
                    <h1 className="pl-4">Арга хэмжээ</h1>{' '}
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-around font-semibold">
                    <img
                      src="/images/volunteerIcon.png"
                      alt="Volunteer_project"
                    />
                    <h1>Сайн дурын ажил</h1>
                  </div>
                </Link>
              </li>
            </ul>
            <ul className="h-[202px] w-[270px] bg-brand600 p-8">
              <li>
                <Link
                  href="#"
                  className="block  rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex font-semibold">
                    {' '}
                    <img
                      src="/images/supporterIcon.png"
                      alt="supporter image"
                      className="h-[24.44px] w-[26.59px]"
                    />
                    <h1 className="pl-2">Дэмжигч</h1>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex font-semibold">
                    <img
                      src="/images/chairity.png"
                      alt="partner image"
                      className="h-[24.44px] w-[26.59px]"
                    />{' '}
                    <h1 className="pl-2">Хамтрагч</h1>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block w-56 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex font-semibold">
                    <img
                      src="/images/Vector.png"
                      alt="volunteer image"
                      className="h-[24.44px] w-[26.59px]"
                    />
                    <h1 className="w-full pl-3">Сайн дурын ажилтан</h1>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="h-[200vh] w-full bg-[#ffffff]">
        <div className="flex h-screen w-full justify-around pl-20 pr-20">
          <div className="flex h-[1500px] w-[933px] flex-col justify-around">
            <div className="flex justify-around">
              <div className="h-[375px] w-[295px]">
                <img
                  src="/images/media_1.png"
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
                  src="/images/media_2.png"
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
                  src="/images/media_3.png"
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
                  src="/images/media_4.png"
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
                  src="/images/media_5.png"
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
                  src="/images/media_6.png"
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
                  src="/images/media_7.png"
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
                  src="/images/media_8.png"
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
                  src="/images/media_9.png"
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
      <section className="h-64 p-20">
        <div className="flex h-[244px] justify-around">
          <div>
            <img src="/images/proLogo.png" alt="mainLogo" />
          </div>
          <div className="leading-9">
            <h6 className="pb-4 text-xl font-bold">Шуурхай холбоос</h6>
            <Link href="#">
              <ul>Төсөл хөтөлбөрүүд</ul>
            </Link>
            <Link href="#">
              <ul>Арга хэмжээ</ul>
            </Link>
            <Link href="#">
              <ul>Сайн дурын ажил</ul>
            </Link>
            <Link href="#">
              <ul>Медиа</ul>
            </Link>
            <Link href="#">
              <ul>Бидний тухай</ul>
            </Link>
          </div>
          <div className="leading-9">
            <h6 className="pb-4 text-xl font-bold">Үйлчилгээ</h6>
            <Link href="#">
              <ul>Дэмжигч</ul>
            </Link>
            <Link href="#">
              <ul>Хамтрагч</ul>
            </Link>
            <Link href="#">
              <ul>Сайн дурын ажилтан</ul>
            </Link>
          </div>
          <div className="leading-9">
            <h6 className="pb-4 text-xl font-bold">Холбогдох</h6>
            <Link href="#">
              <ul>Сүхбаатар дүүрэг, express tower нэгдүгээр давхар</ul>
            </Link>
            <Link href="#">
              <ul>Монгол улс,Улаанбаатар хот</ul>
            </Link>
            <Link href="#">
              <ul>+975 7714-1001</ul>
            </Link>
            <Link href="#">
              <ul>info@eejii.org</ul>
            </Link>
            <Link href="#">
              <ul>volunteermongolia.com</ul>
            </Link>
          </div>
        </div>
        <div>
          <div className="m-auto flex w-24 items-center justify-between pb-9 pt-20">
            <Link
              href="#"
              className="rounded-full border border-transparent bg-brand400 fill-brand450 p-1.5 text-brand450"
            >
              <Facebook />
            </Link>
            <Link
              href="#"
              className="rounded-full bg-brand400 p-1.5 text-brand450"
            >
              <Instagram />
            </Link>
          </div>

          <div className="h-16 text-center">
            <p>
              Энэхүү сан нь ❤ “ЭЭЖИЙ ЕРТӨНЦ” НҮТББ-ын өмч бөгөөд бүх эрх ©
              хуулиар хамгаалагдсан болно
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
