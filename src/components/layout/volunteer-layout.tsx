import {
  IconCalendarCheck,
  IconLayoutDashboard,
  IconUserCog,
} from '@tabler/icons-react';
import { HeaderV1 } from '../navigation/headerV1';
import PublicFooter from './sections/public-footer';

interface VolunteerLayoutProps {
  children: React.ReactNode;
}

export default function VolunteerLayout({ children }: VolunteerLayoutProps) {
  const volunteerHeaderNav = [
    {
      title: 'Нүүр',
      href: '/v',
      slug: '',
      icon: <IconLayoutDashboard className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Төсөл хөтөлөр',
      href: '/v/events',
      slug: 'events',
      icon: <IconCalendarCheck className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Хандив',
      href: '/v/projects',
      slug: 'projects',
      icon: <IconCalendarCheck className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
    {
      title: 'Гэр бүл',
      href: '/v/family',
      slug: 'family',
      icon: <IconUserCog className='"mr-2 w-4" h-4' />,
      items: [],
      external: '',
    },
  ];

  return (
    <div className="bg-[#FBFBFB]">
      <HeaderV1 headerNav={volunteerHeaderNav} />
      {children}
      <PublicFooter />
    </div>
  );
}
