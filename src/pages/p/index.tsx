import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';

export default function index() {
  return (
    <PartnerLayout>
      <Shell variant="sidebar">PartnerHeader</Shell>
    </PartnerLayout>
  );
}
