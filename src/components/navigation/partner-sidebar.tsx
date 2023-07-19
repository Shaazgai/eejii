import Link from 'next/link';
import { useRouter } from 'next/router';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

const sidebarNav = [
  {
    title: 'Dashboard',
    href: '/p',
    icon: 'layoutDashboard',
    items: [],
  },
  {
    title: 'Manage Projects',
    href: '/p/manage-projects',
    icon: 'calendarCheck',
    items: [],
  },
  {
    title: 'Volunteers',
    href: '/p/billing',
    icon: 'users',
    items: [],
  },
  {
    title: 'Donations',
    href: '/p/purchases',
    icon: 'heart',
    items: [],
  },
  {
    title: 'Media',
    href: '/p/purchases',
    icon: 'newspaper',
    items: [],
  },
  {
    title: 'Settings',
    href: '/p/settings',
    icon: 'settings',
    items: [],
  },
];
export default function PartnerSideBar() {
  const { asPath } = useRouter();

  return (
    <div className="flex w-full flex-col gap-2">
      {sidebarNav.map((item, index) => {
        const Icon = Icons[item.icon ?? 'chevronLeft'];

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
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
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
