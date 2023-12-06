import { api } from '@/utils/api';
import { Indicator } from '@mantine/core';
import { formatDistance } from 'date-fns';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { FallbackImage } from './fallback-image';

const NotificationMenu = () => {
  const { data: notifications, isLoading } =
    api.user.getNotifications.useQuery();

  const { mutate: seen } = api.user.setSeen.useMutation();
  function handleSeen(id: string) {
    seen({ id: id });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" relative flex h-[40px] w-[40px] items-center justify-center gap-2 rounded-full bg-zinc-100 p-2 hover:bg-zinc-200 focus:outline-none">
        <Indicator
          inline
          size={20}
          offset={-5}
          position="bottom-end"
          color="red"
          withBorder
          label={notifications?.filter(n => n.status === 'new')?.length}
        >
          <Bell size={24} />
        </Indicator>
        {/* {notifications &&
          notifications?.filter(n => n.status === 'new')?.length > 0 && (
            <span className="absolute right-2 top-0 flex translate-x-1/2 rounded-full bg-red-400 px-2 text-sm font-bold text-red-50">
              {notifications?.filter(n => n.status === 'new')?.length}
            </span>
          )} */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuLabel>My notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!isLoading &&
            notifications?.map((notification, i) => {
              return (
                <Link
                  key={i}
                  onClick={() => {
                    handleSeen(notification.id);
                  }}
                  href={notification.link ? (notification.link as string) : '#'}
                >
                  <DropdownMenuItem
                    className={`flex gap-2 rounded-none ${
                      notification.status != 'seen'
                        ? 'border-l-2 border-indigo-500'
                        : ''
                    }`}
                  >
                    <div className="relative h-20 w-20 flex-none">
                      <FallbackImage
                        src={''}
                        className="h-20 w-20 rounded-full"
                        alt="avatar"
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className="align flex grow flex-col items-stretch justify-between">
                      <strong className="">{notification.title}</strong>
                      <div className="align-center  flex flex-row items-center gap-2 text-slate-600">
                        <span>
                          {formatDistance(new Date(), notification.createdAt)}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </Link>
              );
            })}
          {/* <DropdownMenuItem>
            <Link href={'/v/settings'}>Settings</Link>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMenu;
