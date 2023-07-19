import FundraisingForm from '@/components/form/fundraising-form';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { api } from '@/utils/api';
export default function Home() {
  const { data: user } = api.user.getById.useQuery();
  console.log(user);

  return (
    <BasicBaseLayout>
      <div className="flex justify-center">
        {/* <EventForm /> */}
        <FundraisingForm />
      </div>
    </BasicBaseLayout>
  );
}
