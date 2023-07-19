import { useRouter } from 'next/router';

import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';

export default function ManageProjects() {
  const router = useRouter();
  return (
    <PartnerLayout>
      <Shell>
        <div className="flex justify-between">
          <h2>manage-projects</h2>
          <Button onClick={() => router.push('manage-projects/new')}>
            Add
          </Button>
        </div>
      </Shell>
    </PartnerLayout>
  );
}
