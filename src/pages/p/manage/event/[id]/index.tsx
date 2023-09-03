import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';

import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';
import { appRouter } from '@/server/api/root';
import { api } from '@/utils/api';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { db } from '@/server/db';

export default function EventViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props) return <>Loading...</>;
  const { id } = props;
  console.log('🚀 ~ file: index.tsx:17 ~ id:', id);
  const { data } = api.event.getById.useQuery({ id: id as string });
  console.log('🚀 ~ file: index.tsx:19 ~ data:', data);
  if (!data) return <>404</>;

  // const { mutate } = api.event.sendRequest.useMutation({
  //   onSuccess: newReq => console.log(newReq),
  // });
  // function handleSendRequest() {
  //   mutate({ eventId: data?.id as string, role: 'mopper' });
  // }
  return (
    <PartnerLayout>
      <Shell>
        <div className="flex justify-center">{data?.title}</div>
        <div className="flex justify-center">
          {/* <Button type="submit" onClick={handleSendRequest}>
          Send join request
        </Button> */}
          <Link href={`/p/manage/event/${props.id}/invite`}>Invite users</Link>
        </div>
      </Shell>
    </PartnerLayout>
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
