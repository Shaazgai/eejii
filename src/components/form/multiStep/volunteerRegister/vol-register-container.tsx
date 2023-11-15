import VolRegisterSidebar from './vol-register-sidebar';
import { cn } from '@/lib/utils';
import React from 'react';
import VolRegisterFooter from './vol-register-footer';
import useStoreVolunteer from '@/lib/store/useStoreVolunteer';

type TContainer = {
  children: React.ReactNode;
  className?: string;
  onNext: () => void;
  onPreviousStep?: () => void;
};

export default function VolRegisterContainer({
  children,
  className,
  onNext,
  onPreviousStep,
}: TContainer) {
  const { step, isSubmitted } = useStoreVolunteer(state => state);
  return (
    <>
      <section
        className={cn(
          'c-shadow absolute left-1/2 top-[103px] min-h-[376px] w-80 -translate-x-1/2 rounded-[15px] bg-white px-6 py-8 lg:static lg:left-0 lg:mx-auto lg:mt-[103px] lg:flex lg:min-h-[600px] lg:w-[940px] lg:-translate-x-0 lg:gap-[100px] lg:p-4 lg:px-[100px] lg:pt-10',
          className
        )}
      >
        <VolRegisterSidebar />
        <div className="relative mr-[80px] w-full">
          {children}
          {!isSubmitted && (
            <VolRegisterFooter
              className="hidden lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:inline-flex"
              onHandleNextStep={onNext}
              onHandlePreviousStep={onPreviousStep}
            />
          )}
        </div>
      </section>
      {!isSubmitted && (
        <VolRegisterFooter
          className={cn(
            'absolute bottom-0 left-0 right-0 inline-flex lg:hidden',
            { '-bottom-32': step === 2 }
          )}
          onHandleNextStep={onNext}
          onHandlePreviousStep={onPreviousStep}
        />
      )}
    </>
  );
}
