import React from 'react';
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
export default function Features() {
  return (
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
            эмнэлгийн тодорхойлолтын дагуу “Ээжий” <br /> төслөөс хандивлах юм.
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
            "Before I die, I want to.......” нэртэй олон улсын нөлөөллийн ханын,
            урлагийн төслийг #Надад_мөрөөдөл_бий! нэртэйгээр ХАВДРЫН ЭРТ
            оношилгоо, ЭРҮҮЛ АМЬДРАХ-ын төлөөх үнэ цэнийг бий болгох сайн
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
            Үндэсний соёл амралтын хүрээлэнд болно. Ерөнхий зохион байгуулагчаар
            Мэдээлэл, технологийн үндэсний парк ажиллаж байна. Зохион
            байгуулалттай холбоотойгоор тус үзэсгэлэн дээр ажиллах сайн дурын
            ажилтны сонгон шалгаруулалтын бүртгэл явуулж байна.
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
  );
}
