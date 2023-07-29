import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { FallbackImage } from './fallback-image';

const SectionHeader = ({
  src,

  variant,
  className,
  children,
}: {
  src: string;

  variant: string | undefined;
  className: string | undefined;
  children: ReactNode;
}) => {
  return (
    <div className={cn('relative overflow-hidden rounded-xl', className)}>
      <FallbackImage
        width={1500}
        height={300}
        className="aspect-video h-[250px] w-full object-cover object-center"
        alt="bg"
        src={src || '/images/placeholder.webp'}
      />
      <div
        className={`absolute  left-0 top-0 flex  w-full  p-4 ${
          variant === 'dark' ? 'text-gray-200' : 'text-gray-800'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default SectionHeader;
