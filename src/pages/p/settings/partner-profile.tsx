import { useRouter } from 'next/router';

import PartnerLayout from '@/components/layout/partner-layout';
import { SettingsTabs } from '@/components/pagers/settings-tabs';
import { Shell } from '@/components/shells/shell';
import { useSession } from '@/context/sessionContext';

export default function ManageProjects() {
  const router = useRouter();
  const { user } = useSession();
  console.log(
    '🚀 ~ file: partner-profile.tsx:11 ~ ManageProjects ~ user:',
    user
  );
  return (
    <PartnerLayout>
      <Shell>
        <SettingsTabs />

        {user?.externalId}
      </Shell>
    </PartnerLayout>
  );
}
