import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Role, UserType } from '@/lib/db/enums';
import { api } from '@/utils/api';
import VolunteerRegisterForm from '@/components/volunteer/register/volunteer-register-form';
import PartnerRegisterForm from '@/components/partner/register/partner-register-form';
import AuthLayout from '@/components/layout/auth-layout';
import Image from 'next/image';

interface Option {
  name: string;
  description: string;
  image: string;
  value: UserType;
}

// Define a type alias for the setUserType function
type SetUserType = (value: string) => void;

export default function Signup() {
  const session = useSession();
  const router = useRouter();

  const [selectedUserType, setSelectedUserType] = useState<UserType | ''>('');

  const [userType, setUserType] = useState('');
  console.log('🚀 ~ file: signup.tsx:25 ~ Signup ~ userType:', userType);

  const resetUserType = () => {
    setSelectedUserType('');
  };

  // const { mutate } = api.user.insertUser.useMutation({
  //   onSuccess: data => {
  //     console.log('🚀 ~ file: signup.tsx:12 ~ Signup ~ data:', data);
  //     signIn('Credentials', { email, password, redirect: false });
  //     // Will execute only once, for the last mutation (Todo 3),
  //     // regardless which mutation resolves first
  //   },
  // });

  // const onSubmit = async () => {
  //   // signIn('Credentials', { email, password });
  //   const data = {
  //     phoneNumber: phoneNumber,
  //     email,
  //     password,
  //     userType: selectedUserType,
  //   };
  //   console.log('🚀 ~ file: signup.tsx:17 ~ onSubmit ~ data:', data);
  //   const result = mutate(data);
  //   console.log('🚀 ~ file: signup.tsx:18 ~ onSubmit ~ result:', result);
  // };

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

  const options = [
    {
      name: 'Partner',
      description: 'Join us as a partner and collaborate on projects.',
      image: '/icons/handshake.svg',
      value: UserType.USER_PARTNER,
    },
    {
      name: 'Volunteer',
      description: 'Become a volunteer and help us with various tasks.',
      image: '/icons/volunteer.svg',
      value: UserType.USER_VOLUNTEER,
    },
    // {
    //   name: 'Person',
    //   description: 'Become a volunteer and help us with various tasks.',
    //   image: '/images/volunteer.jpg',
    //   value: 'volunteer',
    // },
  ];
  // Define a custom component for the card
  const Card = ({ option }: { option: Option }) => {
    // Destructure the option object
    const { name, description, image, value } = option;

    // Return the JSX for the card
    return (
      <label
        className={`w-full p-5 border cursor-pointer rounded-2xl ${
          value == selectedUserType ? 'border-primary' : 'border-black/10'
        }  hover:border-primary`}
      >
        <input
          type="radio"
          name="user-type"
          value={value}
          className="hidden"
          // Call the setUserType function with the value when the input is clicked
          onClick={() => setSelectedUserType(value)}
        />
        <div className="flex flex-col gap-3">
          <div className="flex justify-end">
            {value == selectedUserType ? (
              <Image
                src={'/icons/check-boxes.svg'}
                alt="checked"
                height={24}
                width={24}
              />
            ) : (
              <Image
                src={'/icons/uncheck-boxes.svg'}
                alt="checked"
                height={24}
                width={24}
              />
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-3 py-8">
            <Image src={image} alt={name} width={54} height={54} />
            {/* <div className="p-2">
              <span className="text-lg font-bold">{name}</span> */}
            <p className="text-md">{name}</p>
            {/* </div> */}
          </div>
        </div>
      </label>
    );
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center w-full pb-10 ">
        {selectedUserType ? (
          selectedUserType == UserType.USER_VOLUNTEER ? (
            <VolunteerRegisterForm />
          ) : (
            selectedUserType == UserType.USER_PARTNER && <PartnerRegisterForm />
          )
        ) : (
          <div className="flex flex-col gap-4">
            <div className="pb-24 text-2xl text-">
              Та доорх хэрэглэгчдийн төрлөөс сонгон цааш үргэлжлүүлнэ үү.
            </div>
            <div className="flex gap-16">
              {options.map(option => (
                <Card key={option.value} option={option} />
              ))}
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
