import Link from 'next/link';

import type { GrantFundraising } from '@/lib/db/types';

import { IconPlaceholder } from '@tabler/icons-react';

export default function GrantCardPublic({
  grant,
}: {
  grant: GrantFundraising;
}) {
  return (
    <Link href={`/grant-fundraising/${grant?.id}`}>
      <div className="flex w-96 flex-col rounded-xl  border">
        <div
          aria-label="Product Placeholder"
          role="img"
          aria-roledescription="placeholder"
          className="flex aspect-video h-full w-full flex-1 items-center justify-center bg-secondary"
        >
          <IconPlaceholder />
        </div>
        <div className="p-6">
          <h2 className="font-bold">{grant?.title}</h2>
          <div className="my-4 flex items-center rounded-full border">
            <div className="mr-2 flex h-full items-center rounded-full bg-slate-400 p-2">
              <IconPlaceholder />
            </div>
            Project name
          </div>
        </div>
      </div>
    </Link>
  );
}
