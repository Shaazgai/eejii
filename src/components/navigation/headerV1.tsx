import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';
import { Button } from '@mantine/core';

interface HeaderProps {
  title: string;
  href: string;
  icon: ReactElement;
  items: string[];
  external: string;
}

const HeaderV1 = ({ headerNav }: { headerNav: HeaderProps[] | [] }) => {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 z-10 w-full border-b border-b-gray-200 bg-white">
      <div className="flex w-full flex-row items-center justify-between gap-3 p-3">
        <Link href="/v" className="min-w-[160px]">
          <Image
            alt="logo"
            src={'/images/foundation_logo.jpg'}
            width={160}
            height={50}
          />
        </Link>
        <div className="flex w-full flex-row items-center justify-between">
          <nav>
            <ul className="flex flex-row gap-10">
              {headerNav && headerNav.length > 0 ? (
                headerNav.map((item, index) => (
                  <li key={index}>
                    <Button
                      variant="link"
                      className={`${pathname === item.href ? 'underline' : ''}`}
                    >
                      <Link href={item.href}>{item.title}</Link>
                    </Button>
                  </li>
                ))
              ) : (
                <></>
              )}
            </ul>
          </nav>
          <div>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderV1;
