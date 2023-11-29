import { Button } from '@/components/ui/button';
import { MoveUpRight } from 'lucide-react';
import Link from 'next/link';

export default function MediaSection() {
  return (
    <section className="h-[833px] w-full bg-[#ffffff]">
      <div className="h-[575px] w-full">
        <div className="pl-32 pr-32 pt-20">
          <div className="">
            <h1 className="text-[42px] font-semibold">Мэдээ</h1>
          </div>
          <div className="flex justify-between">
            <h6 className="flex h-[28px] w-full pt-4 text-[22px] text-[#75736e]">
              Сангийн үйл ажиллагааны талаар сүүлийн үеийн мэдээлэлтэй хамтдаа
              байгаарай
            </h6>
            <Link href="#">
              <Button className="h-[64px] w-[205px] rounded-3xl border border-primary bg-transparent text-[18px] font-bold text-primary hover:bg-transparent">
                Хандив өгөх{' '}
                <span className="relative left-2">
                  <MoveUpRight size="20" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex h-[375px] w-full justify-around pl-24 pr-24 pt-24">
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
    </section>
  );
}
