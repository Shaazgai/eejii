import { AlignLeft, AlignRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { Dispatch, ReactElement, SetStateAction } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
interface SidebarProps {
  title: string;
  href: string;
  icon: ReactElement;
  items: string[];
  external: string;
}
export default function Sidebar({
  sidebarNav,
  open,
  setOpen,
}: {
  sidebarNav: SidebarProps[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { asPath } = useRouter();

  return (
    <div
      className={`
        sidebar 
        no-scrollbar 
        top-30
        bottom-0 
        z-10  
        overflow-y-auto
        px-3 pb-10
        text-center
        sm:w-[300px]
        lg:left-0
        ${open ? '' : 'sm:w-[80px]'}
      `}
    >
      <div className="flex h-[80px] items-center justify-center">
        {/* <span className="text-3xl">{open ? 'Eejii' : 'E'}</span> */}
      </div>
      <div className="flex flex-col space-y-2">
        <div className={`${open ? 'flex justify-end' : 'flex'}`}>
          <Button onClick={() => setOpen(!open)} variant={'ghost'}>
            {open ? (
              <AlignRight className="h-7 w-7" />
            ) : (
              <AlignLeft className="h-7 w-7" />
            )}
          </Button>
        </div>
        {sidebarNav &&
          sidebarNav?.map((item, index) => {
            return item.href ? (
              <Link
                key={index}
                href={item.href}
                target={item.external ? '_blank  ' : ''}
                rel={item.external ? 'noreferrer' : ''}
              >
                <span
                  className={cn(
                    `group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-2 hover:bg-muted`,
                    asPath === item.href
                      ? 'bg-primary font-medium text-popover'
                      : 'text-sidebar-foreground'
                  )}
                >
                  {/* <Icon className="mr-2 h-4 w-4" aria-hidden="true" /> */}
                  {item.icon ?? <ChevronRight className="mr-2 h-10 w-10" />}
                  {open && <span>{item.title}</span>}
                </span>
              </Link>
            ) : (
              <span
                key={index}
                className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-gray-100 hover:underline"
              >
                {item.title}
              </span>
            );
          })}
      </div>
    </div>
  );
}
