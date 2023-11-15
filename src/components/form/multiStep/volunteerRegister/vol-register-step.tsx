import { cn } from '@/lib/utils';
import useStoreVolunteer from '@/lib/store/useStoreVolunteer';
import React from 'react';

type TStep = {
  stepNumber: number;
  smallTitle?: string;
  sectionTitle?: string;
};

export default function VolRegisterStep({
  stepNumber = 1,
  smallTitle = '',
  sectionTitle = '',
}: TStep) {
  const step = useStoreVolunteer(state => state.step);

  return (
    <section className="flex items-center gap-4 uppercase">
      <p
        className={cn(
          'text-c-neutral-white border-c-neutral-white flex h-[33px] w-[33px] items-center justify-center rounded-full border text-sm font-bold',
          {
            'bg-c-primary-light-blue text-c-primary-marine-blue border-c-primary-light-blue':
              stepNumber === step,
          }
        )}
      >
        {stepNumber}
      </p>
      <div className="flex flex-col">
        <p className="text-c-primary-pastel-blue text-xs">{smallTitle}</p>
        <p className="text-c-neutral-white text-sm font-bold">{sectionTitle}</p>
      </div>
    </section>
  );
}
