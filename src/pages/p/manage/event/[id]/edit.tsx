import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { z } from 'zod';

import EventForm from '@/components/form/event-form';
import PartnerLayout from '@/components/layout/partner-layout';
import type { EventType } from '@/lib/types';
import type { eventSchema } from '@/lib/validation/event-schema';
import { normalizeEventToForm } from '@/server/api/helpers/normalizer/normalizeForForm';
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
      <EventForm
        data={
          normalizeEventToForm(data as unknown as EventType) as z.infer<
            typeof eventSchema
          >
        }
      />
    </PartnerLayout>
  );
};

export default EditEvent;
