import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function PublicFooter() {
  return (
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
            Энэхүү сан нь ❤ “ЭЭЖИЙ ЕРТӨНЦ” НҮТББ-ын өмч бөгөөд бүх эрх © хуулиар
            хамгаалагдсан болно
          </p>
        </div>
      </div>
    </section>
  );
}
