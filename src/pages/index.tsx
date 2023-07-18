import TestForm from '@/components/form/test-form';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { api } from '@/utils/api';

export default function Home() {
  const volunteer = api.volunteer.getById.useQuery({ id: 'dasda' });
  console.log(volunteer);
  return (
    <BasicBaseLayout>
      <div>
        <TestForm />
      </div>
    </BasicBaseLayout>
  );
}
