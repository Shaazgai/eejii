import {
  CalendarCheck,
  Heart,
  HeartHandshake,
  LayoutDashboard,
  Newspaper,
  Settings,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import HeaderV2 from '../navigation/headerV2';
import Sidebar from '../navigation/sidebar';

interface PartnerLayoutProps {
  children: React.ReactNode;
}

export default function PartnerLayout({ children }: PartnerLayoutProps) {
  const sidebarNav = [
    {
      title: 'Dashboard',
      href: '/p',
      icon: <LayoutDashboard className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Manage Projects',
      href: '/p/manage',
      icon: <CalendarCheck className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Volunteers',
      href: '/p/volunteers',
      icon: <Users className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Collaboration',
      href: '/p/collaboration',
      icon: <HeartHandshake className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Donations',
      href: '/p/donations',
      icon: <Heart className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Media',
      href: '/p/media',
      icon: <Newspaper className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Settings',
      href: '/p/settings',
      icon: <Settings className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
  ];
  const [open, setOpen] = useState(true);

  return (
    // <div className="flex min-h-screen flex-col">
    //   <Header headerNav={[]} />
    //   <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
    //     <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
    //       <ScrollArea className="py-6 pr-6 lg:py-8">
    //         <Sidebar sidebarNav={sidebarNav} />
    //       </ScrollArea>
    //     </aside>
    //     <main className="flex w-full flex-col overflow-hidden">{children}</main>
    //   </div>
    //   {/* <SiteFooter /> */}
    // </div>
    <div className="">
      <div className="flex">
        <div className="fixed z-20 h-screen flex-none  border-r bg-indigo-500">
          <Sidebar open={open} setOpen={setOpen} sidebarNav={sidebarNav} />
        </div>
        <div className={`grow  ${open ? 'sm:ms-[300px]' : 'ms-[80px]'} `}>
          <HeaderV2 open={open} headerNav={[]} />
          <div className="py-20">{children}</div>
        </div>
      </div>
    </div>
  );
}
