import { useState } from 'react';

import EventForm from '@/components/form/event-form';
import FundraisingForm from '@/components/form/fundraising-form';
import GrantFundraisingForm from '@/components/form/grant-fundraising-form';
import SupporterLayout from '@/components/layout/supporter-layout';
import { NormalTabs } from '@/components/pagers/normal-tabs';
import { Shell } from '@/components/shells/shell';

export default function NewProject() {
  return (
    <SupporterLayout>
      <Shell>
        {/* <div className="flex justify-between"> */}
        {/*   <h2>New project</h2> */}
        {/* </div> */}
        <GrantFundraisingForm data={undefined} />
      </Shell>
    </SupporterLayout>
  );
}
