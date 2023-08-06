import { useState } from 'react';

import SectionHeader from '@/components/common/section-header';
import PartnerLayout from '@/components/layout/partner-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Shell } from '@/components/shells/shell';
import { api } from '@/utils/api';

export default function Donations() {
  // const router = useRouter();
  // const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    {
      title: 'My donated',
      index: 0,
    },
    {
      title: 'Donated to you',
      index: 1,
    },
  ];
  const { data: donations, isFetching } = api.user.getMyDonations.useQuery({
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
        <NormalTabs
          tabs={tabs}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
        <div>
          {!isFetching &&
            donations &&
            donations.map(donation => (
              <span key={donation.id}>{donation.id}</span>
            ))}
        </div>
      </Shell>
    </PartnerLayout>
  );
}
