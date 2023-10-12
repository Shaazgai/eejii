import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';

import EventDetail from '@/components/detail/event-detail';
import VolunteerLayout from '@/components/layout/volunteer-layout';
import { Button } from '@/components/ui/button';
import { getServerAuthSession } from '@/lib/auth';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { api } from '@/utils/api';

export default function EventViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props) return <>Loading...</>;
  const { id } = props;
  const { data } = api.event.getById.useQuery({ id: id as string });

  const { mutate } = api.eventAssociation.sendRequest.useMutation({
    onSuccess: newReq => console.log(newReq),
  });
  function handleSendRequest() {
    mutate({ eventId: data?.id as unknown as string, role: 'mopper' });
  }
  if (!data) return <>404</>;
  return (
    <VolunteerLayout>
      <EventDetail
        event={data}
        actionButton={
          <Button type="submit" onClick={handleSendRequest}>
            Send join request
          </Button>
        }
      />
    </VolunteerLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerAuthSession(context);

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      db: db,
      userId: session?.user.id ? session.user.id : undefined,
      userType: session?.user.userType ? session?.user.userType : undefined,
      role: session?.user.role,
    },
    transformer: superjson, // optional - adds superjson serialization
  });

  const id = context.params?.id;

  if (typeof id !== 'string') throw new Error('no id');

  await helpers.event.getById.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};
