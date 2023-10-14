import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { Facebook } from 'lucide-react';
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
      <div className="h-screen w-full bg-brand450">
        <div className="m-auto h-[577px] w-[854px]">
          <div className="flex w-full items-center justify-center pb-10 pt-10">
            <Image
              className=""
              src="/images/foundation_logo.jpg"
              width={289}
              height={60}
              alt="logo"
            />
          </div>
          <div className="h-85 w-85 flex flex-col items-center justify-center border-2 pb-10 pt-10">
            <button className="flex h-12 w-[359px] rounded-full  border-2 border-hidden bg-[#F3F9FA]">
              <span className="m-auto flex items-center">
                <Link
                  className="content-center  text-3xl text-brand500"
                  href="/"
                >
                  <Facebook />
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
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full border-b bg-transparent pb-1.5 pt-4 font-sans text-sm font-normal outline outline-0 transition-all focus:border-pink-500 focus:outline-0 disabled:border-0"
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button
              onClick={onSubmit}
              className="mt-8 h-[60px] w-72 rounded-full  border-2  py-0 text-white"
            >
              Log in
            </Button>
            <Link href={'/auth/signup'}>
              <Button
                className="mt-8 h-[60px] w-72 rounded-full border-2 border-transparent py-0"
                variant={'secondary'}
              >
                New account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
