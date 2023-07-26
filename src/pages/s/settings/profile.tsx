import PartnerLayout from '@/components/layout/partner-layout';
import { LinkTabs } from '@/components/pagers/link-tabs';
// import { SettingsTabs } from '@/components/pagers/settings-tabs';
import { Shell } from '@/components/shells/shell';
import SupporterFormContainer from '@/containers/supporter-form-container';

export default function ManageProjects() {
  const tabs = [
    {
      title: 'User profile',
      href: `/s/settings`,
    },
    {
      title: 'Supporter profile',
      href: `/s/settings/profile`,
    },
  ];
  return (
    <PartnerLayout>
      <Shell>
        <LinkTabs tabs={tabs} />
        <div className="container">
          <SupporterFormContainer />
        </div>
      </Shell>
    </PartnerLayout>
  );
}
