import React from 'react';
// import BasicBaseLayout from '@/components/layout/basic-base-layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const components: {
  title: string;
  imagePath: string;
  href: string;
}[] = [
  {
    title: 'Төсөл хөтөлбөрүүд',
    imagePath: '/images/projectss/projectsIcon.png',
    href: '/docs/primitives/alert-dialog',
  },
  {
    title: 'Дэмжигч',
    imagePath: '/images/supporter/supporterIcon.png',
    href: '/docs/primitives/scroll-area',
  },
  {
    title: 'Арга хэмжээ',
    imagePath: '/images/eventss/calendar.png',
    href: '/docs/primitives/hover-card',
  },
  {
    title: 'Хамтрагч',
    imagePath: '/images/homie/chairity.png',
    href: '/docs/primitives/tabs',
  },
  {
    title: 'Сайн дурын ажил',
    imagePath: '/images/volunteer/volunteerIcon.png',
    href: '/docs/primitives/progress',
  },
  {
    title: 'Сайн дурын ажилтан',
    imagePath: '/images/homie/Vector.png',
    href: '/docs/primitives/tooltip',
  },
];

interface ListItemProps extends React.ComponentPropsWithoutRef<'a'> {
  imagePath: string; // Add this line to include the imagePath prop
  title: string;
}
const ListItem = React.forwardRef<React.ElementRef<'a'>, ListItemProps>(
  ({ className, imagePath, title, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="flex items-center gap-2">
              <Image
                src={imagePath}
                alt="Prjects"
                className="h-[24px] w-[29px]"
                height={24}
                width={30}
              />
              <div className="text-md font-semibold leading-none">{title}</div>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

export default function PublicHeader() {
  return (
    <nav className="bg-white">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex h-[72px] w-[215px] items-center">
          <Image
            src="/images/homie/foundation_logo.jpg"
            className="h-[72px] w-[215px]"
            alt="foundation Logo"
            height={72}
            width={72}
            quality={100}
          />
        </Link>
        <div className="hidden h-[72px] w-full items-center justify-between font-medium md:order-1 md:flex md:w-auto">
          <ul className="mt-4 flex h-full flex-col items-center rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Платформ</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {components.map(component => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                          imagePath={component.imagePath}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <li>
              <Link
                href="/medium"
                className="block rounded py-2 pl-3 pr-4 font-bold text-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-blue-500 md:p-0 md:hover:bg-transparent md:hover:text-primary md:dark:hover:bg-transparent"
              >
                Медиа
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block rounded py-2 pl-3 pr-4 font-bold text-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 md:p-0 md:hover:bg-transparent md:hover:text-primary md:dark:hover:bg-transparent"
              >
                Бидний тухай
              </Link>
            </li>
            <li>
              <Link
                href="/auth"
                className="block rounded py-2 pl-3 pr-4 font-bold text-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 md:p-0 md:hover:bg-transparent md:hover:text-primary md:dark:hover:bg-transparent"
              >
                Нэвтрэх
              </Link>
            </li>
            <li>
              <Button className="h-[48px] w-[106px] rounded-sm">
                <Link
                  href="/#"
                  className="block text-lg font-bold text-brand450"
                >
                  Donate
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
