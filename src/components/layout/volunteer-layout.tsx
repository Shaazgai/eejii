import { CalendarCheck, LayoutDashboard, UserCog } from 'lucide-react';

import Header from '../navigation/header';

interface VolunteerLayoutProps {
  children: React.ReactNode;
}

export default function VolunteerLayout({ children }: VolunteerLayoutProps) {
  const volunteerHeaderNav = [
    {
      title: 'Dashboard',
      href: '/s',
      icon: <LayoutDashboard className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Grant fundraising',
      href: '/s/manage/grant',
      icon: <CalendarCheck className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Join requests',
      href: '/s/join-requests',
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
