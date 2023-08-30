import React from 'react'
import Image from 'next/image'

export default function LoginComp() {
  return (
      <>
    <div className="h-screen w-full flex flex-col justify-around text-center">
        <div>
            <div className="flex h-80 w-full  justify-center items-center">
            <Image
      className=""
      src="/images/eejii.jpeg"
      width={473}
      height={425}
      alt="logo"
        />
    </div>
        <div className='w-full h-20 font-semibold'>
          <h1 className="text-[#3C888D]  text-2xl pb-5">Хамтдаа</h1>
          <h1 className="text-[#3C888D] text-2xl">Хайр дүүрэн ертөнцийг бүтээе</h1>
          </div>
      </div>
        <div className="text-[#3c888D] leading-10 w-full">
          <button className="border-[#3c888D] border-2 font-bold py-1 px-24 rounded-full ">
        Join us
          </button>
          <p>or</p>
          <button className="border-[#3c888D] border-2 font-bold py-1 px-24 rounded-full">Sign in</button>
        </div>
      </div>
      </>
  )
}
