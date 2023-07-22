import React from 'react';

import Footer from '@/components/layout/footer';
import Header from '@/components/navigation/header';

const BasicBaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header headerNav={[]} />
      {children}
      <Footer />
    </>
  );
};

export default BasicBaseLayout;
