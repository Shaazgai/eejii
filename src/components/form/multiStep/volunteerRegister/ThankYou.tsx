import Image from 'next/image';
import React from 'react';

export default function ThankYou() {
  return (
    <section className="flex h-full flex-col items-center justify-center text-center">
      <div className="relative mb-6 h-14 w-14">
        <Image
          src="/images/icon-thank-you.svg"
          alt="checkmark inside a circle"
          fill
        />
      </div>
      <h3 className="text-c-primary-marine-blue mb-[9px] text-2xl lg:text-[32px]">
        Thank you!
      </h3>
      <p className="text-c-neutral-cool-gray text-base">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </section>
  );
}
