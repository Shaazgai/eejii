import React, { useState } from 'react';

import { UserType } from '@/lib/db/enums';
import { api } from '@/utils/api';
import { signIn } from 'next-auth/react';

export default function Signup() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
    <div>
      <label>
        phoneNumber
        <input
          name="email"
          type="text"
          onChange={e => setPhoneNumber(e.target.value)}
        />
      </label>
      <label>
        Email
        <input
          name="email"
          type="text"
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" onClick={onSubmit}>
        Sign in!
      </button>
    </div>
  );
}
