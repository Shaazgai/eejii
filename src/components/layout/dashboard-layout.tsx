import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex">{children}</div>;
};

export default DashboardLayout;
