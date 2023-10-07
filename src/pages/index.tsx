// import Sign from '@/bazo/login-next';
import { ArrowRight, MoveUpRight } from 'lucide-react';
import Link from 'next/link';

import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <>
      <BasicBaseLayout>
        <div className="flex justify-center">
          {/* <VolunteerSkillForm /> */}
        </div>
        {/* <Sign /> */}
      </BasicBaseLayout>

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
              <div className="flex h-[299.64px] w-[222.75px] flex-col items-start justify-center bg-[url('/images/folderLeft.png')] bg-cover pl-3 text-start">
                <h4 className="h-[46px] w-[73px] text-3xl text-[34px] font-bold text-[#ffffff] ">
                  55%
                </h4>
                <p className="h-[94px] w-[201px] text-[16px] text-[#FFFCF9] ">
                  Манай нийт <br /> оролцогчдын 55 хувийг <br /> нь сайн дурын
                  ажилчид эзэлж байна
                </p>
                <Link href="#" className="relative top-8">
                  <Button className="flex h-[58px] w-[201px] justify-between rounded-3xl border-transparent bg-[#266b70] text-[12px] font-semibold text-white">
                    Бидэнтэй нэгдэх
                    <span className="h-[31.5px] w-[30.75px] rounded-full border border-transparent bg-[#bfe88c] pl-[2px] pt-[2.5px]">
                      <MoveUpRight />
                    </span>
                  </Button>
                </Link>
              </div>
              <div className="flex h-[119px] w-[220px] items-center justify-center rounded-3xl bg-[#1b2b2c]">
                {/* <Check className=" bg-primary rounded-full w-[55px] h-[55px] text-white"/> */}
                <img
                  src="/images/Checkmark.png"
                  alt="chekMarkIMG"
                  className="h-[55px] w-[55px]"
                />
                <h1 className="pl-2 font-bold text-white">Be a good Human</h1>
              </div>
            </div>
            <div className="h-[297.61px] w-[220px] bg-[url('/images/folderLeftIMG.png')] bg-cover">
              <h6 className="relative left-4 top-52 h-[57px] w-[173px] text-[22px] font-bold text-white">
                Нийт 20+ cайн дурын ажлууд
              </h6>
            </div>
            <div className="flex h-[235px] w-[220px] flex-col justify-around rounded-3xl border bg-[#e8e8e8] pt-7">
              <p className="h-[72px] w-[201px]">
                Бид нийт 4.819.065,00 төгрөгийн хандив цуглуулжээ
              </p>
              <Button className="ml-2 flex h-[58px] w-[201px] justify-between rounded-3xl border-transparent bg-[#cacaca] text-[12px] font-bold text-[#000000]">
                Хандив өгөх
                <span className="h-[31.5px] w-[30.75px] rounded-full border border-transparent bg-[#000000] pl-[2px] pt-[2.5px] text-white">
                  <MoveUpRight />
                </span>
              </Button>
            </div>
            <div className="h-[297.61px] w-[220px] bg-[url('/images/folderRightIMG.png')] bg-cover">
              <h6 className="relative left-4 top-52 h-[57px] w-[173px] text-start text-[22px] font-bold text-white">
                Нийт 30+ төсөл хөтөлбөрүүд
              </h6>
            </div>
            <div className="flex h-[434.64px] flex-col justify-between">
              {/* <div className="h-[299.64px] w-[222.75px] border2 bg-primary rounded-3xl">
                  <h4 className="w-[73px] h-[46px] text-[#ffffff] text-3xl font-bold">55%</h4>
                  <p className="w-[201px] h-[94px] text-[16px] text-[#c4dbdd]">Манай нийт оролцогчдын 55 хувийг нь сайн дурын ажилчид эзэлж байна</p>    
              </div>  */}
              <div className="flex h-[299.64px] w-[222.75px] flex-col items-start justify-center bg-[url('/images/folderRight.png')] bg-cover pl-3 text-start">
                <img
                  src="/images/folderINimg.png"
                  alt="suppIMG"
                  className="h-[94px] w-[191px]"
                />
                <p className="flex h-[94px] w-[201px] flex-col justify-center text-[16px] text-[#39462a] ">
                  энэ сард нийт 3 төсөл шинээр нэмэгдлээ
                </p>
                <Link href="#" className="relative top-2">
                  <Button className="flex h-[58px] w-[201px] justify-between rounded-3xl border-transparent bg-[#9cc865] text-[12px] font-bold text-[#000000]">
                    Дэлгэрэнгүй
                    <span className="h-[31.5px] w-[30.75px] rounded-full border border-transparent bg-[#000000] pl-[2px] pt-[2.5px] text-[#9cc865]">
                      <MoveUpRight />
                    </span>
                  </Button>
                </Link>
              </div>
              <div className="flex h-[119px] w-[220px] items-center justify-center rounded-3xl bg-[#245255]">
                {/* <Check className=" bg-primary rounded-full w-[55px] h-[55px] text-white"/> */}
                <img
                  src="/images/Heart.png"
                  alt="heartIMG"
                  className="h-[55px] w-[55px]"
                />
                <h1 className="pl-2 font-bold  text-[#bfe88c]">
                  Be someone's <br /> hope today
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* supporter */}
      <section className="flex h-[565px] w-full items-center justify-around bg-[#E8EfEE] pl-20 pr-20">
        <div className="h-[412px] w-[340px] rounded-lg border-2 border-solid border-[#9DC3C6] bg-[#FFFFFF] p-10 text-center shadow-xl  shadow-[#9DC3C6]">
          <img
            src="/images/supporter_logo.png"
            alt="supporter"
            className="m-auto h-[126.49px] w-[132px]"
          />
          <h1 className="pb-3 pt-3 font-bold">Дэмжигч</h1>
          <p className="w-[252px]">
            Та санд байршсан дурын төсөл хөтөлбөрүүдийг дэмжин, өөрийн нэрийн
            нийгмийн хариуцлагийг тодотгох түүхчилсэн самбар эзэмшээрэй.
          </p>
        </div>
        {/* partner */}
        <div className="h-[412px] w-[340px] rounded-lg border-2 border-solid border-[#9DC3C6] bg-[#FFFFFF] p-10 text-center  shadow-xl  shadow-[#9DC3C6]">
          <img
            src="/images/partner_logo.png"
            alt="partner"
            className="m-auto h-[132px] w-[128px]"
          />
          <h1 className="pb-3 pt-3 font-bold">Хамтрагч</h1>
          <p className="w-[280px]">
            Та мэдээ,төсөл,хөтөлбөрүүдээ энд байршуулснаар олон
            нийт,дэмжигчид,сайн дурын ажилтнуудад цаг алдалгүй хүргэж,хандив
            болон бусад олон төрлийн дэмжлэг аваарай.
          </p>
        </div>
        {/* volunteer */}
        <div className="h-[412px] w-[340px] rounded-lg border-2 border-solid border-[#9DC3C6] bg-[#FFFFFF] p-10 text-center  shadow-xl shadow-[#9DC3C6]">
          <img
            src="/images/volunteer_logo.png"
            alt="volunteer"
            className="m-auto h-[132px] w-[129.46px]"
          />
          <h1 className="pb-3 pt-3 font-bold">Сайн дурын ажилтан</h1>
          <p className="w-[274px]">
            Та өөрийн ур чадвар,хүсэл сонирхолд тулгуурлан санд байршуулсан сайн
            дурын хөтөлбөрүүдэд оролцож үнэ цэнэтэй сертификаттай болж,үнэгүй
            сургалтанд хамрагдаарай.
          </p>
        </div>
      </section>

      <section className="max-h-[120vh] w-full bg-[#FFFCF9]">
        <div className="flex justify-between">
          <h1 className="pl-20 pt-14 text-[42px] font-semibold">
            <span className="text-primary">Eejii.org</span>-ийн онцлог
          </h1>
          <img
            src="/images/right_Border.png"
            alt="rightBorder"
            className="h-[467px] w-[676px]"
          />
        </div>

        <div className="flex justify-around pl-16 pr-16">
          {/* event1 */}
          <span className="relative bottom-52 left-14 h-[324px] w-[4px] bg-[#FBC26E]"></span>
          <div className="relative bottom-72 h-[481.12px] w-[336px]">
            <h5 className="h-[32px] w-[231px] pb-10 font-bold">
              Төсөл хөтөлбөрүүд
            </h5>
            <img
              src="/images/event_img1.png"
              alt="projectIMG"
              className="h-[173px] w-[308px]"
            />
            <p className="h-[216px] w-[308px]">
              “Ээжий Ертөнц” НҮТББ-ын хөнгөвчлөх тусламж үйлчилгээг сайжруулах
              зорилгын дор нийт 300 ширхэг дотроо 30 төрлийн хэрэглээний
              бүтээгдэхүүнийг багц болгон ХАЙР ДҮҮРЭН ЦҮНХ болгоод 120 өвчтөнд
              эмнэлгийн тодорхойлолтын дагуу “Ээжий” <br /> төслөөс хандивлах
              юм.
            </p>
            <Link
              href=""
              className="relative bottom-3 flex justify-end pr-10 text-primary"
            >
              Бүгд{' '}
              <span className="relative left-1 top-[3px]">
                {' '}
                <ArrowRight />
              </span>
            </Link>
          </div>
          <span className="relative bottom-28 left-14 h-[324px] w-[4px] bg-[#c99fff]"></span>
          {/* event2 */}
          <div className="relative bottom-48 h-[481.12px] w-[336px]">
            <h5 className="h-[32px] w-[231px] pb-10 font-bold">Арга хэмжээ</h5>
            <img
              src="/images/event_img2.png"
              alt="projectIMG"
              className="h-[173px] w-[308px]"
            />
            <p className="h-[216px] w-[300px]">
              "Before I die, I want to.......” нэртэй олон улсын нөлөөллийн
              ханын, урлагийн төслийг #Надад_мөрөөдөл_бий! нэртэйгээр ХАВДРЫН
              ЭРТ оношилгоо, ЭРҮҮЛ АМЬДРАХ-ын төлөөх үнэ цэнийг бий болгох сайн
              дурынхны дуу хоолойг олон нийтэд хүргэх зорилготойгоор зохион
              байгуулах гэж байгаа билээ.
            </p>
            <Link
              href="#"
              className="relative bottom-3 flex justify-end pr-10 text-primary"
            >
              Бүгд{' '}
              <span className="relative left-1 top-[3px]">
                {' '}
                <ArrowRight />
              </span>
            </Link>
          </div>
          {/* event3 */}
          <span className="relative left-14 top-5 h-[324px] w-[4px] bg-[#bFE88C]"></span>
          <div className="relative bottom-20 h-[505.12px] w-[336px]">
            <h5 className="h-[32px] w-[231px] pb-10 font-bold">
              Сайн дурын ажил
            </h5>
            <img
              src="/images/event_img3.png"
              alt="projectIMG"
              className="h-[173px] w-[308px]"
            />
            <p className="h-[240px] w-[308px]">
              “ICT EXPO-2023” үзэсгэлэн 06 дугаар сарын 09, 10, 11-ний өдрүүдэд
              Үндэсний соёл амралтын хүрээлэнд болно. Ерөнхий зохион
              байгуулагчаар Мэдээлэл, технологийн үндэсний парк ажиллаж байна.
              Зохион байгуулалттай холбоотойгоор тус үзэсгэлэн дээр ажиллах сайн
              дурын ажилтны сонгон шалгаруулалтын бүртгэл явуулж байна.
            </p>
            <Link
              href="#"
              className="relative bottom-3 flex justify-end pr-10 text-primary"
            >
              Бүгд{' '}
              <span className="relative left-1 top-[3px]">
                {' '}
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="h-[893px] w-full bg-[url('/images/backGroundImg.png')] bg-cover pb-24 pl-24 pr-24 pt-14">
        <div className="flex h-[100px]  flex-col justify-between">
          <div className="pl-10">
            <h1 className="text-[42px] font-semibold">
              Бидний сүүлийн үеийн төслүүд
            </h1>
          </div>
          <div className="flex justify-between pl-10 pr-5">
            <h6 className="h-[28px] w-[499px] text-[22px] text-[#75736e]">
              Хандивийн төслүүдтэй дэлгэрэнгүй танилцаарай
            </h6>
            <Link
              href="#"
              className="flex justify-between text-[20px] font-bold text-primary"
            >
              Дэлгэрэнгүй{' '}
              <span className="relative left-1 top-1">
                <MoveUpRight />
              </span>
            </Link>
          </div>
          <div className="mt-14 flex h-[634px] w-full justify-around">
            <div className="h-full w-[370px] rounded-xl bg-white">
              <img src="/images/projectImg1.png" alt="projectImage" />
              <div className="p-5">
                <Button
                  className="h-[25px] w-[112px] bg-[#d8e7eb] font-semibold text-primary"
                  variant={'default'}
                >
                  Education
                </Button>
                <h6 className="h-[56px] w-[247px] pt-2 font-bold">
                  Дулаан өвөлжөөрэй” сайн үйлсийн аян...
                </h6>

                <p className="w-[327px]">
                  “Ээжий Ертөнц” НҮТББ -с жил бүрийн 4р улиралд зохион
                  байгуулдаг “Дулаан өвөлжөөрэй” сайн үйлсийн аян НЭГ.{' '}
                  Бадамлянхуа асрамжийн төвд хүнс, хувцас, ахуй хэрэглээ, мөнгөн
                  тусламж хандивлах аян.
                </p>
                <div className="flex pt-4">
                  {' '}
                  <div className="h-[1.1vh] w-full rounded-lg   border-transparent bg-gray-200">
                    <div className="w-[80%] rounded-lg bg-[#FF9900] py-1 text-xs leading-none"></div>
                  </div>
                  <span className="relative bottom-3 left-2">80%</span>
                </div>
                <div className="flex justify-between pb-4">
                  <h1>
                    Цагласан:<span className="text-[#FF9900]"> 426000</span>
                  </h1>{' '}
                  <h1>
                    Зорилго:<span className="text-primary"> 2000000</span>
                  </h1>
                </div>
                <Link href="#">
                  <Button className="h-[40px] w-[332px] rounded-xl bg-primary text-[18px] font-bold text-white">
                    Хандив өгөх
                  </Button>
                </Link>
              </div>
            </div>
            <div className="h-full w-[370px] rounded-xl bg-white">
              <img src="/images/projectImg1.png" alt="projectImage" />
              <div className="p-5">
                <Button
                  className="h-[25px] w-[112px] bg-[#d8e7eb] font-semibold  text-primary"
                  variant={'default'}
                >
                  Education
                </Button>
                <h6 className="h-[56px] w-[247px] pt-2 font-bold">
                  Дулаан өвөлжөөрэй” сайн үйлсийн аян...
                </h6>

                <p className="w-[327px]">
                  “Ээжий Ертөнц” НҮТББ -с жил бүрийн 4р улиралд зохион
                  байгуулдаг “Дулаан өвөлжөөрэй” сайн үйлсийн аян НЭГ.{' '}
                  Бадамлянхуа асрамжийн төвд хүнс, хувцас, ахуй хэрэглээ, мөнгөн
                  тусламж хандивлах аян.
                </p>
                <div className="flex pt-4">
                  {' '}
                  <div className="h-[1.1vh] w-full rounded-lg   border-transparent bg-gray-200">
                    <div className="w-[80%] rounded-lg bg-[#FF9900] py-1 text-xs leading-none"></div>
                  </div>
                  <span className="relative bottom-3 left-2">80%</span>
                </div>
                <div className="flex justify-between pb-4">
                  <h1>
                    Цагласан:<span className="text-[#FF9900]"> 426000</span>
                  </h1>{' '}
                  <h1>
                    Зорилго:<span className="text-primary"> 2000000</span>
                  </h1>
                </div>
                <Link href="#">
                  <Button className="h-[40px] w-[332px] rounded-xl bg-primary text-[18px] font-bold text-white">
                    Хандив өгөх
                  </Button>
                </Link>
              </div>
            </div>
            <div className="h-full w-[370px] rounded-xl bg-white">
              <img src="/images/projectImg2.png" alt="projectImage" />
              <div className="p-5">
                <Button
                  className="h-[25px] w-[112px] bg-[#fde4e4] font-semibold  text-[#f47979]"
                  variant={'default'}
                >
                  Health
                </Button>
                <h6 className="h-[56px] w-[247px] pt-2 font-bold">
                  Дулаан өвөлжөөрэй” сайн үйлсийн аян...
                </h6>

                <p className="w-[327px]">
                  “Ээжий Ертөнц” НҮТББ -с жил бүрийн 4р улиралд зохион
                  байгуулдаг “Дулаан өвөлжөөрэй” сайн үйлсийн аян НЭГ.{' '}
                  Бадамлянхуа асрамжийн төвд хүнс, хувцас, ахуй хэрэглээ, мөнгөн
                  тусламж хандивлах аян.
                </p>
                <div className="flex pt-4">
                  {' '}
                  <div className="h-[1.1vh] w-full rounded-lg   border-transparent bg-gray-200">
                    <div className="w-[80%] rounded-lg bg-[#FF9900] py-1 text-xs leading-none"></div>
                  </div>
                  <span className="relative bottom-3 left-2">80%</span>
                </div>
                <div className="flex justify-between pb-4">
                  <h1>
                    Цагласан:<span className="text-[#FF9900]"> 426000</span>
                  </h1>{' '}
                  <h1>
                    Зорилго:<span className="text-primary"> 2000000</span>
                  </h1>
                </div>
                <Link href="#">
                  <Button className="h-[40px] w-[332px] rounded-xl bg-primary text-[18px] font-bold text-white">
                    Хандив өгөх
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                <Button className="h-[64px] w-[205px] rounded-3xl border border-primary bg-transparent text-[18px] font-bold text-primary">
                  Хандив өгөх <MoveUpRight />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex h-[375px] w-full justify-around pl-24 pr-24 pt-24">
            <div className="h-[375px] w-[295px]">
              <img
                src="/images/media_1.png"
                alt="mediaIMG"
                className="h-[188px] w-[295px]"
              />
              <Button className="mt-4  h-[24px] rounded-full bg-[#eaeaea] text-[16px] font-semibold text-[#929292]">
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
                <span className="relative left-2 top-1">
                  <MoveUpRight />
                </span>
              </Link>
            </div>
            <div className="h-[375px] w-[295px]">
              <img
                src="/images/media_1.png"
                alt="mediaIMG"
                className="h-[188px] w-[295px]"
              />
              <Button className="mt-4  h-[24px] rounded-full bg-[#eaeaea] text-[16px] font-semibold text-[#929292]">
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
                <span className="relative left-2 top-1">
                  <MoveUpRight />
                </span>
              </Link>
            </div>
            <div className="h-[375px] w-[295px]">
              <img
                src="/images/media_2.png"
                alt="mediaIMG"
                className="h-[188px] w-[295px]"
              />
              <Button className="mt-4  h-[24px] rounded-full bg-[#eaeaea] text-[16px] font-semibold text-[#929292]">
                04 сарын 24,2023
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
                <span className="relative left-2 top-1">
                  <MoveUpRight />
                </span>
              </Link>
            </div>
            <div className="h-[375px] w-[295px]">
              <img
                src="/images/media_3.png"
                alt="mediaIMG"
                className="h-[188px] w-[295px]"
              />
              <Button className="mt-4  h-[24px] rounded-full bg-[#eaeaea] text-[16px] font-semibold text-[#929292]">
                04 сарын 24,2023
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
                <span className="relative left-2 top-1">
                  <MoveUpRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="h-[888px] w-full bg-[#fbf8f6]">
        <div className="flex justify-around pl-24 pr-24 pt-14 font-semibold">
          <div>
            <img
              src="/images/level_4.png"
              alt="levelIMG"
              className="h-[84px] w-[82.41px]"
            />
            <h6 className="h-7 pt-3">0 Volunteers</h6>
          </div>
          <div>
            <img
              src="/images/level_3.png"
              alt="levelIMG"
              className="h-[84px] w-[82.41px]"
            />
            <h6 className="h-7 pt-3">0 Volunteers</h6>
          </div>
          <div>
            <img
              src="/images/level_2.png"
              alt="levelIMG"
              className="h-[84px] w-[82.41px]"
            />
            <h6 className="h-7 pt-3">1 Volunteers</h6>
          </div>
          <div>
            <img
              src="/images/level_1.png"
              alt="levelIMG"
              className="h-[84px] w-[82.41px]"
            />
            <h6 className="h-7 pt-3">428 Volunteers</h6>
          </div>
        </div>
        <div className="pt-24">
          <h4 className="h-[46px] text-center text-3xl font-bold">
            Дэлхийн өнцөг булан бүрдэх манай сайн дурынхан
          </h4>
        </div>
        <div>
          <img
            src="/images/map.png"
            alt="mapIMG"
            className="h-[568px] w-full object-contain pt-20"
          />
        </div>
      </section>
      <section className="h-[410px] w-full bg-white pt-16">
        <h1 className="h-12 text-center text-3xl font-bold">Манай хамрагчид</h1>
        <div className="flex justify-around pt-24">
          <img
            src="/images/partner1.png"
            alt="airTour"
            className="h-[99px] w-[202px] object-cover"
          />
          <img
            src="/images/partner2.png"
            alt="ttr"
            className="h-[99px] w-[202px]"
          />
          <img
            src="/images/partner3.png"
            alt="Lotus"
            className="h-[99px] w-[202px]"
          />
        </div>
      </section>
      <section className="h-[342px] w-full bg-[#d8e5e3] text-center">
        <div className="flex h-[230px] flex-col items-center justify-center">
          <h1 className="h-12 text-3xl font-bold">Тогтмол мэдээллээ авах</h1>
          <p className="mt-5 w-[955px]">
            Та санд нэмэгдэж буй шинэ төсөл хөтөлбөрүүд, хамрагдах боломжтой
            сургалт, арга хэмжээ зэрэг сүүлийн үеийн мэдээ, мэдээллүүдийг цаг
            алдалгүй, тогтмол авахыг хүсвэл дараах хэсэгт мэйл хаягаа
            бүртгүүлэхэд хангалттай.
          </p>
        </div>
        <div className=" m-0 flex w-full  items-center justify-center">
          <Input
            type="email"
            placeholder="Email address"
            className="border-gray h-[56px] w-[400px] rounded-full border bg-white pl-5 text-[14px] font-semibold text-[#cccccc]"
          />
          <Button
            type="submit"
            className="ml-4 h-[56px] w-[200px] bg-primaryDark text-[14px] font-bold uppercase"
          >
            Мэдээлэл авах
          </Button>
        </div>
      </section>
      <section className="h-[200px]">
        <h1>end footer bna</h1>
      </section>
    </>
  );
}
