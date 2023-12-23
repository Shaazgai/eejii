import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import BasicBaseLayout from '@/components/layout/basic-base-layout';
import PartnerRegisterForm from '@/components/partner/register/partner-register-form';
import { Button } from '@/components/ui/button';
import VolunteerRegisterForm from '@/components/volunteer/register/volunteer-register-form';
import { Role, UserType } from '@/lib/db/enums';

export default function Signup() {
  const session = useSession();
  const router = useRouter();

  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState<string>('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedUserType, setSelectedUserType] = useState<UserType | ''>('');

  const handleUserTypeSelection = (type: UserType) => {
    setSelectedUserType(type);
  };
  // const resetUserType = () => {
  //   setSelectedUserType('');
  // };
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

  return (
    <BasicBaseLayout>
      <div className="flex items-center justify-center w-full h-screen">
        {selectedUserType ? (
          selectedUserType == UserType.USER_VOLUNTEER ? (
            <VolunteerRegisterForm />
          ) : (
            selectedUserType == UserType.USER_PARTNER && <PartnerRegisterForm />
          )
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
            {/* <Button
              onClick={() => handleUserTypeSelection(UserType.USER_SUPPORTER)}
            >
              Дэмжигч
            </Button> */}
          </div>
        )}
      </div>
    </BasicBaseLayout>
  );
}
