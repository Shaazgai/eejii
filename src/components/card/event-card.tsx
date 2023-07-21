import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';

import type { FundaisingType } from '@/lib/types';

import { Button } from '../ui/button';
export default function EventCard({
  fundraising,
}: {
  fundraising: FundaisingType;
}) {
  console.log('🚀 ~ file: project-card.tsx:11 ~ fundraising:', fundraising);
  const router = useRouter();
  return (
    <div className="flex w-full justify-between rounded-md border ">
      <div className="flex">
        <div className="flex items-center justify-center border-r p-4">
          2022.10.10
        </div>
        <div className="flex flex-col p-4">
          <div>{fundraising?.title}</div>
          <div>{fundraising?.description}</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => router.push(`/p/manage/event/${fundraising?.id}`)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
