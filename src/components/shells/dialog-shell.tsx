'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IconX } from '@tabler/icons-react';

interface DialogShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DialogShell({
  children,
  className,
  ...props
}: DialogShellProps) {
  const router = useRouter();

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.back();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [router]);

  return (
    <div className={cn(className)} {...props}>
      <Button
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        onClick={() => router.back()}
      >
        <IconX />
        <span className="sr-only">Close</span>
      </Button>
      {children}
    </div>
  );
}
