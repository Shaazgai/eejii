import TestForm from '@/components/form/test-form';
import BasicBaseLayout from '@/components/layout/basic-base-layout';

export default function Home() {
  return (
    <BasicBaseLayout>
      <div>
        <TestForm />
      </div>
    </BasicBaseLayout>
  );
}
