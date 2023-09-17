import { useRouter } from 'next/router';
import React from 'react';

import SectionHeader from '@/components/common/section-header';
import { LinkTabs } from '@/components/pagers/link-tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ManageProjectsHeading = () => {
  const router = useRouter();
  const tabs = [
    {
      title: `Fundraising ()`,
      href: '/p/manage',
    },
    {
      title: `Grant-fundraising ()`,
      href: '/p/manage/grant',
    },
    {
      title: `Event ()`,
      href: '/p/manage/event',
    },
  ];
  return (
    <>
      <SectionHeader
        src={'/images/placeholder.svg'}
        variant="dark"
        className=""
      >
        <div className="flex w-full items-center justify-between">
          <h2 className="text-3xl capitalize">Manage projects</h2>
          <Button
            className="rounded-full border bg-primary hover:bg-gray-200 hover:text-gray-950"
            onClick={() => router.push('/p/manage/new')}
          >
            Add
          </Button>
        </div>
      </SectionHeader>
      <div className="flex justify-between">
        <LinkTabs tabs={tabs} />
        <Link className="flex items-center gap-2 border px-4 py-0 rounded-full hover:bg-primary hover:text-white" href={'/p/manage/requests'}>
          Manage request
          <ArrowRight />
        </Link>
      </div>
    </>
  );
};

export default ManageProjectsHeading;
