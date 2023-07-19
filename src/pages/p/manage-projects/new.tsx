import { useRouter } from 'next/router';

import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';

export default function NewProject() {
  const router = useRouter();
  return (
    <PartnerLayout>
      <Shell>
        <div className="flex justify-between">
          <h2>New project</h2>
        </div>
      </Shell>
    </PartnerLayout>
  );
}
