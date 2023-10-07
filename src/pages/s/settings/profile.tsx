import PartnerLayout from '@/components/layout/partner-layout';
import { LinkTabs } from '@/components/pagers/link-tabs';
import { Shell } from '@/components/shells/shell';

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
        <div className="container"></div>
      </Shell>
    </PartnerLayout>
  );
}
