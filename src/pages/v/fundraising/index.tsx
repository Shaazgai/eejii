import { FallbackImage } from '@/components/common/fallback-image';
import VolunteerLayout from '@/components/layout/volunteer-layout';
import { ProjectList } from '@/components/list/project-list';
import { ProjectStatus } from '@/lib/db/enums';
import type { Project } from '@/lib/types';
import { api } from '@/utils/api';

const Donate = () => {
  const { data: projects, isLoading: isFundLoading } =
    api.project.findAll.useQuery({
      page: 1,
      limit: 20,
      enabled: true,
      status: ProjectStatus.APPROVED,
    });

  return (
    <VolunteerLayout>
      <div className="">
        <FallbackImage
          width={1500}
          height={300}
          className="aspect-video h-[300px] w-full object-cover object-center"
          alt="bg"
          src={'/images/spider.jpg'}
        />
      </div>
      <div className="-translate-y-10">
        <ProjectList
          projects={projects?.items as unknown as Project[]}
          isLoading={isFundLoading}
        />
      </div>
    </VolunteerLayout>
  );
};

export default Donate;
