import Image from 'next/image';
import Link from 'next/link';

export default function LoginComp() {
  return (
    <>
      <div className="flex h-screen w-full flex-col justify-around bg-brand450 text-center">
        <div>
          <div className="flex h-80 w-full  flex-col  items-center justify-around">
            <div className="">
              <Image
                src="/images/foundation_logo.jpg"
                width={473}
                height={425}
                alt="logo"
              />
            </div>
            <div className="h-16 w-full font-semibold">
              <h1 className="pb-5 pt-6 text-2xl text-[#3C888D]">Хамтдаа</h1>
              <h1 className="text-2xl text-[#3C888D]">
                Хайр дүүрэн ертөнцийг бүтээе
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full pb-14  text-sm leading-10 text-[#3c888D]">
          <Link href={'/auth/signup'}>
            <button className="rounded-full border-2 border-[#3c888D] px-24 py-1 font-bold ">
              Join us
            </button>
          </Link>
          <p>or</p>
          <Link href={'/auth/login'}>
            <button className="rounded-full border-2 border-[#3c888D] px-24 py-1 font-bold">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
