import { Button } from '@/components/ui/button';
import { ArrowLeft, MoveUpRight } from 'lucide-react';
import Link from 'next/link';

export const Mediums = () => {
  return (
    <>
      <section className="relative top-10 h-[1910px] bg-[#fffcf6]">
        <img
          src="/images/media/media_10.png"
          alt="mediaNext"
          className="m-auto h-[324px] w-[1241px]"
        />
        <div className="absolute left-[18.5%] top-56 h-[973px] w-[949px] rounded-xl bg-brand450 p-16">
          <div className="w-[821px]">
            <h1 className="pb-3 text-2xl font-bold leading-7">
              ТҮЛЭНХИЙН ТӨВИЙН ХҮҮХДИЙН ТОГЛООМЫН ӨРӨӨГ НЭМЖ ТОХИЖУУЛАН,
              ШААРДЛАГАТАЙ ЭМ ХЭРЭГСЛИЙГ ХАНДИВЛАЛАА
            </h1>
            <h2>Published by Eejii.org June 23rd 2023, 2:18 </h2>
            <h1 className="pb-5 pt-3 text-xl font-semibold leading-7">
              ТҮЛЭНХИЙН ТӨВИЙН ХҮҮХДИЙН ТОГЛООМЫН ӨРӨӨГ НЭМЖ ТОХИЖУУЛАН,
              ШААРДЛАГАТАЙ ЭМ ХЭРЭГСЛИЙГ ХАНДИВЛАЛАА
            </h1>
            <p className="h-[472px] w-[821px] text-xl leading-8">
              Нийт 200 гаруй гишүүнтэй тус холбоо нь 2023 оноос эхлэн хүүхдийн
              төлөөх хүмүүнлэгийн үйл ажиллагааг жил бүр зохион байгуулахаар
              төлөвлөж, эхний ажил болгон Түлэнхийн төвийн Түлэгдэлт, нөхөн
              сэргээх мэс заслын хүүхдэд зориулсан тоглоомын өрөөг тохижуулахаар
              сонгожээ. <br /> Энэ хүрээнд дөрвөн сая гаруй төгрөгийн өртөг
              бүхий олон нэр төрлийн тоглоом, номын цуглуулга, буйдан, тавиураас
              гадна эмнэлгийн тусламж үйлчилгээнд хэрэглэгдэх мөнгөжүүлсэн тос,
              эм, бинт зэрэг хэрэгцээт зүйлсийг холбооны тэргүүн Н.Цолмон болон
              Удирдах зөвлөлийн гишүүд Түлэнхийн төвд хүлээлгэж өгсөн юм. <br />
              Түлэгдэлт, нөхөн сэргээх эмчилгээнд хамрагдаж буй хүүхэд
              багачуудын ая тухтай орчныг бүрдүүлэн, эцэг эх асран
              хамгаалагчтайгаа хамт цагийг таатай өнгөрүүлэх, тоглож наадах
              боломжийг нэмэгдүүлж буйд тус тасагт хэвтэн эмчлүүлэгсдийн зүгээс
              сэтгэл хангалуун байгаагаа илэрхийлж, эмнэлэг бүрт хүүхдэд
              зориулсан ийм өрөө тасалгаатай байх нь олон сайн талтай гэдгийг
              онцолж байлаа. <br /> Гэнэтийн осол гэмтэл, болзошгүй эрсдэлийн
              улмаас түлэгдэж бэртсэн болон нөхөн сэргээх мэс засал, эмчилгээнд
              хамрагдаж буй хүүхэд багачуудыг баярлуулж, эмнэлгийн тусламж
              үйлчилгээг дэмжин ажиллаж буй “Барьцаалан зээлдүүлэх бизнес
              эрхлэгчдийн эвсэл холбоо” ГҮТББ-ын хамт олонд талархал илэрхийлье.
              САЙН ҮЙЛС БҮХЭН ДЭЛГЭРЭХ БОЛТУГАЙ
            </p>
            <div className="relative top-36 flex h-8 w-[821px] justify-between">
              <div>
                <Link href="/medium" className="flex">
                  {' '}
                  <ArrowLeft />
                  <span className="relative bottom-0.5 text-xl font-semibold">
                    Буцах
                  </span>{' '}
                </Link>
              </div>
              <div className="flex h-8 w-[200px] justify-around">
                <Link href="/">
                  <img
                    src="/images/media/facebook.png"
                    alt="facebook"
                    className="h-8 w-8"
                  />
                </Link>
                <Link href="/">
                  <img
                    src="/images/media/instagram.png"
                    alt="instagram"
                    className="h-8 w-8"
                  />
                </Link>
                <Link href="/">
                  <img
                    src="/images/media/twitter.png"
                    alt="twitter"
                    className="h-8 w-8"
                  />
                </Link>
                <Link href="/">
                  <img
                    src="/images/media/gmail.png"
                    alt="gmail"
                    className="h-8 w-8"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative left-[18.5%] top-[970px] h-[453px] w-[933px]">
          <h1 className="pb-10 text-center text-3xl">Холбоотой мэдээллүүд</h1>
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
        </div>
      </section>
    </>
  );
};
