import React from 'react';
import PublicFooter from './sections/public-footer';
import { PublicHeader } from './sections/public-header';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <PublicHeader />
      {children}
      <PublicFooter />
    </>
  );
}
