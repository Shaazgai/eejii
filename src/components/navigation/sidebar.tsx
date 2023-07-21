import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

import { cn } from '@/lib/utils';
interface SidebarProps {
  title: string;
  href: string;
  icon: ReactElement;
  items: string[];
  external: string;
}
export default function Sidebar({
  sidebarNav,
}: {
  sidebarNav: SidebarProps[];
}) {
  const { asPath } = useRouter();

  return (
    <div className="flex w-full flex-col gap-2">
      {sidebarNav &&
        sidebarNav?.map((item, index) => {
          // const Icon = item.icon ?? <ChevronRight />;

          return item.href ? (
            <Link
              key={index}
              href={item.href}
              target={item.external ? '_blank  ' : ''}
              rel={item.external ? 'noreferrer' : ''}
            >
              <span
                className={cn(
                  'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground',
                  asPath === item.href
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground'
                  // item.disabled && 'pointer-events-none opacity-60'
                )}
              >
                {/* <Icon className="mr-2 h-4 w-4" aria-hidden="true" /> */}
                {item.icon ?? <ChevronRight className='"mr-2 w-4" h-4' />}
                <span>{item.title}</span>
              </span>
            </Link>
          ) : (
            <span
              key={index}
              className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
            >
              {item.title}
            </span>
          );
        })}
    </div>
  );
}
