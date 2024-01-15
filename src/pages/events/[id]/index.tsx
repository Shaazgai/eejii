import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';

import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { EventList } from '@/components/list/event-list';
import { getServerAuthSession } from '@/lib/auth';
import type { Event } from '@/lib/types';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { api } from '@/utils/api';
import { Container, LoadingOverlay, Space } from '@mantine/core';
import { FeaturedEventDetail } from '@/components/event/featured-detail';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { UserType } from '@/lib/db/enums';
import { EventDetail } from '@/components/event/detail';

export default function EventViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const session = useSession();
  const router = useRouter();
  const { id } = props;
  const { data: event, isLoading } = api.event.findById.useQuery({
    id: id as string,
  });
  const { data: relatedEvents, isLoading: isRelatedLoading } =
    api.event.findRelated.useQuery({
      excludeId: event?.id as unknown as string,
      limit: 6,
    });

  if (isLoading) {
    return <LoadingOverlay />;
  }
  // const { mutate } = api.eventUser.sendRequest.useMutation({
  //   onSuccess: newReq => console.log(newReq),
  // });
  // function handleSendRequest() {
  //   mutate({ eventId: data?.id as unknown as string, role: 'mopper' });
  // }
  function goBack() {
    if (!session) {
      router.push('/events');
    }
    if (session.data?.user.userType === UserType.USER_VOLUNTEER) {
      router.push('/v/events');
    } else {
      router.push('/events');
    }
  }
  return (
    <BasicBaseLayout>
      {event?.featured == true ? (
        <FeaturedEventDetail event={event as Event} goBack={goBack} />
      ) : (
        <EventDetail event={event as Event} goBack={goBack} />
      )}
      <Container size={'xl'}>
        <Space h="lg" />
        <EventList
          events={relatedEvents as unknown as Event[]}
          isLoading={isRelatedLoading}
        />
      </Container>
    </BasicBaseLayout>
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

  await helpers.event.findById.prefetch({ id: id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};
