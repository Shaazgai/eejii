import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';
import type { Event } from '@/lib/db/types';

export default function EventCard({ event }: { event: Event }) {
  const router = useRouter();
  return (
    <div className="flex w-full justify-between rounded-md border ">
      <div className="flex">
        <div className="flex items-center justify-center border-r p-4">
          2022.10.10
        </div>
        <div className="flex flex-col p-4">
          <div>{event?.title}</div>
          <div>{event?.description}</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => router.push(`/p/manage/event/${event?.id}`)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
