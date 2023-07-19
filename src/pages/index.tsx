import EventForm from '@/components/form/event-form';
import BasicBaseLayout from '@/components/layout/basic-base-layout';

export default function Home() {
  return (
    <BasicBaseLayout>
      <div className="flex justify-center">
        <EventForm />
      </div>
    </BasicBaseLayout>
  );
}
