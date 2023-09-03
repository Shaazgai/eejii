import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';

import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { Button } from '@/components/ui/button';
import { appRouter } from '@/server/api/root';
import { api } from '@/utils/api';
import { db } from '@/server/db';
import { getSession } from 'next-auth/react';

export default function GrantFundraisingViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props) return <>Loading...</>;
  const { id } = props;
  const { data } = api.grantFundraising.getById.useQuery({ id: id as string });

  const { mutate } = api.grantFundraising.sendRequest.useMutation({
    onSuccess: newReq => console.log(newReq),
  });
  function handleSendRequest() {
    mutate({ grantFundraisingId: data?.id as string });
  }
  if (!data) return <>404</>;

  return (
    <BasicBaseLayout>
      <div className="flex justify-center">{data?.title}</div>
      <div className="flex justify-center">
        <Button type="submit" onClick={handleSendRequest}>
          Send join request
        </Button>
      </div>
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
      userType: "partner",
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
