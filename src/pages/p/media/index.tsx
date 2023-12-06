import { useRouter } from 'next/router';

import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';

export default function Media() {
  const router = useRouter();

  return (
    <PartnerLayout>
      <Shell variant="sidebar" className="bg-brand1000 px-10">
        <div className="flex h-[264px] justify-between bg-[url('/images/media/mediaBG.png')] p-7">
          <h2 className="text-3xl font-bold">Мэдээ</h2>
          <Button
            onClick={() => router.push('manage/new')}
            className="h-[34px] w-[133px]"
          >
            Мэдээ оруулах
          </Button>
        </div>
      </Shell>
    </PartnerLayout>
  );
}
