import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { z } from 'zod';

import FundraisingForm from '@/components/form/fundraising-form';
import PartnerLayout from '@/components/layout/partner-layout';
import type { fundraisingSchema } from '@/lib/validation/fundraising-schema';
import { api } from '@/utils/api';

const EditFundraising = () => {
  const router = useRouter();
  const [fundId, setFundId] = useState('');
  useEffect(() => {
    if (router.isReady) {
      setFundId(router.query.id as string);
    }
  }, [router.isReady]);
  const { data: fund } = api.fundraising.getById.useQuery({ id: fundId });
  // normalizeFundToForm(fund)
  return (
    <PartnerLayout>
      <FundraisingForm
        data={fund as z.infer<typeof fundraisingSchema> | undefined}
      />
    </PartnerLayout>
  );
};

export default EditFundraising;
