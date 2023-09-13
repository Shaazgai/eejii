import { useState } from 'react';

import EventForm from '@/components/form/event-form';
import FundraisingForm from '@/components/form/fundraising-form';
import GrantFundraisingForm from '@/components/form/grant-fundraising-form';
import PartnerLayout from '@/components/layout/partner-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Shell } from '@/components/shells/shell';

export default function NewProject() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [
    {
      title: 'Fundraising',
      index: 0,
    },
    {
      title: 'Grant-fundraising',
      index: 1,
    },
    {
      title: 'Event',
      index: 2,
    },
  ];

  return (
    <PartnerLayout>
      <Shell>
        <NormalTabs
          tabs={tabs}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        {activeIndex == 0 && <FundraisingForm data={undefined} />}
        {activeIndex == 1 && <GrantFundraisingForm />}
        {activeIndex == 2 && <EventForm data={undefined} />}
      </Shell>
    </PartnerLayout>
  );
}
