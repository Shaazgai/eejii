import { getAuth } from '@clerk/nextjs/server';
import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';

import FundDetail from '@/components/detail/fund-detail';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import type { FundraisingType } from '@/lib/types';
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
  return (
    <BasicBaseLayout>
      <FundDetail fund={data as unknown as FundraisingType} />
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
