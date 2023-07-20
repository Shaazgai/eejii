import { getAuth } from '@clerk/nextjs/server';
import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';

import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { Button } from '@/components/ui/button';
import { appRouter } from '@/server/api/root';
import { prisma } from '@/server/db';
import { api } from '@/utils/api';

export default function FundraisingViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props) return <div>Loading...</div>;
  const { id } = props;
  const { data } = api.fundraising.getById.useQuery({ id: id as string });
  if (!data) return <div>404</div>;

  const { mutate } = api.fundraising.sendRequest.useMutation({
    onSuccess: newReq => console.log(newReq),
  });
  function handleSendRequest() {
    mutate({ fundraisingId: data?.id as string });
  }
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

  await helpers.fundraising.getById.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};