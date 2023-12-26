import React from 'react';
import Image from 'next/image';
import { Button } from '@mantine/core';
import { ArrowLeftCircle } from 'lucide-react';

import { useRouter } from 'next/router';
const AuthLayout = ({
  children,
  indexPage,
}: {
  children: React.ReactNode;
  indexPage?: boolean;
}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col justify-between w-full h-screen p-40 text-center bg-brand450">
        <div className="relative flex flex-col items-center w-full gap-40 ">
          <div className="flex flex-col">
            <div className="absolute left-0 top-3">
              <Button variant="default" onClick={() => router.back()}>
                <ArrowLeftCircle />
              </Button>
            </div>
            <Image
              src="/images/foundation_logo.png"
              width={189}
              height={60}
              alt="logo"
            />
          </div>
          {indexPage && (
            <div className="w-full font-semibold">
              <h1 className="pt-6 pb-5 text-2xl text-primary">Хамтдаа</h1>
              <h1 className="text-2xl text-primary">
                Хайр дүүрэн ертөнцийг бүтээе
              </h1>
            </div>
          )}
        </div>
        <div className={`w-full`}>{children}</div>
      </div>
    </>
  );
};

export default AuthLayout;
