import GrantFundraisingForm from '@/components/form/grant-fundraising-form';
import SupporterLayout from '@/components/layout/supporter-layout';
import { Shell } from '@/components/shells/shell';

export default function NewProject() {
  return (
    <SupporterLayout>
      <Shell>
        {/* <div className="flex justify-between"> */}
        {/*   <h2>New project</h2> */}
        {/* </div> */}
        <GrantFundraisingForm
          data={undefined}
          handleSubmit={() => {}}
          isLoading={true}
          setFiles={() => {}}
        />
      </Shell>
    </SupporterLayout>
  );
}
