import {
  CalendarCheck,
  Heart,
  LayoutDashboard,
  Newspaper,
  Settings,
  Users,
} from 'lucide-react';

import Sidebar from '../navigation/sidebar';
import { ScrollArea } from '../ui/scroll-area';
import Header from './header';

interface SupporterLayoutProps {
  children: React.ReactNode;
}

export default function SupporterLayout({ children }: SupporterLayoutProps) {
  const sidebarNav = [
    {
      title: 'Dashboard',
      href: '/s',
      icon: <LayoutDashboard className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Manage Projects',
      href: '/s/manage',
      icon: <CalendarCheck className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Volunteers',
      href: '/s/billing',
      icon: <Users className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Donations',
      href: '/s/purchases',
      icon: <Heart className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Media',
      href: '/s/purchases',
      icon: <Newspaper className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Settings',
      href: '/s/settings',
      icon: <Settings className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
  ];
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <Sidebar sidebarNav={sidebarNav} />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
      {/* <SiteFooter /> */}
    </div>
  );
}
