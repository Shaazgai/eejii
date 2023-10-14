import { Button } from '../ui/button';
import { UserType } from '@/lib/db/enums';
import type { User } from '@/lib/db/types';

export const UserList = ({
  users,
  invite,
  projectId,
  userType,
  isInviteLoading,
}: {
  users: User[];
  invite: (id: string, userId: string) => void;
  projectId: string;
  userType: string;
  isInviteLoading: boolean;
}) => {
  return (
    <div>
      <h3 className="font-bold">
        {userType === UserType.USER_PARTNER && 'Partners'}
        {userType === UserType.USER_SUPPORTER && 'Supporter'}
        {userType === UserType.USER_VOLUNTEER && 'Volunteer'}
      </h3>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {users ? (
          users?.map((user, i) => (
            <li className="py-3 sm:py-4" key={i}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {/* <img
                    className="h-8 w-8 rounded-full"
                    src="/eejii.jpeg"
                    alt="avatar image"
                  /> */}
                  {user?.id as unknown as string}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {user.organization}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                  {/* <p>{user.id}</p> */}
                </div>
                <div className="text-base inline-flex items-center font-semibold text-gray-900 dark:text-white">
                  <Button
                    disabled={isInviteLoading}
                    onClick={() => {
                      invite(projectId, user.id as unknown as string);
                    }}
                  >
                    Invite
                  </Button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <span>...Loading</span>
        )}
      </ul>
    </div>
  );
};
