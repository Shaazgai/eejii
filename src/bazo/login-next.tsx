import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function Sign() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = async () => {
    await signIn('credentials', { email, password, redirect: false })
      .then(data => {
        console.log(data);
        // router.push(`/${checkUserType()}`);
      })
      .catch(error => console.log(error));
  };
  return (
    <>
      <div>
        <div className="leading-10">
          <div className="h-30 flex w-full items-center justify-center pb-20 pt-20">
            <Image
              className=""
              src="/images/eejii.jpeg"
              width={289}
              height={60}
              alt="logo"
            />
          </div>
          <div className="h-85 w-85 ml-80 mr-80 flex flex-col items-center justify-center border-2 pb-10 pt-10">
            <button className="flex rounded-full border-2 border-hidden  bg-[#F3F9FA] px-24 py-1">
              <span className="flex items-center gap-2">
                <Link className="text-3xl text-blue-700" href="/">
                  <Icons.facebook className="h-4 w-4" />
                </Link>
                Sign in with Facebook
              </span>
            </button>
            <p className="h-37 mt-4">
              By continiung with Facebook Apple, you agree to the{' '}
              <a href="#" className="text-[#3C888D] hover:underline">
                {' '}
                Terms of <br /> Use{' '}
              </a>{' '}
              and consent the prcoessing of your personal data according <br />{' '}
              to the{' '}
              <a href="#" className="text-[#3C888D] hover:underline">
                Privacy Policy
              </a>
            </p>
            <div className="relative">
              <h1>or</h1>
            </div>
            <div className="flex w-72 flex-col gap-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  placeholder="Email"
                  className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full border-b bg-transparent pb-1.5 pt-4 font-sans text-sm font-normal outline outline-0 transition-all focus:border-pink-500 focus:outline-0 disabled:border-0"
                  onChange={e => setEmail(e.target.value)}
                />
                {/* <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
    </label> */}
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full border-b bg-transparent pb-1.5 pt-4 font-sans text-sm font-normal outline outline-0 transition-all focus:border-pink-500 focus:outline-0 disabled:border-0"
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                />
                {/* <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
    </label> */}
              </div>
            </div>
            <Button
              onClick={onSubmit}
              className="mt-8 rounded-full border-2   px-24 py-0  text-white"
            >
              Log in
            </Button>
            <Button className="mt-8 rounded-full border-2  border-[#3c888D] bg-[#3c888d] px-24 py-0  text-white">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
