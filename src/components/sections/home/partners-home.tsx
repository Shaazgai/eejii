import React from 'react';

export default function PartnersHome() {
  return (
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
  );
}
