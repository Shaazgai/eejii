import Link from 'next/link';

import type { FundWithOwner } from '@/lib/types';

import { FallbackImage } from '../common/fallback-image';
import { Icons } from '../icons';

export default function FundCardPublic({
  fund,
  isVolunteer,
}: {
  fund: FundWithOwner;
  isVolunteer: boolean;
}) {
  const image =
    Array.isArray(fund.Images) && fund.Images.length > 0
      ? process.env.NEXT_PUBLIC_AWS_PATH +
        '/' +
        fund.Images.find(i => i.type === 'main')?.path
      : null;
  return (
    <Link href={`/${isVolunteer ? 'v/' : ''}fundraising/${fund.id}`}>
      <div className="md:w-70 flex w-full flex-col rounded-xl  border bg-brand450 ">
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
          <h2 className="font-bold">{fund?.title}</h2>
          <div className="my-4 flex items-center rounded-full border text-sm">
            <div className="mr-2 flex h-full items-center rounded-full bg-slate-400 p-2">
              <Icons.placeholder
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            Project name
          </div>
        </div>
      </div>
    </Link>
  );
}
