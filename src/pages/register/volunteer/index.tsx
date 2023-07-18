import React from 'react';

import BasicBaseLayout from '@/components/layout/basic-base-layout';
import VolunteerFormContainer from '@/containers/volunteer-form-container';

const Index = () => {
  return (
    <BasicBaseLayout>
      <VolunteerFormContainer />
    </BasicBaseLayout>
  );
};

export default Index;
