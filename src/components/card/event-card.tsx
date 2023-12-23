import Link from 'next/link';

import type { Event } from '@/lib/types';

import { IconPlaceholder } from '@tabler/icons-react';
import { FallbackImage } from '../common/fallback-image';

export default function EventCardPublic({
  event,
  isVolunteer,
}: {
  event: Event;
  isVolunteer: boolean;
}) {
  const image =
    Array.isArray(event.Images) && event.Images.length > 0
      ? process.env.NEXT_PUBLIC_AWS_PATH +
        '/' +
        event.Images.find(i => i.type === 'main')?.path
      : null;
  console.log(image);
  return (
    <Link href={`/${isVolunteer ? 'v/' : ''}events/${event.id}`}>
      <div className="md:w-70 flex w-full flex-col  rounded-xl border ">
        <div
          aria-label="Product Placeholder"
          role="img"
          aria-roledescription="placeholder"
          className="flex aspect-video h-full w-full flex-1 items-center justify-center bg-secondary"
        >
          <FallbackImage
            src={image as string}
            width={500}
            height={500}
            alt="event-image"
          />
        </div>
        <div className="p-4">
          <h2 className="font-bold">{event?.title}</h2>
          <div className="my-4 flex items-center rounded-full border text-sm">
            <div className="mr-2 flex h-full items-center rounded-full bg-slate-400 p-2">
              <IconPlaceholder />
            </div>
            {event?.Owner?.organizationName}
          </div>
        </div>
      </div>
    </Link>
  );
}
