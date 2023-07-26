import { XIcon } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import FormNavigation from '@/components/form/fields/navigation';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useVolunteerFormState } from '@/context/volunteer-form-context';
import volunteerSkills from '@/data/skills.json';

const VolunteerSkillForm = () => {
  const [skills, setSkills] = useState<string[]>(volunteerSkills);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [query, setQuery] = useState('');

  const { data, setData, isFirstStep, isLastStep, back, next } =
    useVolunteerFormState();
  const form = useForm();

  useEffect(() => {
    setSelectedSkills(Object.values(data.skills as string[]));
  }, [data]);

  async function onSubmit() {
    console.log(selectedSkills);
    setData({ ...data, skills: selectedSkills });
    if (!isLastStep) return next();
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
    const filteredSkills = volunteerSkills.filter(skill =>
      skill.toLowerCase().includes(query)
    );
    console.log(filteredSkills);
    setSkills(filteredSkills.length > 0 ? filteredSkills : volunteerSkills);
  }
  function handleSelectSkill(skill: string) {
    setSelectedSkills(prevSkills => [...prevSkills, skill]);
    setSkills(volunteerSkills);
    setQuery('');
  }

  function handleRemoveSkill(skill: string) {
    setSelectedSkills(prevSkills => prevSkills.filter(item => item !== skill));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[500px]">
        <h3 className="mb-5  border-b border-gray-200 pb-1">Add skill</h3>
        <div className="mb-2 flex">
          <Input
            value={query}
            onChange={handleChange}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSelectSkill(e.currentTarget.value);
              }
            }}
            name="query"
            className="rounded-r-none"
          />
          <Button
            type="button"
            className="rounded-l-none"
            onClick={() => {
              handleSelectSkill(query);
            }}
          >
            Add
          </Button>
        </div>
        <div className="space-x-2 space-y-2 border-b-2 border-dashed pb-2">
          {selectedSkills.map(skill => (
            <Button
              type="button"
              size={'sm'}
              key={skill}
              onClick={() => handleRemoveSkill(skill)}
            >
              {skill}
              <XIcon />
            </Button>
          ))}
        </div>
        <div className="space-y-5">
          {skills.length > 0 && (
            <div className="space-x-2 space-y-2">
              {skills.slice(0, 30).map(skill => (
                <Button
                  type="button"
                  size={'sm'}
                  variant={'outline'}
                  key={skill}
                  onClick={() => handleSelectSkill(skill)}
                >
                  {skill}
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className="mt-2">
          <FormNavigation
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            formState={form.formState}
            back={back}
          />
        </div>
      </form>
    </Form>
  );
};

export default VolunteerSkillForm;
