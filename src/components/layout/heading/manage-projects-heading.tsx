import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SectionHeader from '@/components/common/section-header';
import { LinkTabs } from '@/components/pagers/link-tabs';
import { Button } from '@/components/ui/button';

const Tabs = () => {
  const tabs = [
    {
      title: `Хандив өгөх төсөл`,
      href: '/p/manage',
    },
    {
      title: `Хандив олох төсөл`,
      href: '/p/manage/grant',
    },
    {
      title: `Арга хэмжээ`,
      href: '/p/manage/event',
    },
  ];
  return (
    <div className="flex justify-between">
      <LinkTabs tabs={tabs} />
      <Link
        className="flex items-center gap-2 rounded-full border px-4 py-0 hover:bg-primary hover:text-white"
        href={'/p/manage/requests'}
      >
        Manage request
        <ArrowRight />
      </Link>
    </div>
  );
};

const ManageProjectsHeading = () => {
  const router = useRouter();
  return (
    <>
      <SectionHeader
        src={'/images/projectss/projectBG.png'}
        variant="dark"
        className=""
      >
        <div className="flex w-full items-center justify-between pl-4 pr-7 pt-4">
          <h2 className="text-3xl font-semibold text-brand400">
            Төсөл,хөтөлбөрүүд
          </h2>
          <Button
            className="border border-brand40 bg-transparent font-bold text-primary hover:bg-transparent"
            onClick={() => router.push('/p/manage/new')}
          >
            Төсөл нэмэх
          </Button>
        </div>
      </SectionHeader>
      <Tabs />
    </>
  );
};

export default ManageProjectsHeading;
