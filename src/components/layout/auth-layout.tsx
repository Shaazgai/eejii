import React from 'react';
import Image from 'next/image';
import { Button } from '@mantine/core';

import { useRouter } from 'next/router';
import { IconArrowLeftCircle } from '@tabler/icons-react';
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
      <div className="flex flex-col justify-between w-full h-[100vh] pl-40 pr-40 pt-28 pb-24 text-center bg-brand450">
        <div className="relative flex flex-col justify-around items-center w-full gap-20">
          <div className="flex">
            <div className="absolute left-0 border rounded-full">
              <Button
                variant="default"
                onClick={() => router.back()}
                className=""
              >
                <IconArrowLeftCircle />
              </Button>
            </div>
            <Image
              src="/images/login/foundationLogo.png"
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
          <div className={`w-full`}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
