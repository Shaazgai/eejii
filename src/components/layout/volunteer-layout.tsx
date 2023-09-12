import { CalendarCheck, LayoutDashboard, UserCog } from 'lucide-react';

import HeaderV1 from '../navigation/headerV1';

interface VolunteerLayoutProps {
  children: React.ReactNode;
}

export default function VolunteerLayout({ children }: VolunteerLayoutProps) {
  const volunteerHeaderNav = [
    {
      title: 'Нүүр',
      href: '/v',
      icon: <LayoutDashboard className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Төсөл хөтөлөр',
      href: '/v/volunteer',
      icon: <CalendarCheck className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Хандив',
      href: '/v/donate',
      icon: <CalendarCheck className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Гэр бүл',
      href: '/v/join-requests',
      icon: <UserCog className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
  ];

  return (
    <div>
      <HeaderV1 headerNav={volunteerHeaderNav} />
      {children}
    </div>
  );
}
