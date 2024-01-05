import { useState } from 'react';
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Select,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { api } from '@/utils/api';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';

const orgTypes = [
  { value: 'governmentOrganization', label: 'Төрийн байгууллага' },
  { value: 'nonGovernmentOrganization', label: 'Төрийн бус байгууллага' },
  { value: 'internationalOrganization', label: 'Олон улсын байгууллага' },
  { value: 'educationOrganization', label: 'Боловсролын байгууллага' },
  { value: 'healthOrganization', label: 'Эрүүл мэндийн байгууллага' },
  { value: 'otherOrganization', label: 'Бусад' },
];

type ContactType = {
  phoneNumber1: string;
  phoneNumber2: string;
};

type PartnerRegisterFormValues = {
  organizationType: string;
  organizationName: string;
  email: string;
  addressShort: string;
  password: string;
  confirmPassword: string;
  contact: ContactType;
  bio: string;
  introduction: string;
};

export default function PartnerRegisterForm() {
  const router = useRouter();
  const [active, setActive] = useState(0);

  const { mutateAsync: registerPartner } = api.partner.register.useMutation();

  const form = useForm({
    initialValues: {
      organizationType: '',
      organizationName: '',
      email: '',
      addressShort: '',
      password: '',
      confirmPassword: '',
      contact: {
        phoneNumber1: '',
        phoneNumber2: '',
      },
      bio: '',
      introduction: '',
    },

    validate: values => {
      if (active === 0) {
        return {
          organizationType:
            values.organizationType.trim().length < 1
              ? 'Must Select Organization Type'
              : null,
        };
      }

      if (active === 1) {
        return {
          organizationName:
            values.organizationName.trim().length < 2
              ? 'organizationName must include at least 2 characters'
              : null,
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
          addressShort:
            values.addressShort.trim().length < 6
              ? 'addressShort need to longer than 6 characters'
              : null,
          password:
            values.password.length < 6
              ? 'Password must include at least 6 characters'
              : values.password == values.confirmPassword
                ? null
                : 'Password is not same',
          confirmPassword:
            values.password.length < 6
              ? 'confirmPassword must include at least 6 characters'
              : values.password == values.confirmPassword
                ? null
                : 'Password is not same',
          // contact
          phoneNumber1:
            values.contact.phoneNumber1.trim().length < 6
              ? 'Phone number is invalid'
              : null,
          phoneNumber2:
            values.contact.phoneNumber2.trim().length < 6
              ? 'Phone number is invalid'
              : null,
        };
      }
      if (active == 2) {
        return {
          bio:
            values.bio.trim().length < 10
              ? 'bio must include at least 10 characters'
              : null,
        };
      }
      if (active == 3) {
        return {
          introduction:
            values.introduction.trim().length < 10
              ? 'introduction must include at least 10 characters'
              : null,
        };
      }
      return {};
    },
  });

  const nextStep = () =>
    setActive(current => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive(current => (current > 0 ? current - 1 : current));

  async function handleSubmit(values: PartnerRegisterFormValues) {
    const res = await registerPartner({
      ...values,
    });
    if (res.status == 201) {
      notifications.show({
        title: 'Success',
        message: 'Successfully created volunteer account',
      });
      const { password, email } = res.result;
      //TODO Redirect zasah
      await signIn('Credentials', { email, password, redirect: false });

      router.push(`/v`);
    }
  }

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stepper active={active}>
          <Stepper.Step label="Байгууллагын төрөл">
            <h1 className="text-[#616161] mb-3">
              Доор шаардагдах мэдээллийг та үнэн зөв оруулна уу!
            </h1>
            <Select
              label=""
              placeholder="Таны Байгууллагын төрөл"
              data={orgTypes}
              defaultValue="React"
              radius="xl"
              mt="4"
              {...form.getInputProps('organizationType')}
              clearable
            />
          </Stepper.Step>

          <Stepper.Step label="Байгууллагын мэдээлэл">
            <TextInput
              label="Байгууллагын нэр:"
              placeholder="organizationName"
              className="text-start"
              radius="lg"
              {...form.getInputProps('organizationName')}
            />
            <TextInput
              mt="md"
              label="И-мэйл:"
              placeholder="Email"
              className="text-start"
              radius="lg"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              mt="md"
              label="Нууц үг:"
              placeholder="Password"
              className="text-start"
              radius="lg"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              mt="md"
              label="Нууц үг дахин давтах:"
              placeholder="confirmPassword"
              className="text-start"
              radius="lg"
              {...form.getInputProps('confirmPassword')}
            />
            <TextInput
              mt="md"
              label="Хаяг:"
              placeholder="addressShort"
              className="text-start"
              radius="lg"
              {...form.getInputProps('addressShort')}
            />
            <TextInput
              mt="md"
              label="Утасны дугаар 1:"
              placeholder="phoneNumber1"
              className="text-start"
              radius="lg"
              {...form.getInputProps('contact.phoneNumber1')}
            />
            <TextInput
              mt="md"
              label="Утасны дугаар 2:"
              placeholder="phoneNumber2"
              className="text-start"
              radius="lg"
              {...form.getInputProps('contact.phoneNumber2')}
            />
          </Stepper.Step>

          <Stepper.Step label="Байгууллагын мэдээлэл">
            <Textarea
              placeholder="bio"
              label="Био"
              autosize
              minRows={4}
              className="text-start"
              {...form.getInputProps('bio')}
            />
          </Stepper.Step>
          <Stepper.Step label="Танилцуулга">
            <Textarea
              placeholder="introduction"
              label="Танилцуулга"
              autosize
              minRows={4}
              className="text-start"
              {...form.getInputProps('introduction')}
            />
          </Stepper.Step>
        </Stepper>

        <Group justify="flex-end" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep} radius="xl">
              Back
            </Button>
          )}
          {active !== 3 ? (
            <Button onClick={nextStep} bg="#3c888d" radius="xl">
              Next step
            </Button>
          ) : (
            <Button type="submit" bg="#3c888d" radius="xl">
              Register
            </Button>
          )}
        </Group>
      </form>
    </div>
  );
}
