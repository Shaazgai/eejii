import React from 'react';
import Image from 'next/image';
import { ActionIcon, Container } from '@mantine/core';

import { useRouter } from 'next/router';
import { IconArrowLeft } from '@tabler/icons-react';
const AuthLayout = ({
  children,
  indexPage,
}: {
  children: React.ReactNode;
  indexPage?: boolean;
}) => {
  const router = useRouter();
  return (
    <Container mt={50}>
      <div className="relative flex flex-col justify-around items-center w-full gap-10">
        <div className="flex">
          <div className="absolute left-0 border rounded-full">
            <ActionIcon
              radius={'lg'}
              size={'lg'}
              variant="light"
              onClick={() => router.back()}
            >
              <IconArrowLeft />
            </ActionIcon>
          </div>
          <Image
            src="/images/login/foundationLogo.png"
            width={189}
            height={60}
            alt="logo"
          />
        </div>
        {indexPage && (
          <div className="w-full text-center font-semibold">
            <h1 className="pt-6 pb-5 text-2xl text-primary">Хамтдаа</h1>
            <h1 className="text-2xl text-primary">
              Хайр дүүрэн ертөнцийг бүтээе
            </h1>
          </div>
        )}
        <div>{children}</div>
      </div>
    </Container>
  );
};

export default AuthLayout;
