import SectionHeader from '@/components/common/section-header';
import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';
import { Card, CardHeader } from '@/components/ui/card';

export default function index() {
  return (
    <PartnerLayout>
      <Shell variant="sidebar">
        <div className="space-y-4 px-10">
          <SectionHeader src={''} variant={undefined} className={undefined}>
            <h2 className="text-2xl font-semibold">Dashboard</h2>
          </SectionHeader>
          <div className="flex gap-4 ">
            <Card className="grow">
              <CardHeader>My projects</CardHeader>
            </Card>
            <Card className="grow">
              <CardHeader>My volunteers</CardHeader>
            </Card>
          </div>
        </div>
      </Shell>
    </PartnerLayout>
  );
}
