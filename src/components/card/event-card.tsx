import Link from 'next/link';

import type { EventType } from '@/lib/types';

import { Icons } from '../icons';

export default function EventCardPublic({ event }: { event: EventType }) {
  console.log(event);
  return (
    <Link href={`/events/${event.id}`}>
      <div className="md:w-70 flex w-full flex-col  rounded-xl border ">
        <div
          aria-label="Product Placeholder"
          role="img"
          aria-roledescription="placeholder"
          className="flex aspect-video h-full w-full flex-1 items-center justify-center bg-secondary"
        >
          <Icons.placeholder
            className="h-9 w-9 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
        <div className="p-4">
          <h2 className="font-bold">{event?.title}</h2>
          <div className="my-4 flex items-center rounded-full border text-sm">
            <div className="mr-2 flex h-full items-center rounded-full bg-slate-400 p-2">
              <Icons.placeholder
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            {event?.Owner?.organization}
          </div>
        </div>
      </div>
    </Link>
  );
}
