import FundCard from '@/components/card/fund-card';
import type { Project } from '@/lib/types';

const ProjectList = ({
  projects,
  isLoading,
}: {
  projects: Project[];
  isLoading: boolean;
}) => {
  return (
    <div>
      <div className="mb-5 border-b pb-2 font-bold">
        <h2 className=" text-2xl">Projects</h2>
      </div>
      {isLoading && '..Loading'}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!isLoading &&
          projects?.length > 0 &&
          projects.map((fund, i) => {
            return <FundCard key={i} fund={fund} isVolunteer={true} />;
          })}
      </div>
    </div>
  );
};

export default ProjectList;
