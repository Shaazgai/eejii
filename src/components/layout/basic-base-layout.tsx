import React from 'react';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

const BasicBaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default BasicBaseLayout;
