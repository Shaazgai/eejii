import React from 'react';

export default function UsertypeExplain() {
  return (
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
          нийт,дэмжигчид,сайн дурын ажилтнуудад цаг алдалгүй хүргэж,хандив болон
          бусад олон төрлийн дэмжлэг аваарай.
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
  );
}
