import type { Dispatch, SetStateAction } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface TabProps {
  tabs: {
    title: string;
    index: number;
  }[];
  setActiveIndex: Dispatch<SetStateAction<number>>;
  activeIndex: number;
}

export function NormalTabs({
  tabs,
  activeIndex,
  setActiveIndex,
  ...props
}: TabProps) {
  // const router = useRouter();

  return (
    <Tabs
      className={cn('w-full overflow-x-auto bg-transparent')}
      // onValueChange={value => router.push(value)}
    >
      <TabsList>
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.title}
            value={`${tab.index}`}
            className={cn(
              activeIndex === tab.index &&
                'bg-primary text-foreground shadow-sm'
            )}
            onClick={() => setActiveIndex(tab.index)}
            {...props}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
