import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';

import FundDetail from '@/components/detail/fund-detail';
import VolunteerLayout from '@/components/layout/volunteer-layout';
import { Button } from '@/components/ui/button';
import { getServerAuthSession } from '@/lib/auth';
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

  const { mutate } = api.fundraising.sendRequest.useMutation({
    onSuccess: newReq => console.log(newReq),
  });
  function handleSendRequest() {
    mutate({ fundraisingId: data?.id as string });
  }
  return (
    <VolunteerLayout>
      <FundDetail
        fund={data}
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