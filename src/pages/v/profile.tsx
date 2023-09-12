import { useSession } from 'next-auth/react';

import VolunteerLayout from '@/components/layout/volunteer-layout';

const Profile = () => {
  const { data: session } = useSession();
  console.log('🚀 ~ file: profile.tsx:8 ~ Profile ~ session:', session);
  return (
    <VolunteerLayout>
      <div className="container">
        {/* <VolunteerFormContainer /> */}
        <div className="flex flex-col gap-2">
          <div>{session?.user?.email}</div>
          <div>{session?.user?.id}</div>
          <div>{session?.user?.userType}</div>
        </div>
      </div>
    </VolunteerLayout>
  );
};

export default Profile;
