import { useRouter } from 'next/router';

import PartnerLayout from '@/components/layout/partner-layout';
import { SettingsTabs } from '@/components/pagers/settings-tabs';
import { Shell } from '@/components/shells/shell';

export default function ManageProjects() {
  const router = useRouter();
  return (
    <PartnerLayout>
      <Shell>
        <SettingsTabs />
      </Shell>
    </PartnerLayout>
  );
}
