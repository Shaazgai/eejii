import VolunteerLayout from '@/components/layout/volunteer-layout';
import VolunteerFormContainer from '@/containers/volunteer-form-container';

const Profile = () => {
  return (
    <VolunteerLayout>
      <div className="container">
        <VolunteerFormContainer />
      </div>
    </VolunteerLayout>
  );
};

export default Profile;
