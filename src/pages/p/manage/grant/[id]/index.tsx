import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession, useSession } from 'next-auth/react';
import superjson from 'superjson';

import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { api } from '@/utils/api';

export default function EventViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props) return <>Loading...</>;
  const { id } = props;
  console.log('🚀 ~ file: index.tsx:17 ~ id:', id);
  const { data } = api.grantFundraising.getById.useQuery({ id: id as string });
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
