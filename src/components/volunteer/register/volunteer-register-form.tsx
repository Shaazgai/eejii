import { useState } from 'react';
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Radio,
  Stack,
  Select,
  NumberInput,
  Flex,
  InputLabel,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { api } from '@/utils/api';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';

const mongolianLetters = [
  'А',
  'Б',
  'В',
  'Г',
  'Д',
  'Е',
  'Ё',
  'Ж',
  'З',
  'И',
  'Й',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'Ө',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Ү',
  'Ф',
  'Х',
  'Ц',
  'Ч',
  'Ш',
  'Щ',
  'Ъ',
  'Ы',
  'Ь',
  'Э',
  'Ю',
  'Я',
];

type VolunteerRegisterFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  facebook: string;
  email: string;
  gender: string;
  birthDate: string;
  letter1: string;
  letter2: string;
  registerNumber: string;
  registerCode: string;
  // country: string;
  // homeAddress: string;
  bio: string;
};

export default function VolunteerRegisterForm() {
  const router = useRouter();
  const [active, setActive] = useState(0);

  function isValidDate(dateString: string) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  const { mutateAsync: registerVolunteer } =
    api.volunteer.register.useMutation();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      facebook: '',
      email: '',
      gender: '',
      birthDate: '',
      letter1: '',
      letter2: '',
      registerNumber: '',
      registerCode: '',
      // country: '',
      // homeAddress: '',
      bio: '',
    },

    validate:
      // zodResolver(volunteerSchema),
      //TODO validation iig saijruulah
      //TODO User email oruulahd shuud db ees burtguulsen bol door ni burtguulsen gj aldaa ogoh

      values => {
        if (active === 0) {
          return {
            firstName:
              values.firstName.trim().length < 2
                ? 'Username must include at least 2 characters'
                : null,
            lastName:
              values.lastName.trim().length < 2
                ? 'Username must include at least 2 characters'
                : null,

            phoneNumber:
              values.phoneNumber.trim().length != 8
                ? 'Phone number is invalid'
                : null,
            email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',

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
          };
        }

        if (active === 1) {
          return {
            birthDate: isValidDate(values.birthDate) ? null : 'Invalid date',
            gender:
              values.gender.trim().length < 2 ? 'Gender must be checked' : null,
            letter1:
              values.letter1.trim().length < 1
                ? 'First letter must be selected'
                : null,
            letter2:
              values.letter2.trim().length < 1
                ? 'Second letter must be selected'
                : null,
            registerNumber:
              values.letter2.trim().length == 8
                ? 'Register number is invalid'
                : null,
          };
        }
        if (active === 2) {
          return {
            bio:
              values.bio.trim().length < 10
                ? 'Bio must include at least 10 characters'
                : null,
            // registerCode:
            //   values.registerCode.trim().length < 2
            //     ? 'registerCode is null'
            //     : null,
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
      return current < 2 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive(current => (current > 0 ? current - 1 : current));

  const data = mongolianLetters.map(letter => ({
    value: letter,
    label: letter,
  }));

  async function handleSubmit(values: VolunteerRegisterFormValues) {
    const registerCode = `${values.letter1}${values.letter2}${values.registerNumber}`;
    //TODO Error handler bichij feedback haruulah toaster etc
    const res = await registerVolunteer({
      ...values,
      registerCode,
      birthDate: new Date(values.birthDate),
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

  //TODO UI iig design system iin daguu tsarailag bolgoh

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stepper active={active}>
          <Stepper.Step label="Холбоо барих">
            <h1 className="text-[#616161]">
              Доор шаардагдах мэдээллийг та үнэн зөв оруулна уу!
            </h1>
            <TextInput
              mt="md"
              radius="lg"
              label="Овог:"
              placeholder="lastName"
              className="text-start border-[#3c888d]"
              {...form.getInputProps('lastName')}
            />
            <TextInput
              mt="md"
              radius="lg"
              label="Нэр:"
              placeholder="firstName"
              className="text-start border-[#3c888d]"
              {...form.getInputProps('firstName')}
            />
            <TextInput
              mt="md"
              radius="lg"
              label="Утасны дугаар:"
              placeholder="phoneNumber"
              className="text-start border-[#3c888d]"
              {...form.getInputProps('phoneNumber')}
            />

            <TextInput
              mt="md"
              radius="lg"
              label="И-мэйл:"
              placeholder="email"
              className="text-start border-[#3c888d]"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              mt="md"
              radius="lg"
              label="Нууц үг:"
              placeholder="Password"
              className="text-start border-[#3c888d]"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              mt="md"
              radius="lg"
              label="Нууц үг дахин давтах:"
              placeholder="confirmPassword"
              className="text-start border-[#3c888d]"
              {...form.getInputProps('confirmPassword')}
            />
          </Stepper.Step>

          <Stepper.Step label="Хувийн мэдээлэл">
            <InputLabel className="text-start">Төрсөн өдөр</InputLabel>
            <DateInput
              {...form.getInputProps('birthDate')}
              valueFormat="YYYY-M-DD"
              placeholder="Pick birth date"
              w={'100%'}
              radius="lg"
              className="text-start"
            />
            <Radio.Group
              name="Gender"
              mt="md"
              {...form.getInputProps('gender')}
            >
              <Group mt="xs">
                <Radio label="Эрэгтэй" value={'male'} />
                <Radio label="Эмэгтэй" value={'female'} />
              </Group>
            </Radio.Group>
            <Stack w={'100%'} mt="md">
              <InputLabel className="text-start">Регистрийн дугаар</InputLabel>
              <Flex gap={20}>
                <Select
                  data={data}
                  {...form.getInputProps('letter1')}
                  placeholder="Select a letter"
                  radius="xl"
                />
                <Select
                  data={data}
                  {...form.getInputProps('letter2')}
                  placeholder="Select a letter"
                  radius="xl"
                />
                <NumberInput
                  {...form.getInputProps('registerNumber')}
                  placeholder="Enter a number"
                  radius="md"
                />
              </Flex>
            </Stack>
          </Stepper.Step>

          {/* <Stepper.Step label="Гэрийн хаяг" description="Social media">
          <TextInput
            label="Website"
            placeholder="Website"
            {...form.getInputProps('website')}
          />
          <TextInput
            mt="md"
            label="GitHub"
            placeholder="GitHub"
            {...form.getInputProps('github')}
          />
        </Stepper.Step> */}
          <Stepper.Step label="Танилцуулга">
            <Textarea
              placeholder="bio"
              label="bio"
              autosize
              minRows={4}
              {...form.getInputProps('bio')}
            />
          </Stepper.Step>
        </Stepper>

        <Group justify="flex-end" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep} radius="xl">
              Back
            </Button>
          )}
          {active !== 2 ? (
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
