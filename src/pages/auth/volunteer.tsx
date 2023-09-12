import Sign from '@/bazo/login-next';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
export default function Auth() {
  return (
    <BasicBaseLayout>
      <div className="flex h-screen w-full items-center justify-center">
        {/* <div className="flex flex-col gap-4"> */}
        <Sign userTypeProp="USER_VOLUNTEER" />
        {/* </div> */}
      </div>
    </BasicBaseLayout>
  );
}
