import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';

import FundDetail from '@/components/detail/fund-detail';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import { getServerAuthSession } from '@/lib/auth';
import type { FundWithOwner } from '@/lib/types';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { api } from '@/utils/api';

export default function FundraisingViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props) return <div>Loading...</div>;
  const { id } = props;
  const { data } = api.fundraising.getById.useQuery({ id: id as string });
  if (!data) return <div>404</div>;

  const { mutate } = api.fundAssociation.sendRequest.useMutation({
    onSuccess: newReq => console.log(newReq),
  });
  function handleSendRequest() {
    mutate({ fundraisingId: data?.id as string });
  }
  return (
    <BasicBaseLayout>
      <Shell>
        <FundDetail
          fund={data as unknown as FundWithOwner}
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

  await helpers.fundraising.getById.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};
