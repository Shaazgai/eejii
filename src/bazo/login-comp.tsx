import Image from 'next/image';
import React from 'react';

export default function LoginComp() {
  return (
    <>
      <div className="flex h-screen w-full flex-col justify-around text-center">
        <div>
          <div className="flex h-80 w-full  items-center justify-center">
            <Image
              className=""
              src="/images/eejii.jpeg"
              width={473}
              height={425}
              alt="logo"
            />
          </div>
          <div className="h-20 w-full font-semibold">
            <h1 className="pb-5  text-2xl text-[#3C888D]">Хамтдаа</h1>
            <h1 className="text-2xl text-[#3C888D]">
              Хайр дүүрэн ертөнцийг бүтээе
            </h1>
          </div>
        </div>
        <div className="w-full leading-10 text-[#3c888D]">
          <button className="rounded-full border-2 border-[#3c888D] px-24 py-1 font-bold ">
            Join us
          </button>
          <p>or</p>
          <button className="rounded-full border-2 border-[#3c888D] px-24 py-1 font-bold">
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}
