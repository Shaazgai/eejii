import { getSession, signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter();
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const session = useSession();
  console.log('🚀 ~ file: login.tsx:8 ~ SignIn ~ session:', session);

  const onSubmit = async () => {
    await signIn('credentials', { email, password, redirect: false })
      .then(data => {
        console.log(data);
        router.push('/dashboard');
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
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
