import { useRouter } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export function NormalTabs({ tabs, activeIndex, setActiveIndex }) {
  const router = useRouter();

  return (
    <Tabs
      className={cn('w-full overflow-x-auto')}
      // onValueChange={value => router.push(value)}
    >
      <TabsList>
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.title}
            value={`${tab.index}`}
            className={cn(
              activeIndex === tab.index &&
                'bg-background text-foreground shadow-sm'
            )}
            onClick={() => setActiveIndex(tab.index)}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
