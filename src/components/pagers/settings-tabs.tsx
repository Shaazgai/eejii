import { usePathname, useRouter } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export function SettingsTabs() {
  const router = useRouter();
  const pathname = usePathname();
  console.log(
    '🚀 ~ file: settings-tabs.tsx:9 ~ SettingsTabs ~ pathname:',
    pathname
  );

  const tabs = [
    {
      title: 'Profile',
      href: `/p/settings`,
    },
    {
      title: 'Partner profile',
      href: `/p/settings/partner-profile`,
    },
  ];

  return (
    <Tabs
      className={cn('w-full overflow-x-auto')}
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
