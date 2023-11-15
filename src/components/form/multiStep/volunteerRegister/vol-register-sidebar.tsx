import VolRegisterStep from './vol-register-step';
import React from 'react';

export default function VolRegisterSidebar() {
  return (
    <aside className="hidden rounded-lg pt-10 lg:flex lg:h-[568px] lg:w-[274px] lg:flex-shrink-0 lg:flex-col lg:gap-8 lg:bg-[url('/images/bg-sidebar-desktop.svg')] lg:px-8">
      <VolRegisterStep
        stepNumber={1}
        smallTitle="Алхам 1"
        sectionTitle="Холбоо барих"
      />
      <VolRegisterStep
        stepNumber={2}
        smallTitle="Алхам 2"
        sectionTitle="Хувийн мэдээлэл"
      />
      <VolRegisterStep
        stepNumber={3}
        smallTitle="Алхам 3"
        sectionTitle="Гэрийн хаяг"
      />
      <VolRegisterStep
        stepNumber={4}
        smallTitle="Алхам 4"
        sectionTitle="Танилцуулга"
      />
    </aside>
  );
}
