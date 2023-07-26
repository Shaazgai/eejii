import {
  CalendarCheck,
  Heart,
  LayoutDashboard,
  Newspaper,
  Settings,
  UserCog,
} from 'lucide-react';
import { useState } from 'react';

import Header from '../navigation/header';
import Sidebar from '../navigation/sidebar';

interface SupporterLayoutProps {
  children: React.ReactNode;
}

export default function SupporterLayout({ children }: SupporterLayoutProps) {
  const [open, setOpen] = useState(true);
  const sidebarNav = [
    {
      title: 'Dashboard',
      href: '/s',
      icon: <LayoutDashboard className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Grant fundraising',
      href: '/s/manage/grant',
      icon: <CalendarCheck className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Join requests',
      href: '/s/join-requests',
      icon: <UserCog className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },

    {
      title: 'Donations',
      href: '/s/purchases',
      icon: <Heart className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Media',
      href: '/s/purchases',
      icon: <Newspaper className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Settings',
      href: '/s/settings',
      icon: <Settings className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
  ];
  return (
    <div className="">
      <div className="flex">
        <div className="fixed z-20 h-screen flex-none  border-r bg-indigo-500">
          <Sidebar open={open} setOpen={setOpen} sidebarNav={sidebarNav} />
        </div>
        <div className={`grow  ${open ? 'sm:ms-[300px]' : 'ms-[80px]'} `}>
          <Header setOpen={setOpen} open={open} headerNav={[]} />
          <div className="p-20">{children}</div>
        </div>
      </div>
    </div>
  );
}
