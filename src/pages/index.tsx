import BasicBaseLayout from '@/components/layout/basic-base-layout';
import TestForm from '@/components/form/test-form';

export default function Home() {
  return (
    <BasicBaseLayout>
      <div>
        <TestForm />
      </div>
    </BasicBaseLayout>
  );
}
