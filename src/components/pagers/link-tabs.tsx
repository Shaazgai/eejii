import { usePathname, useRouter } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export function LinkTabs({ tabs }) {
  const router = useRouter();
  const pathname = usePathname();
  console.log('🚀 ~ file: link-tabs.tsx:9 ~ LinkTabs ~ pathname:', pathname);

  return (
    <Tabs
      className={cn('overflow-x-auto')}
      onValueChange={value => router.push(value)}
    >
      <TabsList>
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.title}
            value={tab.href}
            className={cn(
              pathname === `${tab.href}` &&
                'bg-background text-foreground shadow-sm'
            )}
            onClick={() => router.push(tab.href)}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
