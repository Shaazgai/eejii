import { AppWindow, LogOut, Settings, User2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const PartnerHeader = () => {
  const session = useSession();
  // const pathname = usePathname();

  return (
    <header className="flex w-full flex-row items-center justify-between p-3">
      <div>
        <Image alt="logo" src={'/images/eejii.jpeg'} width={200} height={50} />
      </div>
      {/* <nav>
        <ul className="flex flex-row gap-10">
          <li>
            <Button
              variant={'link'}
              className={`${pathname === '/' ? 'underline' : ''}`}
            >
              <Link href={'/'}>Home</Link>
            </Button>
          </li>
          <li>
            <Button
              variant={'link'}
              className={`${pathname === '/about' ? 'underline' : ''}`}
            >
              <Link href={'/about'}>About</Link>
            </Button>
          </li>
          <li>
            <Button
              variant={'link'}
              className={`${pathname === '/events' ? 'underline' : ''}`}
            >
              <Link href={'/events'}>Events</Link>
            </Button>
          </li>
          <li>
            <Button
              variant={'link'}
              className={`${pathname === '/fundraising' ? 'underline' : ''}`}
            >
              <Link href={'/fundraising'}>Fundraising</Link>
            </Button>
          </li>
        </ul>
      </nav> */}
      <div>
        <span>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-1 focus:outline-none">
                {session.data?.user.name}
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

export default PartnerHeader;
