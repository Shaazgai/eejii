import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';
import type { Event } from '@/lib/db/types';

export default function EventCard({ event }: { event: Event }) {
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
          <div className="h-[23px] border-l-[3px] border-brand800  pl-2 text-md font-bold">
            Хандив олох төсөл
          </div>
          <div className="text-lg font-semibold">{event?.title}</div>
          <div className="text-md">{event?.description}</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        <Button
          variant="outline"
          size="icon"
          className="h-[50px] w-[50px] border-none"
          onClick={() => router.push(`/p/manage/${event?.id}`)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
