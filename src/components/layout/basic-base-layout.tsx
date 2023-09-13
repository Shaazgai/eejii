import React from 'react';

import Footer from '@/components/layout/footer';
import HeaderV1 from '@/components/navigation/headerV1';

const BasicBaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderV1 headerNav={[]} />
      <main className="pt-12">{children}</main>
      <Footer />
    </>
  );
};

export default BasicBaseLayout;
