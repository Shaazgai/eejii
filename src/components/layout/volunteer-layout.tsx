import {
  IconCalendarCheck,
  IconLayoutDashboard,
  IconUserCog,
} from '@tabler/icons-react';
import HeaderV1 from '../navigation/headerV1';
import Footer from './footer';

interface VolunteerLayoutProps {
  children: React.ReactNode;
}

export default function VolunteerLayout({ children }: VolunteerLayoutProps) {
  const volunteerHeaderNav = [
    {
      title: 'Нүүр',
      href: '/v',
      icon: <IconLayoutDashboard className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Төсөл хөтөлөр',
      href: '/v/events',
      icon: <IconCalendarCheck className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Хандив',
      href: '/v/project',
      icon: <IconCalendarCheck className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Гэр бүл',
      href: '/v/family',
      icon: <IconUserCog className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
  ];

  return (
    <div className="">
      <HeaderV1 headerNav={volunteerHeaderNav} />
      {children}
      <Footer />
    </div>
  );
}
