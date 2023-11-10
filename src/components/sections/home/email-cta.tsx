import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function EmailCta() {
  return (
    <section className="h-[342px] w-full bg-[#d8e5e3] text-center">
      <div className="flex h-[230px] flex-col items-center justify-center">
        <h1 className="h-12 text-3xl font-bold">Тогтмол мэдээллээ авах</h1>
        <p className="mt-5 w-[955px]">
          Та санд нэмэгдэж буй шинэ төсөл хөтөлбөрүүд, хамрагдах боломжтой
          сургалт, арга хэмжээ зэрэг сүүлийн үеийн мэдээ, мэдээллүүдийг цаг
          алдалгүй, тогтмол авахыг хүсвэл дараах хэсэгт мэйл хаягаа бүртгүүлэхэд
          хангалттай.
        </p>
      </div>
      <div className="m-0 flex w-full items-center justify-center ">
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
  );
}
