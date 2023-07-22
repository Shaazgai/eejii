import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';
import type { FundraisingType } from '@/lib/types';
export default function GrantCard({ grant }: { grant: FundraisingType }) {
  console.log('🚀 ~ file: project-card.tsx:11 ~ fundraising:', grant);
  const router = useRouter();
  return (
    <div className="flex w-full justify-between rounded-md border ">
      <div className="flex">
        <div className="flex items-center justify-center border-r p-4">
          2022.10.10
        </div>
        <div className="flex flex-col p-4">
          <div>{grant?.title}</div>
          <div>{grant?.description}</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => router.push(`grant/${grant?.id}`)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
