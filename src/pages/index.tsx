import EventForm from '@/components/form/event-form';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { api } from '@/utils/api';
// import { api } from '@/utils/api';
export default function Home() {
  // const { userId } = useAuth();
  // const user = api.user.getById.useQuery();
  const { data: user, isLoading } = api.user.getById.useQuery();
  console.log(user);

  return (
    <BasicBaseLayout>
      <div className="flex justify-center">
        <EventForm />
      </div>
    </BasicBaseLayout>
  );
}
