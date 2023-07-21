import PartnerLayout from '@/components/layout/partner-layout';
import { LinkTabs } from '@/components/pagers/link-tabs';
import { UserProfile } from '@/components/section/user-profile';
import { Shell } from '@/components/shells/shell';

export default function ManageProjects() {
  const tabs = [
    {
      title: 'Profile',
      href: `/p/settings`,
    },
    {
      title: 'Partner profile',
      href: `/p/settings/partner-profile`,
    },
  ];
  return (
    <PartnerLayout>
      <Shell>
        <LinkTabs tabs={tabs} />
        <div className="w-full overflow-hidden">
          <UserProfile />
        </div>
      </Shell>
    </PartnerLayout>
  );
}
