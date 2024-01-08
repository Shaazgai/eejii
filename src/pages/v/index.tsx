import { FallbackImage } from '@/components/common/fallback-image';
import VolunteerLayout from '@/components/layout/volunteer-layout';

export default function Index() {
  return (
    <VolunteerLayout>
      <div className="h-[300px] w-[1500] bg-primary">
        <h1 className="hidden">sdsd</h1>
        <FallbackImage
          width={1500}
          height={300}
          className="aspect-video h-[376px]  w-full object-cover object-center"
          alt="bg"
          src={''}
        />
      </div>
    </VolunteerLayout>
  );
}
