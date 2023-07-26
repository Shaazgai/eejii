import VolunteerForm from '@/components/form/volunteer-form';
import VolunteerSkillForm from '@/components/form/volunteer-skill-form';
import { VolunteerFormProvider } from '@/context/volunteer-form-context';

import VolunteerAddressForm from './volunteer-address-form';

const VolunteerFormContainer = () => {
  const steps = [
    <VolunteerForm key={0} />,
    <VolunteerSkillForm key={1} />,
    <VolunteerAddressForm key={2} />,
  ];
  return (
    <section className="flex items-center justify-center p-10">
      <VolunteerFormProvider steps={steps} />
    </section>
  );
};

export default VolunteerFormContainer;
