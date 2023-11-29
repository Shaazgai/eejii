import React from 'react';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const About = () => {
  return (
    <>
      {/* <section className="h-auto w-full bg-brand450 p-10">
        <div className="flex justify-around">
          <div>
            <h1 className="h-[46px] w-[592px] font-semibold">
              Үүсгэн байгуулагчийн мэндчилгээ
            </h1>
            <p className="h-[96px] w-[658px] pt-4 text-lg">
              Танд энэхүү гайхалтай өдрийн мэнд хүргэхийн ялдамд танаар бахархаж
              байгаагаа илэрхийлэхийг хүсэж байна. Учир нь та сайн дурын ажил
              хийх хүсэлтэй, бусдын төлөө сайхан сэтгэл гаргаж чаддаг хүн болоод
              энэ санг сонирхон уг хуудсанд зочилж байгаа билээ.
            </p>
            <p className="h-[168px] w-[678px] pt-10 text-lg">
              Cүүлийн жилүүдэд сайн дурын ажил хийх хүсэл сонирхолтой хүмүүсийн
              тоо эрчимтэй өсөж байгаа нь гайхалтай билээ. Энэ нь бид бусдын
              төлөө сэтгэлтэй болж өсөж, хүмүүжиж байгаагийн илэрхийлэл юм. Гэвч
              бидэнд энэ гайхалтай хүчийг зөв чиглүүлэх тогтолцоо байхгүйгээс
              сайн дурын болон хүмүүнлэгийн үйл ажиллагааны нь үр дүн
              хангалтгүй, үнэ цэнэ алдагдах магадлал үүсэж байна. Өнөөдрөөс энэ
              төрлийн үйл ажиллагаа явуулдаг байгууллагууд, хувь хүмүүс хамтран
              сайн дурын болон хүмүүнлэгийн арга хэмжээг зөв чиглүүлснээр илүү
              үр дүнд хүрч, гэрэлт ирээдүйг бүтээх боломжтой.
            </p>
          </div>
          <div className="relative right-20">
            <img
              src="/images/about/ceoIMG.png"
              alt="CEO image"
              className="h-[254px] w-[268px]"
            />
            <h6 className="pt-7 text-lg font-bold">
              Төслийн санаачлагч Э.Должинсүрэн
            </h6>
          </div>
        </div>
      </section> */}
      <section className="h-[914px] w-full bg-brand450 pt-20">
        <div className="flex justify-around pl-24">
          <div className="h-[264px] w-[741px] text-lg">
            <h2 className="text-center font-bold text-primary">
              "Хамгийн агуу сэтгэл бол бусдын төлөө сэтгэл"
            </h2>
            <p className="pt-5 font-semibold text-brand400">
              {' '}
              Бид хэдий чинээ эрт хамтран ажиллана, төдий чинээ эрт зөв тусыг
              хэрэгтэй хүнд нь <br /> хүргэх, нийгмийн хэт туйлшрал, бэлэнчлэх
              сэтгэлгээ, ядуурал, өвчлөлөөс хүн амыг <br /> хамгаалах боломжтой.{' '}
              <br /> Иймд бид НҮТББ, хувь хүн, энэ төрлийн үйл ажиллагаа
              явуулдаг олон улсын салбар <br /> байгууллага, дотоод, гадаад сайн
              дурынхны зохион байгуулдаг хүмүүнлэг болон сайн <br /> үйлсийн
              аян, төсөл, хөтөлбөрийг нэгтгэсэн Mонголын анхны ALL IN ONE олон
              талт дэмжих <br /> системийг хайр түгээгч та бүхэндээ зориулан
              хөгжүүлж байна. <br /> Уг сангийн одоогийн хувилбар нь эцсийн
              хувилбар биш бөгөөд цаашид та бүхний саналын <br /> дагуу 4 талт
              оролцогчдод давуу байдлаар тасралтгүй хөгжүүлсээр байх болно.
            </p>
          </div>
          <div className="flex">
            <img
              src="/images/about/aboutIMG3.png"
              alt="aboutIMG"
              className="relative right-44 top-5 h-[192px] w-[197px] p-3"
            />
            <img
              src="/images/about/aboutIMG4.png"
              alt="aboutIMG"
              className="relative right-40 top-20 h-[192px] w-[192px] p-3"
            />
          </div>
        </div>
        <div className="flex justify-around pl-10 pr-10 pt-16">
          <div className="flex">
            <img
              src="/images/about/aboutIMG1.png"
              alt="aboutIMG"
              className="h-[197px] w-[209px]"
            />
            <img
              src="/images/about/aboutIMG2.png"
              alt="aboutIMG"
              className="relative left-14 top-16 h-[240px] w-[238px] "
            />
          </div>
          <div className="h-[306px] w-[726px] text-lg">
            <h2 className="text-center font-bold text-primary">
              "Сайхан ирээдүйг сайн хүн биш сайн хүмүүс бүтээдэг"
            </h2>
            <p className="pt-5 font-semibold text-brand400">
              {' '}
              Одоогийн хувилбар дээр Дэмжих тал санд байршсан дурын хөтөлбөрийг
              дэмжсэнээр хүмүүнлэгийн модонд мөчир эзэмших ба тухайн модонд таны
              дэмжсэн хөтөлбөрийн <br /> тоогоор навч ургах байдлаар нийгмийн
              хариуцлагаа тодотгуулах түүхчилсэн самбар <br /> эзэмших болно.
              Хамтрагч байгууллагын тухайд өөрийн нэр, логогоор төсөл хөтөлбөрөө
              байршуулж, хандив босгох, өгөх, сургалт, арга хэмжээ зохион
              байгуулахаас гадна <br /> сайн дурын ажилтнуудад хамтарсан
              сертификат, дэмжигчдэдээ талархлын навч өгөх боломжтой. Харин сайн
              дурын ажилчдадаа бид үнэ цэнэтэй сайн дурын ажилд хувь <br />{' '}
              нэмрээ оруулах, олон төрлийн сургалт, лекц, арга хэмжээнд үнэ
              төлбөргүй хамрагдах, <br />
              бие даан хүмүүнлэгийн болон сургалтын арга хэмжээг санаачлан
              зохион байгуулах, XP волунтурын 4 эрэмбэ ахин, үнэ цэнэтэй
              хосолсон сертификаттай болох гэх мэт <br />
              боломжуудыг олгохоор уг санг хөгжүүлж байна.
            </p>
          </div>
        </div>
        <div>
          <h2 className="pt-24 text-center font-semibold  text-primary">
            "Хамгийн агуу сэтгэл бол бусдын төлөө сэтгэл"
          </h2>
        </div>
      </section>
      {/* <section className="h-[88vh]  bg-brand450 pt-16">
        <div className="flex justify-around">
          <div className="">
            <h2 className="pl-20 text-primary">
              "Хамгийн агуу сэтгэл бол бусдын төлөө сэтгэл"
            </h2>
            <div className="flex pl-10 pt-2">
              <div className="">
                <img
                  src="/images/about/aboutIMG1.png"
                  alt="aboutIMG"
                  className="h-[197px] w-[209px]"
                />
                <img
                  src="/images/about/aboutIMG3.png"
                  alt="aboutIMG"
                  className="relative top-5 h-[172px] w-[172px] p-3"
                />
              </div>
              <div className="pt-10">
                <img
                  src="/images/about/aboutIMG2.png"
                  alt="aboutIMG"
                  className="relative left-14 top-7 h-[192px] w-[197px] "
                />
                <img
                  src="/images/about/aboutIMG4.png"
                  alt="aboutIMG"
                  className="relative left-7 top-14 h-[182px] w-[182px] p-3"
                />
              </div>
            </div>
          </div>
          <div className="h-[498px] w-[726px] pt-20">
            <p>
              Бид хэдий чинээ эрт хамтран ажиллана, төдий чинээ эрт зөв тусыг
              хэрэгтэй хүнд нь хүргэх, нийгмийн хэт туйлшрал, бэлэнчлэх
              сэтгэлгээ, ядуурал, өвчлөлөөс хүн амыг хамгаалах боломжтой. Иймд
              бид НҮТББ, хувь хүн, энэ төрлийн үйл ажиллагаа явуулдаг олон улсын
              салбар байгууллага, дотоод, гадаад сайн дурынхны зохион байгуулдаг
              хүмүүнлэг болон сайн үйлсийн аян, төсөл, хөтөлбөрийг нэгтгэсэн
              Mонголын анхны ALL IN ONE олон талт дэмжих системийг хайр түгээгч
              та бүхэндээ зориулан хөгжүүлж байна. Уг сангийн одоогийн хувилбар
              нь эцсийн хувилбар биш бөгөөд цаашид та бүхний саналын дагуу 4
              талт оролцогчдод давуу байдлаар тасралтгүй хөгжүүлсээр байх болно.{' '}
              <br />
              <b className="font-medium text-primary">
                "Сайхан ирээдүйг сайн хүн биш сайн хүмүүс бүтээдэг"
              </b>{' '}
              <br />
              Одоогийн хувилбар дээр Дэмжих тал санд байршсан дурын хөтөлбөрийг
              дэмжсэнээр хүмүүнлэгийн модонд мөчир эзэмших ба тухайн модонд таны
              дэмжсэн хөтөлбөрийн тоогоор навч ургах байдлаар нийгмийн
              хариуцлагаа тодотгуулах түүхчилсэн самбар эзэмших болно. Хамтрагч
              байгууллагын тухайд өөрийн нэр, логогоор төсөл хөтөлбөрөө
              байршуулж, хандив босгох, өгөх, сургалт, арга хэмжээ зохион
              байгуулахаас гадна сайн дурын ажилтнуудад хамтарсан сертификат,
              дэмжигчдэдээ талархлын навч өгөх боломжтой. Харин сайн дурын
              ажилчдадаа бид үнэ цэнэтэй сайн дурын ажилд хувь нэмрээ оруулах,
              олон төрлийн сургалт, лекц, арга хэмжээнд үнэ төлбөргүй хамрагдах,
              бие даан хүмүүнлэгийн болон сургалтын арга хэмжээг санаачлан
              зохион байгуулах, XP волунтурын 4 эрэмбэ ахин, үнэ цэнэтэй
              хосолсон сертификаттай болох гэх мэт боломжуудыг олгохоор уг санг
              хөгжүүлж байна.
            </p>
          </div>
        </div>
        <h2 className="pt-12 text-center font-semibold text-primary">
          "Хамгийн агуу сэтгэл бол бусдын төлөө сэтгэл"
        </h2>
      </section> */}
      <section className="h-[1128px] w-full bg-[url('/images/media/firstBG.png')] bg-cover  p-16">
        <div className="">
          <h4 className="text-center text-3xl">
            Яагаад хураамж төлөх ёстой вэ?
          </h4>
          <p className="m-auto h-12 w-[914px] pt-7 text-center text-lg">
            Эдгээр хураамжууд нь тус сангийн зар сурталчилгаа, маркетинг, үйл
            ажиллагааны зардал, цалин, татвар хураамж, сайн үйлсийн болон сайн
            дурын хөтөлбөр зэрэг зайлшгүй шаардлагатай зардлыг санхүүжүүлнэ.{' '}
          </p>
        </div>
        <div className="flex justify-around pt-20">
          <div className="">
            <div className="pb-16">
              <Link href="#">
                <Button className="h-[56px] w-[360px] rounded-xl bg-brand450 text-xl  font-bold text-primary shadow-xl shadow-[#9DC3C6] hover:bg-brand450">
                  Хамтрагч
                </Button>
              </Link>
            </div>

            <div className="m-auto flex h-[706px] w-[329px] flex-col justify-around rounded-xl bg-brand450 text-center before:relative before:h-[39px]  before:w-[5px] before:bg-brand750">
              <h5 className="relative bottom-11 text-2xl font-semibold text-brand750">
                Basic
              </h5>
              <span className="relative bottom-10 flex justify-center text-xl font-bold">
                ₮0/<h2 className="pt-1.5 text-sm text-brand700">1 жил</h2>
              </span>
              <ul className="relative bottom-8 w-[254px] list-disc pl-16 text-start">
                <li>Нэрийн хуудас /Энгийн загвар/</li>
                <li>Хандив өгөх</li>
                <li>Сертификат, тодорхойлолт авах /limited/</li>
                <li>сургалт зохион байгуулах /limited/</li>
                <li>Төсөл оруулах/limited/</li>
                <li>Арга хэмжээ зохион байгуулах/limited/</li>
                <li>Мэдээ оруулах/limited/</li>
                <li>Сайн дурын ажилтан авах/limited/</li>
                <div className="text-brand5">
                  <li>Олон Улсын төсөл</li>
                  <li>VOI CART</li>
                  <li>Онцлох мэдээ</li>
                  <li>Онцлох төсөл</li>
                  <li>Banner хуудас</li>
                  <li>Онцлох хамтрагч</li>
                  <li>Үнэлгээ, сэтгэгдэл</li>
                </div>
              </ul>
              <Link href="#">
                <Button className="relative bottom-5 h-[39px] w-[240px] rounded-xl bg-primarySecond text-lg text-brand450  hover:bg-primarySecond">
                  Гишүүн болох
                </Button>
              </Link>
            </div>
          </div>
          <div className="">
            <div className="pb-16">
              <Link href="#">
                <Button className="h-[56px] w-[360px] rounded-xl bg-brand900 text-xl  font-bold text-primary shadow-xl shadow-[#9DC3C6] hover:bg-brand900">
                  Дэмжигч
                </Button>
              </Link>
            </div>

            <div className="m-auto flex h-[706px] w-[329px] flex-col justify-around rounded-xl bg-brand450 text-center before:relative before:h-[39px]  before:w-[5px] before:bg-brand800">
              <h5 className="relative bottom-11 text-2xl font-semibold text-brand800">
                Preimium
              </h5>
              <span className="relative bottom-10 flex justify-center text-xl font-bold">
                ₮1'000'000/
                <h2 className="pt-1.5 text-sm text-brand700">1 жил</h2>
              </span>
              <ul className="relative bottom-8 w-[254px] list-disc pl-16 text-start">
                <li>Нэрийн хуудас /Энгийн загвар/</li>
                <li>Хандив өгөх</li>
                <li>Сертификат, тодорхойлолт авах /limited/</li>
                <li>сургалт зохион байгуулах /limited/</li>
                <li>Төсөл оруулах/limited/</li>
                <li>Арга хэмжээ зохион байгуулах/limited/</li>
                <li>Мэдээ оруулах/limited/</li>
                <li>Сайн дурын ажилтан авах/limited/</li>
                <div>
                  <li>Олон Улсын төсөл</li>
                  <li>VOI CART</li>
                  <li>Онцлох мэдээ</li>
                  <li>Онцлох төсөл</li>
                  <li>Banner хуудас</li>
                  <li>Онцлох хамтрагч</li>
                  <li>Үнэлгээ, сэтгэгдэл</li>
                </div>
              </ul>
              <Link href="#">
                <Button className="relative bottom-5 h-[39px] w-[240px] rounded-xl bg-primarySecond text-lg text-brand450  hover:bg-primarySecond">
                  Гишүүн болох
                </Button>
              </Link>
            </div>
          </div>
          <div className="">
            <div className="pb-16">
              <Link href="#">
                <Button className="h-[56px] w-[360px] rounded-xl bg-brand900 text-xl  font-bold text-primary shadow-xl shadow-[#9DC3C6] hover:bg-brand900">
                  Сайн дурын ажилтан
                </Button>
              </Link>
            </div>

            <div className="m-auto flex h-[706px] w-[329px] flex-col justify-around rounded-xl bg-brand450 text-center before:relative before:h-[39px]  before:w-[5px] before:bg-brand850">
              <h5 className="relative  bottom-[90px] text-2xl font-semibold text-brand850">
                Pro
              </h5>
              <span className="relative bottom-28 flex justify-center text-xl font-bold">
                On Processing
              </span>
              <ul className="relative bottom-16 left-10  w-[263px] list-disc bg-[url('/images/about/womanBG.png')] object-cover pl-16 text-start">
                <img
                  src="/images/about/woman.png"
                  alt="woman"
                  className="h-[299px] w-[145px]"
                />
              </ul>
              <Link href="#">
                <Button className="relative bottom-0 h-[39px] w-[240px] rounded-xl bg-primarySecond text-lg text-brand450  hover:bg-primarySecond">
                  Гишүүн болох
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="h-[125vh] w-full bg-brand450 pl-60 pr-60 pt-20">
        <div className="flex  h-[200px] w-full">
          <div>
            <img
              src="/images/about/AboutFam1.png"
              alt="all in one"
              className="h-[152px] w-[163px]"
            />
          </div>
          <div className="pl-10 pt-5">
            <h1 className="h-10 w-[235px] text-2xl font-bold">
              Бүгдийг нэг дороос
            </h1>
            <p className="h-[72px] w-[475px] text-md font-semibold text-brand400">
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book
            </p>
          </div>
        </div>
        <div className="flex h-[200px] w-full justify-end pt-5">
          <div className="pr-10 pt-5">
            <h1 className="h-10 w-[356px] text-2xl font-bold">
              Таны дэмжлэгийг бид үнэлнэ
            </h1>
            <p className="h-[72px] w-[475px] text-md font-semibold text-brand400">
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book
            </p>
          </div>
          <div>
            <img
              src="/images/about/AboutFam2.png"
              alt="all in one"
              className="h-[152px] w-[163px]"
            />
          </div>
        </div>
        <div className="flex h-[200px]  w-full pt-16">
          <div>
            <img
              src="/images/about/AboutFam3.png"
              alt="all in one"
              className="h-[152px] w-[163px]"
            />
          </div>
          <div className="pl-10 pt-5">
            <h1 className="h-10 w-[257px] text-2xl font-bold">
              Эерэг бүхнийг түгээе
            </h1>
            <p className="h-[72px] w-[475px] text-md font-semibold text-brand400">
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book
            </p>
          </div>
        </div>
        <div className="flex h-[200px] w-full justify-end pt-20">
          <div className="pr-10 pt-5">
            <h1 className="h-10 w-[381px] text-2xl font-bold">
              Илүү ихийг хамтдаа бүтээцгээе
            </h1>
            <p className="h-[72px] w-[475px] text-md font-semibold text-brand400">
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book
            </p>
          </div>
          <div>
            <img
              src="/images/about/AboutFam4.png"
              alt="all in one"
              className="h-[152px] w-[163px]"
            />
          </div>
        </div>
      </section>
      <section className="flex h-[573px] w-full items-center bg-[url('/images/media/secondBG.png')] bg-cover">
        <div className="m-auto flex h-[358px] w-[1327px]  justify-around">
          <div className="m-auto h-[358px] w-[307px] rounded-md bg-brand450 p-4 ">
            <img
              src="/images/about/goodHumanpng.png"
              alt="be good Human"
              className="h-[230px] w-[271px]"
            />
            <h1 className="pt-5 text-lg font-semibold">Be good human</h1>
            <p className="pt-2 text-md text-brand700">
              Сайн дурынхныг хөгжүүлэх хөтөлбөр
            </p>
          </div>
          <div className="m-auto h-[358px] w-[307px] rounded-md bg-brand450 p-4 ">
            <img
              src="/images/about/wizard.png"
              alt="be good Human"
              className="h-[230px] w-[271px]"
            />
            <h1 className="pt-5 text-lg font-semibold">12 сарын шидтэн</h1>
            <p className="pt-2 text-md text-brand700">
              Хорт хавдартай хүүхдүүдэд шинэ жилийн баяр зохион байгуулдаг аян
            </p>
          </div>
          <div className="m-auto h-[358px] w-[307px] rounded-md bg-brand450 p-4 ">
            <img
              src="/images/about/warm.png"
              alt="be good Human"
              className="h-[230px] w-[271px]"
            />
            <h1 className="pt-5 text-lg font-semibold">Дулаан өвөлжөөрэй</h1>
            <p className="pt-2 text-md text-brand700">
              Амжиргааны түвшин доогуур хүүхдүүдэд туслах сайн үйлсийн аян
            </p>
          </div>
          <div className="m-auto h-[358px] w-[307px] rounded-md bg-brand450 p-4 ">
            <img
              src="/images/about/dream.png"
              alt="be good Human"
              className="h-[230px] w-[271px]"
            />
            <h1 className="pt-5 text-lg font-semibold">Надад мөрөөдөл бий</h1>
            <p className="pt-2 text-md text-brand700">
              Сайн дурынхны чөлөөт өдөрлөг
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
