import useStoreVolunteer from '@/lib/store/useStoreVolunteer';
import React from 'react';
import VolRegisterStep from './vol-register-step';
import PersonalInfo from './vol-step-personalInfo';
import Contact from './vol-step-contact';

export default function VolunteerRegisterForm() {
  const { step } = useStoreVolunteer(state => state);
  return (
    <div>
      <section className="relative h-[172px] w-full bg-[url('/images/bg-sidebar-mobile.svg')] bg-cover bg-no-repeat lg:hidden">
        <div className="flex justify-center pb-[34px] pt-[37px]">
          <VolRegisterStep stepNumber={1} />
          <VolRegisterStep stepNumber={2} />
          <VolRegisterStep stepNumber={3} />
          <VolRegisterStep stepNumber={4} />
        </div>
      </section>
      {step === 1 && <PersonalInfo />}
      {step === 2 && <Contact />}
      {/* {step === 2 && <Plan />}
      {step === 3 && <Addons />}
      {step === 4 && <Summary />} */}
    </div>
  );
}
