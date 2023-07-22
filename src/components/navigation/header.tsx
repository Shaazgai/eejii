'use client';

import { SignOutButton, useUser } from '@clerk/nextjs';
import { AppWindow, LogOut, Settings, User2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  title: string;
  href: string;
  icon: ReactElement;
  items: string[];
  external: string;
}

import { Button } from '../ui/button';

const Header = ({ headerNav }: { headerNav: HeaderProps[] | [] }) => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <header className="flex w-full flex-row items-center justify-between p-3">
      <div>
        <Image alt="logo" src={'/eejii.jpeg'} width={200} height={50} />
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-1 focus:outline-none">
                <Image
                  alt="avatar"
                  src={user.imageUrl}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                {user.firstName || user.imageUrl}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <AppWindow className="mr-2 h-4 w-4" />
                    <Link href={'/dashboard'}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <SignOutButton />
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
              <Link href={'sign-in'}>
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

export default Header;
