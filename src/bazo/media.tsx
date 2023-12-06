import { Button } from '@/components/ui/button';
import { MoveUpRight } from 'lucide-react';
import Link from 'next/link';

export const Medium = () => {
  return (
    <>
      <section className=" h-[280vh] w-full bg-[#ffffff]">
        <div className="flex h-screen w-full justify-around pl-16 pr-16">
          <div className="flex h-[1700px] w-[933px] flex-col justify-around pt-7">
            <div className="h-[64px] w-[924px] bg-primary">
              {/* search end type */}
            </div>
            <div className="pl-5">
              <h5 className="h-[32px] w-[175px] border-b-2 border-primary text-center text-xl font-semibold uppercase">
                Онцлох мэдээ
              </h5>
            </div>
            <div className="flex flex-col justify-around">
              <div className="flex h-[500px] justify-around">
                <div className="h-[415px] w-[295px]">
                  <img
                    src="/images/media/media_1.png"
                    alt="mediaIMG"
                    className="h-[188px] w-[295px]"
                  />
                  <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                    12 сарын 20,2022
                  </Button>
                  <div className="flex h-6 w-[208px] pt-3">
                    <img
                      src="/images/media/eventLogo.png"
                      alt="eventLogo"
                      className="h-7 w-7"
                    />
                    <h2 className="pl-2 text-brand30">By Mother eart NGO</h2>
                  </div>
                  <h1 className="h-12 pt-6 font-bold">
                    Түлэнхийн төвийн хүүхдийн тоглоосмын өрөөг тохижууллаа
                  </h1>
                  <p className="font-sm pt-6 text-[#807e7e]">
                    Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн
                    төвийн Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн
                    тоглоомын өрөөг тохижуулах...
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

                <div className="h-[415px] w-[295px]">
                  <img
                    src="/images/media/media_2.png"
                    alt="mediaIMG"
                    className="h-[188px] w-[295px]"
                  />
                  <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                    12 сарын 20,2022
                  </Button>
                  <div className="flex h-6 w-[208px] pt-3">
                    <img
                      src="/images/media/eventLogo.png"
                      alt="eventLogo"
                      className="h-7 w-7"
                    />
                    <h2 className="pl-2 text-brand30">By Mother eart NGO</h2>
                  </div>
                  <h1 className="h-12 pt-6 font-bold">
                    Гэмтэл Согог Судлалын Үндэсний төв болон
                  </h1>
                  <p className="font-sm pt-6 text-[#807e7e]">
                    Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн
                    төвийн Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн
                    тоглоомын өрөөг тохижуулах...
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
                <div className="h-[415px] w-[295px]">
                  <img
                    src="/images/media/media_3.png"
                    alt="mediaIMG"
                    className="h-[188px] w-[295px]"
                  />
                  <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                    12 сарын 20,2022
                  </Button>
                  <div className="flex h-6 w-[208px] pt-3">
                    <img
                      src="/images/media/eventLogo.png"
                      alt="eventLogo"
                      className="h-7 w-7"
                    />
                    <h2 className="pl-2 text-brand30">By Mother eart NGO</h2>
                  </div>
                  <h1 className="h-12 pt-6 font-bold">
                    "Хайр дүүрэн цүнх" сайн үйлсийн аянд хандив ирлээ
                  </h1>
                  <p className="font-sm pt-6 text-[#807e7e]">
                    Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн
                    төвийн Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн
                    тоглоомын өрөөг тохижуулах...
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
              <div className="h-[142px] w-[968px] bg-primary">
                {/* search end type */}
              </div>
              <div className="pl-5">
                <h5 className="flex h-[52px]  w-[175px] items-end border-b-2 border-primary pb-2 pl-4 text-center text-xl font-semibold uppercase">
                  Өдөр тутам
                </h5>
              </div>
              <div className="flex justify-around">
                <div className="h-[415px] w-[295px] pt-12">
                  <img
                    src="/images/media/media_4.png"
                    alt="mediaIMG"
                    className="h-[188px] w-[295px]"
                  />
                  <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                    12 сарын 20,2022
                  </Button>
                  <div className="flex h-6 w-[208px] pt-3">
                    <img
                      src="/images/media/eventLogo.png"
                      alt="eventLogo"
                      className="h-7 w-7"
                    />
                    <h2 className="pl-2 text-brand30">By Mother eart NGO</h2>
                  </div>
                  <h1 className="h-12 pt-6 font-bold">12 сарын шидтэнүүд</h1>
                  <p className="font-sm pt-6 text-[#807e7e]">
                    Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн
                    төвийн Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн
                    тоглоомын өрөөг тохижуулах...
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
                <div className="h-[415px] w-[295px] pt-12">
                  <img
                    src="/images/media/media_5.png"
                    alt="mediaIMG"
                    className="h-[188px] w-[295px]"
                  />
                  <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                    12 сарын 20,2022
                  </Button>
                  <div className="flex h-6 w-[208px] pt-3">
                    <img
                      src="/images/media/eventLogo.png"
                      alt="eventLogo"
                      className="h-7 w-7"
                    />
                    <h2 className="pl-2 text-brand30">By Mother eart NGO</h2>
                  </div>
                  <h1 className="h-12 pt-6 font-bold">
                    Playtime Festival 2022
                  </h1>
                  <p className="font-sm pt-6 text-[#807e7e]">
                    Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн
                    төвийн Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн
                    тоглоомын өрөөг тохижуулах...
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
                <div className="h-[415px] w-[295px] pt-12">
                  <img
                    src="/images/media/media_6.png"
                    alt="mediaIMG"
                    className="h-[188px] w-[295px]"
                  />
                  <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                    12 сарын 20,2022
                  </Button>
                  <div className="flex h-6 w-[208px] pt-3">
                    <img
                      src="/images/media/eventLogo.png"
                      alt="eventLogo"
                      className="h-7 w-7"
                    />
                    <h2 className="pl-2 text-brand30">By Mother eart NGO</h2>
                  </div>
                  <h1 className="h-12 pt-6 font-bold">
                    Lotus children centre Бадамлянхуа хүүхдийн төвд очлоо
                  </h1>
                  <p className="font-sm pt-6 text-[#807e7e]">
                    Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн
                    төвийн Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн
                    тоглоомын өрөөг тохижуулах...
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
                <div className="h-[415px] w-[295px] pt-36">
                  <img
                    src="/images/media/media_7.png"
                    alt="mediaIMG"
                    className="h-[188px] w-[295px]"
                  />
                  <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                    12 сарын 20,2022
                  </Button>
                  <div className="flex h-6 w-[208px] pt-3">
                    <img
                      src="/images/media/eventLogo.png"
                      alt="eventLogo"
                      className="h-7 w-7"
                    />
                    <h2 className="pl-2 text-brand30">By Mother eart NGO</h2>
                  </div>
                  <h1 className="h-12 pt-6 font-bold">
                    Рояаль Олон улсын их сургууль платформын анхдагч
                  </h1>
                  <p className="pt-8 text-[#807e7e]">
                    Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн
                    төвийн Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн
                    тоглоомын өрөөг тохижуулах...
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
                <div className="h-[415px] w-[295px] pt-36">
                  <img
                    src="/images/media/media_8.png"
                    alt="mediaIMG"
                    className="h-[188px] w-[295px]"
                  />
                  <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                    12 сарын 20,2022
                  </Button>
                  <div className="flex h-6 w-[208px] pt-3">
                    <img
                      src="/images/media/eventLogo.png"
                      alt="eventLogo"
                      className="h-7 w-7"
                    />
                    <h2 className="pl-2 text-brand30">By Mother eart NGO</h2>
                  </div>
                  <h1 className="h-12 pt-6 font-bold">
                    Бадамлянхуа асрамжийн төв анхны түнш байгууллага боллоо
                  </h1>
                  <p className="pt-6 text-[#807e7e]">
                    Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн
                    төвийн Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн
                    тоглоомын өрөөг тохижуулах...
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
                <div className="h-[415px] w-[295px] pt-36">
                  <img
                    src="/images/media/media_9.png"
                    alt="mediaIMG"
                    className="h-[188px] w-[295px]"
                  />
                  <Button className="mt-4  h-[24px] rounded-full bg-brand250 text-[16px] font-semibold text-brand30 hover:bg-brand250">
                    12 сарын 20,2022
                  </Button>
                  <div className="flex h-6 w-[208px] pt-3">
                    <img
                      src="/images/media/eventLogo.png"
                      alt="eventLogo"
                      className="h-7 w-7"
                    />
                    <h2 className="pl-2 text-brand30">By Mother eart NGO</h2>
                  </div>
                  <h1 className="h-12 pt-6 font-bold">
                    Be a Good Human арга хэмжээ амжилттай зохион байгуулагдлаа
                  </h1>
                  <p className="pt-6 text-[#807e7e]">
                    Гэмтэл согог судлалын үндэсний төвийн харьяа Түлэнхийн
                    төвийн Түлэгдэлт, нөхөн сэргээх мэс заслын хүүхдийн
                    тоглоомын өрөөг тохижуулах...
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
          </div>
          <div className="h-[289px] w-[367px]">
            <div className="flex h-[289px] w-[287px] flex-col justify-around pt-10">
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
            <div className="flex flex-col justify-around text-center text-2xl text-brand450">
              <div className="mt-10 h-[806px] w-[296px] bg-primary">
                ad space
              </div>
              <div className="mb-14 mt-12 h-[266px] w-[296px] bg-primary">
                ad space
              </div>
              <div className="h-[266px] w-[296px] bg-primary">ad space</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
