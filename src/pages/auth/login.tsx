import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Sign from '@/bazo/login-next';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { UserType } from '@/lib/db/enums';
export default function Auth() {
  const session = useSession();
  const router = useRouter();

  function checkUserType(userTypeProp: UserType) {
    if (userTypeProp == UserType.USER_VOLUNTEER) return 'v';
    if (userTypeProp == UserType.USER_PARTNER) return 'p';
    if (userTypeProp == UserType.USER_SUPPORTER) return 's';
    return;
  }

  useEffect(() => {
    if (session.data != null) {
      router.push(`/${checkUserType(session.data.user.userType)}`);
    }
  }, [session]);

  return (
    <BasicBaseLayout>
      <div className="flex h-screen w-full items-center justify-center">
        {/* {selectedUserType ? (
          <Sign userTypeProp={selectedUserType} onBack={resetUserType} />
        ) : ( */}
        {/* <div className="flex flex-col gap-4">
          <div>Login as a</div>
          <Button
            onClick={() => handleUserTypeSelection(UserType.USER_PARTNER)}
          >
            Partner
          </Button>
          <Button
            onClick={() => handleUserTypeSelection(UserType.USER_VOLUNTEER)}
          >
            Volunteer
          </Button>
        </div> */}
        {/* )} */}
        <Sign />
      </div>
    </BasicBaseLayout>
  );
}
