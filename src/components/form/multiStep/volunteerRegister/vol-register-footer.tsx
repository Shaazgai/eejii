'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import useStoreVolunteer from '@/lib/store/useStoreVolunteer';

type TFooter = {
  className?: string;
  onHandleNextStep?: () => void;
  onHandlePreviousStep?: () => void;
};

export default function VolRegisterFooter({
  className,
  onHandleNextStep,
  onHandlePreviousStep,
}: TFooter) {
  const step = useStoreVolunteer(state => state.step);
  return (
    <footer className={cn('flex items-center justify-between  p-4', className)}>
      {step === 1 && <div className="w-full" />}

      {step > 1 && (
        <Button
          variant="ghost"
          className="text-c-neutral-cool-gray hover:text-c-primary-marine-blue"
          onClick={onHandlePreviousStep}
        >
          Go Back
        </Button>
      )}
      <Button
        // className={cn('', {
        //   'bg-c-primary-purplish-blue hover:bg-c-primary-purplish-hover':
        //     step === 4,
        // })}
        // variant={'secondary'}
        className="bg-primary"
        onClick={onHandleNextStep}
      >
        {step === 4 ? 'Confirm' : 'Next Step'}
      </Button>
    </footer>
  );
}
