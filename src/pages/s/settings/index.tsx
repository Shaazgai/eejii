import PartnerLayout from '@/components/layout/partner-layout';
import { SettingsTabs } from '@/components/pagers/settings-tabs';
import { UserProfile } from '@/components/section/user-profile';
import { Shell } from '@/components/shells/shell';

export default function ManageProjects() {
  return (
    <PartnerLayout>
      <Shell>
        <SettingsTabs />
        <div className="w-full overflow-hidden">
          <UserProfile />
        </div>
      </Shell>
    </PartnerLayout>
  );
}