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
      slug: '',
      icon: <LayoutDashboard className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Manage Projects',
      href: '/p/manage',
      slug: 'manage',
      icon: <CalendarCheck className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Volunteers',
      href: '/p/volunteering',
      slug: 'volunteering',
      icon: <Users className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Collaboration',
      href: '/p/collaboration',
      slug: 'collaboration',
      icon: <HeartHandshake className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Donations',
      href: '/p/donations',
      slug: 'donations',
      icon: <Heart className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Media',
      href: '/p/media',
      slug: 'media',
      icon: <Newspaper className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
    {
      title: 'Settings',
      href: '/p/settings',
      slug: 'settings',
      icon: <Settings className="ml-1 mr-1 h-7 w-7" />,
      items: [],
      external: '',
    },
  ];
  const [open, setOpen] = useState(true);

  return (
    <div className="">
      <div className="flex">
        <div className="fixed z-20 h-screen flex-none border-r bg-sidebar text-sidebar-foreground">
          <Sidebar open={open} setOpen={setOpen} sidebarNav={sidebarNav} />
        </div>
        <div className={`grow  ${open ? 'sm:ms-[300px]' : 'ms-[80px]'} `}>
          <HeaderV2 open={open} headerNav={[]} />
          <div className="bg-brand450 pb-0 pt-20">{children}</div>
        </div>
      </div>
    </div>
  );
}
