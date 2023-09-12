import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserType } from '@/lib/db/enums';
import { api } from '@/utils/api';

export default function Signup() {
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
  const { mutate, error } = api.user.insertUser.useMutation({
    onSuccess: data => {
      console.log('🚀 ~ file: signup.tsx:12 ~ Signup ~ data:', data);
      signIn('Credentials', { email, password });
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
      userType: UserType.USER_VOLUNTEER,
    };
    console.log('🚀 ~ file: signup.tsx:17 ~ onSubmit ~ data:', data);
    const result = mutate(data);
    console.log('🚀 ~ file: signup.tsx:18 ~ onSubmit ~ result:', result);
  };

  return (
    <BasicBaseLayout>
      <div className="flex h-screen w-full items-center justify-center">
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
            Volunteer sign up
          </Button>

          <Link href={'/auth/login'}>
            <Button className=" w-full" variant={'secondary'}>
              Have a account?
            </Button>
          </Link>

          {/* <div className="flex h-screen w-full items-center justify-center">
        {selectedUserType ? (
          <Sign userTypeProp={selectedUserType} onBack={resetUserType} />
        ) : (
          <div className="flex flex-col gap-4">
            <div>Login as a</div>
            <Button
              onClick={() => handleUserTypeSelection(UserType.USER_PARTNER)}
            >
              Partner
            </Button>
            <Button
              onClick={() => handleUserTypeSelection(UserType.USER_VOLUNTEER)}
            >
              Volunteer
            </Button>
          </div>
        )}
      </div> */}
        </div>
      </div>
    </BasicBaseLayout>
  );
}
