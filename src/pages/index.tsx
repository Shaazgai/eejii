import Sign from '@/bazo/login-next';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
export default function Home() {
  return (
    <BasicBaseLayout>
      <div className="flex justify-center">{/* <VolunteerSkillForm /> */}</div>
      <Sign />
    </BasicBaseLayout>
  );
}
