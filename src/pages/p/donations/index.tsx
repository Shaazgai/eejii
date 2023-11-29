import SectionHeader from '@/components/common/section-header';
import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';
import { api } from '@/utils/api';

export default function Donations() {
  const { data: donations, isLoading } = api.user.getMyDonations.useQuery({
    limit: 10,
  });

  return (
    <PartnerLayout>
      <Shell variant="sidebar" className="px-10">
        <SectionHeader src={''} variant={undefined} className={undefined}>
          <h2 className="text-3xl font-semibold">Donations</h2>
          {/* <div className="item-center flex h-full w-full justify-center  text-3xl font-semibold backdrop-blur-sm">
            {donations && priceFormatter.format(totalDonation)}
          </div> */}
        </SectionHeader>
        <div>
          {!isLoading && donations
            ? donations.map(donation => (
                <span key={donation.id}>{donation.id}</span>
              ))
            : '...loading'}
        </div>
      </Shell>
    </PartnerLayout>
  );
}
