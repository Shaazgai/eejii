import React from 'react'
import Image from 'next/image'
import { BiLogoFacebookCircle } from 'react-icons/Bi'

export default function Sign() {
  return (
      <>
          <div>
              <div className="leading-10">
            <div className="flex h-30 pt-20 pb-20 w-full justify-center items-center">
            <Image
      className="" 
      src="/images/eejii.jpeg"
      width={289}
      height={60} 
      alt="logo"
        />
            </div>
                  <div className="flex border-2 ml-80 mr-80 pb-10 pt-10 flex-col h-85 w-85 justify-center items-center">
                          <button className="flex border-hidden bg-[#F3F9FA] border-2  py-1 px-24 rounded-full">
                          <span className="flex">
                              <a className="mt-1 mr-3 text-3xl text-blue-700" href="/">
                                  <BiLogoFacebookCircle/>
                              </a>
                              Sign in with Facebook
                          </span> 
                      </button>
                        <p className="mt-4 h-37">By continiung with Facebook Apple, you agree to the <a href="#" className="text-[#3C888D] hover:underline"> Terms of <br /> Use </a> and consent the prcoessing of your personal data according  <br /> to the <a href="#" className="text-[#3C888D] hover:underline">Privacy Policy</a></p>
                      <div className="relative">
                          <h1>or</h1>
                      </div>
                      <div className="flex w-72 flex-col gap-6">
  <div className="relative h-11 w-full min-w-[200px]">
    <input
      placeholder="Email"
      className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
    />
    {/* <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
    </label> */}
  </div>
  <div className="relative h-11 w-full min-w-[200px]">
    <input
      className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      placeholder="Password"
    />
    {/* <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
    </label> */}
  </div>
 
</div>
                   <button className="border-[#3c888D] border-2 mt-8  py-0 px-24 rounded-full bg-[#3c888d]  text-white"><a href="/VolunteerLayout">Sign in</a> </button>  
                  </div>
      </div>
          </div>
      </>
  )
}