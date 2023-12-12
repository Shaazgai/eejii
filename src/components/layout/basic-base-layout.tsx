import React from 'react';

// import Footer from '@/components/layout/footer';
// import HeaderV1 from '@/components/navigation/headerV1';
import PublicFooter from './sections/public-footer';
import PublicHeader from './sections/public-header';

const BasicBaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicHeader />
      <main className="">{children}</main>
      <PublicFooter />
      {/* <PublicHeader headerNav={[]} />
      <main className="pt-12">{children}</main>
      <PublicFooter /> */}
    </>
  );
};

export default BasicBaseLayout;
