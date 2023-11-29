import {
  CalendarCheck,
  Heart,
  HeartHandshake,
  LayoutDashboard,
  Newspaper,
  Settings,
} from 'lucide-react';
import { useState } from 'react';

import HeaderV2 from '../navigation/headerV2';
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
      slug: '',
      icon: <LayoutDashboard className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Grant fundraising',
      href: '/s/manage/grant',
      slug: 'manage',
      icon: <CalendarCheck className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Collabration',
      href: '/s/collaboration',
      slug: 'collaboration',
      icon: <HeartHandshake className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },

    {
      title: 'Donations',
      href: '/s/donations',
      slug: 'donations',
      icon: <Heart className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Media',
      href: '/s/media',
      slug: 'media',
      icon: <Newspaper className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Settings',
      href: '/s/settings',
      slug: 'settings',
      icon: <Settings className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
  ];
  return (
    <div className="">
      <div className="flex">
        <div className="fixed z-20 h-screen flex-none border-r bg-sidebar text-sidebar-foreground">
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
