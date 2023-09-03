import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import superjson from 'superjson';

import EventDetail from '@/components/detail/event-detail';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { api } from '@/utils/api';

export default function EventViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props) return <>Loading...</>;
  const { id } = props;
  const { data } = api.event.getById.useQuery({ id: id as string });

  const { _mutate } = api.event.sendRequest.useMutation({
    onSuccess: newReq => console.log(newReq),
  });
  function handleSendRequest() {
    // mutate({ eventId: data?.id as string, role: 'mopper' });
  }
  if (!data) return <>404</>;
  return (
    <BasicBaseLayout>
      <Shell>
        <EventDetail
          event={data}
          actionButton={
            <Button type="submit" onClick={handleSendRequest}>
              Send join request
            </Button>
          }
        />
      </Shell>
    </BasicBaseLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession();

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      db: db,
      userId: session?.user.id,
      userType: 'partner',
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
