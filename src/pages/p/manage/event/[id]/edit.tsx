import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { z } from 'zod';

import EventForm from '@/components/form/event-form';
import PartnerLayout from '@/components/layout/partner-layout';
import type { eventSchema } from '@/lib/validation/event-schema';
import { api } from '@/utils/api';

const EditEvent = () => {
  const [eventId, setEventId] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      setEventId(router.query.id as string);
    }
  }, [router.isReady]);

  const { data } = api.event.getById.useQuery({
    id: eventId,
  });

  return (
    <PartnerLayout>
      <EventForm data={data as unknown as z.infer<typeof eventSchema>} />
    </PartnerLayout>
  );
};

export default EditEvent;
