import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Role, UserType } from '@/lib/db/enums';
import { api } from '@/utils/api';

export default function Signup() {
  const session = useSession();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedUserType, setSelectedUserType] = useState<UserType | ''>('');

  const handleUserTypeSelection = (type: UserType) => {
    setSelectedUserType(type);
  };
  const resetUserType = () => {
    setSelectedUserType('');
  };
  const { mutate } = api.user.insertUser.useMutation({
    onSuccess: data => {
      console.log('🚀 ~ file: signup.tsx:12 ~ Signup ~ data:', data);
      signIn('Credentials', { email, password, redirect: false });
      // Will execute only once, for the last mutation (Todo 3),
      // regardless which mutation resolves first
    },
  });

  const onSubmit = async () => {
    // signIn('Credentials', { email, password });
    const data = {
      phoneNumber: phoneNumber,
      email,
      password,
      userType: selectedUserType,
    };
    console.log('🚀 ~ file: signup.tsx:17 ~ onSubmit ~ data:', data);
    const result = mutate(data);
    console.log('🚀 ~ file: signup.tsx:18 ~ onSubmit ~ result:', result);
  };

  function checkUserType(userTypeProp: UserType, role: Role) {
    if (userTypeProp == UserType.USER_VOLUNTEER && role == Role.ROLE_USER)
      return 'v';
    else if (userTypeProp == UserType.USER_PARTNER && role == Role.ROLE_USER)
      return 'p';
    else if (userTypeProp == UserType.USER_SUPPORTER && role == Role.ROLE_USER)
      return 's';
    else if (role == Role.ROLE_ADMIN) return 'admin';
    return;
  }

  useEffect(() => {
    if (session.data != null) {
      router.push(
        `/${checkUserType(session.data.user.userType, session.data.user.role)}`
      );
    }
  }, [session]);

  return (
    <BasicBaseLayout>
      <div className="flex h-screen w-full items-center justify-center">
        {selectedUserType ? (
          <div className="flex flex-col gap-4">
            <label>
              phoneNumber
              <Input
                name="email"
                type="text"
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </label>
            <label>
              Email
              <Input
                name="email"
                type="text"
                onChange={e => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password
              <Input
                name="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
            </label>
            <Button type="submit" onClick={onSubmit}>
              Sign up
            </Button>

            <Link href={'/auth/login'}>
              <Button className=" w-full" variant={'secondary'}>
                Have a account?
              </Button>
            </Link>

            <Button
              onClick={() => resetUserType()}
              className=" w-full"
              variant={'secondary'}
            >
              Back
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="text-center">Бүртгэл үүсгэх</div>
            <Button
              onClick={() => handleUserTypeSelection(UserType.USER_PARTNER)}
            >
              Хамтрагч
            </Button>
            <Button
              onClick={() => handleUserTypeSelection(UserType.USER_VOLUNTEER)}
            >
              Сайн дурын ажилтан
            </Button>
            <Button
              onClick={() => handleUserTypeSelection(UserType.USER_SUPPORTER)}
            >
              Дэмжигч
            </Button>
          </div>
        )}
      </div>
    </BasicBaseLayout>
  );
}
