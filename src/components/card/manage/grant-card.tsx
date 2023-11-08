import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';
import type { GrantFundraising } from '@/lib/db/types';

export default function GrantCard({ grant }: { grant: GrantFundraising }) {
  console.log('🚀 ~ file: project-card.tsx:11 ~ fundraising:', grant);
  const router = useRouter();
  return (
    <div className="flex h-[176px] w-[1035px] justify-between rounded-md">
      <div className="flex">
        <div className="flex h-[156px] w-[150px] flex-col items-center justify-center border-r p-4">
          <div className="text-xl">Sep</div>
          <div className="text-3xl">04</div>
          <div className="text-brand5">2023</div>
        </div>
        <div className="flex flex-col justify-around p-7">
          <div className="h-[23px] border-l-[3px] border-brand100  pl-2 text-md font-bold">
            Хандив олох төсөл
          </div>
          <div className="text-lg font-semibold">{grant?.title}</div>
          <div className="text-md">{grant?.description}</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        <Button
          variant="outline"
          size="icon"
          className="h-[50px] w-[50px] border-none"
          onClick={() => router.push(`/p/manage/${grant?.id}`)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
