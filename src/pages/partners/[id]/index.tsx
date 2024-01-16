import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { StandartDetail } from '@/components/partner/standart-detail';
import { BaseDetail } from '@/components/partner/base-detail';

export default function Index() {
  return (
    <BasicBaseLayout>
      {/* {true ? <StandartDetail /> : <BaseDetail />} */}
      {true ? <BaseDetail /> : <StandartDetail />}
    </BasicBaseLayout>
  );
}
