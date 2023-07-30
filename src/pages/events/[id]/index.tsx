import { getAuth } from '@clerk/nextjs/server';
import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';

import EventDetail from '@/components/detail/event-detail';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import type { EventType } from '@/lib/types';
import { appRouter } from '@/server/api/root';
import { prisma } from '@/server/db';
import { api } from '@/utils/api';

export default function EventViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props) return <>Loading...</>;
  const { id } = props;
  const { data } = api.event.getById.useQuery({ id: id as string });

  const { mutate } = api.event.sendRequest.useMutation({
    onSuccess: newReq => console.log(newReq),
  });
  function handleSendRequest() {
    mutate({ eventId: data?.id as string, role: 'mopper' });
  }
  if (!data) return <>404</>;
  return (
    <BasicBaseLayout>
      <Shell>
        <EventDetail
          event={data as unknown as EventType}
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
  const { userId } = getAuth(context.req);

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma: prisma,
      userId: userId ? userId : null,
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
