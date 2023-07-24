import { CalendarCheck, LayoutDashboard, UserCog } from 'lucide-react';

import Header from '../navigation/header';

interface VolunteerLayoutProps {
  children: React.ReactNode;
}

export default function VolunteerLayout({ children }: VolunteerLayoutProps) {
  const volunteerHeaderNav = [
    {
      title: 'Dashboard',
      href: '/v',
      icon: <LayoutDashboard className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Events',
      href: '/v/events',
      icon: <CalendarCheck className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Fundraising',
      href: '/v/fundraising',
      icon: <CalendarCheck className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Join requests',
      href: '/v/join-requests',
      icon: <UserCog className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
  ];

  return (
    <>
      <Header headerNav={volunteerHeaderNav} />
      {children}
    </>
  );
}
