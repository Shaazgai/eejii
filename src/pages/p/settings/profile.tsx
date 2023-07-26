import PartnerLayout from '@/components/layout/partner-layout';
import { LinkTabs } from '@/components/pagers/link-tabs';
import { Shell } from '@/components/shells/shell';
import PartnerFormContainer from '@/containers/partner-form-container';

export default function ManageProjects() {
  const tabs = [
    {
      title: 'User profile',
      href: `/p/settings`,
    },
    {
      title: 'Partner profile',
      href: `/p/settings/profile`,
    },
  ];
  return (
    <PartnerLayout>
      <Shell>
        <LinkTabs tabs={tabs} />
        <div className="container">
          <PartnerFormContainer />
        </div>
      </Shell>
    </PartnerLayout>
  );
}
