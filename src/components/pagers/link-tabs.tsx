import { usePathname, useRouter } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Tab } from '@/lib/types';
import { cn } from '@/lib/utils';

export function LinkTabs({ tabs }: { tabs: Tab[] }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs
      className={cn('overflow-x-auto')}
      onValueChange={value => router.push(value)}
    >
      <TabsList defaultValue={tabs[0]?.href}>
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.title}
            value={tab.href}
            className={cn(
              pathname === `${tab.href}` && 'bg-primary text-white shadow-sm'
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
