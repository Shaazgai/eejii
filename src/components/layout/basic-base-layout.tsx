import React from 'react';

import PublicFooter from './sections/public-footer';
import { PublicHeader } from './sections/public-header';

const BasicBaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicHeader />
      <main className="">{children}</main>
      <PublicFooter />
    </>
  );
};

export default BasicBaseLayout;
