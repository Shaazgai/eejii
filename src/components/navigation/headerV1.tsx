'use client';

import { AppWindow, LogOut, Settings, User2Icon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '../ui/button';
interface HeaderProps {
  title: string;
  href: string;
  icon: ReactElement;
  items: string[];
  external: string;
}

const HeaderV1 = ({ headerNav }: { headerNav: HeaderProps[] | [] }) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="flex w-full flex-row items-center justify-between gap-3 p-3">
      <div className="min-w-[160px]">
        <Image alt="logo" src={'/eejii.jpeg'} width={160} height={50} />
      </div>
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
          <span>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-1 focus:outline-none">
                  {/* <Image
                    alt="avatar"
                    src={user.imageUrl}
                    width={30}
                    height={30}
                    className="rounded-full"
                  /> */}
                  {session?.user.email}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <AppWindow className="mr-2 h-4 w-4" />
                      <Link href={'/v/profile'}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <Link href={'/v/settings'}>Settings</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    SignOut
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                variant={'ghost'}
                size={'default'}
                className="flex gap-2"
              >
                <Link href={'/auth/login'}>
                  <User2Icon className="h-5 w-5" />
                  Login
                </Link>
              </Button>
            )}
          </span>
        </div>
      </div>
    </header>
  );
};

export default HeaderV1;
