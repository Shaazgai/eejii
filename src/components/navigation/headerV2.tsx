'use client';

import { AppWindow, LogOut, Settings, User2, User2Icon } from 'lucide-react';
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

import NotificationMenu from '../common/notification-menu';
import { Button } from '../ui/button';
interface HeaderProps {
  title: string;
  href: string;
  icon: ReactElement;
  items: string[];
  external: string;
}

const HeaderV2 = ({
  headerNav,
  open,
}: {
  headerNav: HeaderProps[] | [];
  open: boolean;
}) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header
      className={`fixed left-0 right-0 top-0${
        open ? ' sm:ms-[300px]' : 'w-full sm:ms-[80px]'
      } z-10 flex h-[80px] grow items-center justify-between border-b border-gray-200 bg-white`}
    >
      <div>
        <Image alt="logo" src={'/images/eejii.jpeg'} width={160} height={50} />
      </div>
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
            <div className="flex gap-5 px-5">
              <NotificationMenu />
              <DropdownMenu>
                <DropdownMenuTrigger className="relative flex h-[40px] items-center justify-center gap-2 rounded-full bg-zinc-100 p-1 px-3 font-medium hover:bg-zinc-200 focus:outline-none">
                  <User2 size={24} />
                  {session?.user.email}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <AppWindow className="mr-2 h-4 w-4" />
                      <Link href={'/v'}>Dashboard</Link>
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
            </div>
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
    </header>
  );
};

export default HeaderV2;
