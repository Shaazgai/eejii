import React from 'react';

export default function VolunteersMap() {
  return (
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
  );
}
