// import Sign from '@/bazo/login-next';
// import BasicBaseLayout from '@/components/layout/basic-base-layout';
import Link from 'next/link';
import {
  ArrowRight,
  Facebook,
  MoveUpRight,
  Instagram,
  ChevronDown,
  CalendarHeart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <>
      {/* <BasicBaseLayout>
        <div className="flex justify-center">
          <VolunteerSkillForm />
        </div>
        <Sign />
      </BasicBaseLayout> */}

      <nav className="bg-white">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link href="#" className="flex h-[72px] w-[215px] items-center">
            <img
              src="/images/homie/foundation_logo.jpg"
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
        <div className="absolute right-64 mt-1  shadow-sm dark:border-gray-600 dark:bg-gray-800 md:bg-white">
          <div className="mx-auto flex h-[202px] w-[525px]">
            <ul className="h-[202px] w-[270px] p-8">
              <li>
                <Link
                  href="#"
                  className="block w-52 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex font-semibold">
                    <img
                      src="/images/projectss/projectsIcon.png"
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
                      src="/images/volunteer/volunteerIcon.png"
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
                      src="/images/supporter/supporterIcon.png"
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
                      src="/images/homie/chairity.png"
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
                      src="/images/homie/Vector.png"
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
                <h1 className="pl-2 font-bold  text-brand800">
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
            src="/images/supporter/supporter_logo.png"
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
        <div className="h-[412px] w-[340px] rounded-lg border-2 border-solid border-brand50 bg-[#FFFFFF] p-10 text-center  shadow-xl  shadow-[#9DC3C6]">
          <img
            src="/images/partner/partner_logo.png"
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
        <div className="h-[412px] w-[340px] rounded-lg border-2 border-solid border-brand50 bg-[#FFFFFF] p-10 text-center  shadow-xl shadow-[#9DC3C6]">
          <img
            src="/images/volunteer/volunteer_logo.png"
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
            src="/images/homie/right_Border.png"
            alt="rightBorder"
            className="h-[467px] w-[676px]"
          />
        </div>

        <div className="flex justify-around pl-16 pr-16">
          {/* event1 */}
          <div className="relative bottom-72 flex h-[481.12px] w-[336px] flex-col items-end before:absolute before:bottom-12  before:left-2 before:h-[290px] before:w-[4px] before:bg-[#FBC26E]">
            <h5 className="m-auto h-[32px]  w-[231px] text-start font-bold">
              Төсөл хөтөлбөрүүд
            </h5>
            <img
              src="/images/eventss/event_img1.png"
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
          {/* event2 */}
          <div className="relative bottom-48 flex h-[481.12px] w-[356px] flex-col items-end before:absolute before:bottom-12 before:left-8 before:h-[290px] before:w-[4px] before:bg-[#c99fff]">
            <h5 className="m-auto flex h-[32px] w-[231px] justify-start font-bold">
              Арга хэмжээ
            </h5>
            <img
              src="/images/eventss/event_img2.png"
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
          <div className="relative bottom-20 flex h-[505.12px] w-[336px] flex-col items-end before:absolute before:bottom-12 before:left-2 before:h-[290px] before:w-[4px] before:bg-[#bfe88c]">
            <h5 className="m-auto flex h-[32px] w-[231px] justify-start font-bold">
              Сайн дурын ажил
            </h5>
            <img
              src="/images/eventss/event_img3.png"
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
      <section className="h-[893px] w-full bg-[url('/images/homie/backGroundImg.png')] bg-cover pb-24 pl-24 pr-24 pt-14">
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
              className="flex justify-between pr-4 text-[20px] font-bold text-primary"
            >
              Дэлгэрэнгүй{' '}
              <span className="relative left-1 top-1">
                <MoveUpRight size="22" />
              </span>
            </Link>
          </div>
          <div className="mt-14 flex h-[634px] w-full justify-around">
            <div className="h-full w-[370px] rounded-xl bg-white">
              <img src="/images/projectss/projectImg1.png" alt="projectImage" />
              <div className="p-5">
                <Button
                  className="h-[25px] w-[112px] bg-brand20 font-semibold text-primary hover:bg-brand20"
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
              <img src="/images/projectss/projectImg1.png" alt="projectImage" />
              <div className="p-5">
                <Button
                  className="h-[25px] w-[112px] bg-brand20 font-semibold  text-primary hover:bg-brand20"
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
                    <div className="w-[80%] rounded-lg bg-brand100 py-1 text-xs leading-none"></div>
                  </div>
                  <span className="relative bottom-3 left-2">80%</span>
                </div>
                <div className="flex justify-between pb-4">
                  <h1>
                    Цагласан:<span className="text-brand100"> 426000</span>
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
              <img src="/images/projectss/projectImg2.png" alt="projectImage" />
              <div className="p-5">
                <Button
                  className="h-[25px] w-[112px] bg-brand200 font-semibold  text-brand150 hover:bg-brand200"
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
                    <div className="w-[80%] rounded-lg bg-brand100 py-1 text-xs leading-none"></div>
                  </div>
                  <span className="relative bottom-3 left-2">80%</span>
                </div>
                <div className="flex justify-between pb-4">
                  <h1>
                    Цагласан:<span className="text-brand100"> 426000</span>
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
      <section className="h-[888px] w-full bg-[#fbf8f6]">
        <div className="flex justify-around pl-24 pr-24 pt-14 font-semibold">
          <div>
            <img
              src="/images/volunteer_level/level_4.png"
              alt="levelIMG"
              className="h-[84px] w-[82.41px]"
            />
            <h6 className="h-7 pt-3">0 Volunteers</h6>
          </div>
          <div>
            <img
              src="/images/volunteer_level/level_3.png"
              alt="levelIMG"
              className="h-[84px] w-[82.41px]"
            />
            <h6 className="h-7 pt-3">0 Volunteers</h6>
          </div>
          <div>
            <img
              src="/images/volunteer_level/level_2.png"
              alt="levelIMG"
              className="h-[84px] w-[82.41px]"
            />
            <h6 className="h-7 pt-3">1 Volunteers</h6>
          </div>
          <div>
            <img
              src="/images/volunteer_level/level_1.png"
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
            src="/images/homie/map.png"
            alt="mapIMG"
            className="h-[568px] w-full object-contain pt-20"
          />
        </div>
      </section>
      <section className="h-[410px] w-full bg-white pt-16">
        <h1 className="h-12 text-center text-3xl font-bold">Манай хамрагчид</h1>
        <div className="flex justify-around pt-24">
          <img
            src="/images/partner/partner1.png"
            alt="airTour"
            className="h-[99px] w-[202px] object-cover"
          />
          <img
            src="/images/partner/partner2.png"
            alt="ttr"
            className="h-[99px] w-[202px]"
          />
          <img
            src="/images/partner/partner3.png"
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
      <section className="h-64 p-20">
        <div className="flex h-[244px] justify-around">
          <div>
            <img src="/images/homie/proLogo.png" alt="mainLogo" />
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
}
