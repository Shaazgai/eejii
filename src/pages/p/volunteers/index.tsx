import { useRouter } from 'next/router';

import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import { api } from '@/utils/api';
import { useSession } from 'next-auth/react';

export default function Volunteers() {
  const router = useRouter();
  const session = useSession();

  const { data: volunteers } = api.eventAssociation.getMyVolunteer.useQuery({
    partnerId: session.data?.user.id as string,
  });
  console.log(volunteers);
  return (
    <PartnerLayout>
      <Shell>
        <div className="flex justify-between">
          <h2>manage-projects</h2>
          <Button onClick={() => router.push('manage/new')}>Add</Button>
        </div>
      </Shell>
    </PartnerLayout>
  );
}
