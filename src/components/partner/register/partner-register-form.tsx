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
            <Select
              label="Таны байгууллагын төрөл"
              placeholder="Pick value"
              data={orgTypes}
              defaultValue="React"
              {...form.getInputProps('organizationType')}
              clearable
            />
          </Stepper.Step>

          <Stepper.Step label="Байгууллагын мэдээлэл">
            <TextInput
              label="organizationName"
              placeholder="organizationName"
              {...form.getInputProps('organizationName')}
            />
            <TextInput
              mt="md"
              label="Email"
              placeholder="Email"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              mt="md"
              label="Password"
              placeholder="Password"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              mt="md"
              label="confirmPassword"
              placeholder="confirmPassword"
              {...form.getInputProps('confirmPassword')}
            />
            <TextInput
              mt="md"
              label="addressShort"
              placeholder="addressShort"
              {...form.getInputProps('addressShort')}
            />
            <TextInput
              mt="md"
              label="phoneNumber1"
              placeholder="phoneNumber1"
              {...form.getInputProps('contact.phoneNumber1')}
            />
            <TextInput
              mt="md"
              label="phoneNumber2"
              placeholder="phoneNumber2"
              {...form.getInputProps('contact.phoneNumber2')}
            />
          </Stepper.Step>

          <Stepper.Step label="Байгууллагын мэдээлэл">
            <Textarea
              placeholder="bio"
              label="bio"
              autosize
              minRows={4}
              {...form.getInputProps('bio')}
            />
          </Stepper.Step>
          <Stepper.Step label="Танилцуулга">
            <Textarea
              placeholder="introduction"
              label="introduction"
              autosize
              minRows={4}
              {...form.getInputProps('introduction')}
            />
          </Stepper.Step>
        </Stepper>

        <Group justify="flex-end" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          {active !== 3 ? (
            <Button onClick={nextStep}>Next step</Button>
          ) : (
            <Button type="submit">Register</Button>
          )}
        </Group>
      </form>
    </div>
  );
}
