import { getAuth } from '@clerk/nextjs/server';
import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import superjson from 'superjson';

import FundDetail from '@/components/detail/fund-detail';
import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';
import RequestsDataTable from '@/components/table/request/partner-join-request-table';
import type { FundraisingType, JoinRequestTableProps } from '@/lib/types';
import { appRouter } from '@/server/api/root';
import { prisma } from '@/server/db';
import { api } from '@/utils/api';

export default function EventViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!props) return <>Loading...</>;
  const { id } = props;
  const { data } = api.fundraising.getById.useQuery({ id: id as string });
  const { data: requests, isLoading: isRequestLoading } =
    api.partner.getMytProjectsJoinRequestsOrInvitations.useQuery({
      projectType: 'fundraising',
      status: null,
      requestType: 'request',
    });
  if (!data) return <>404</>;
  if (isRequestLoading) <>...Loading</>;
  // const [activeIndex, setActiveIndex] = useState(0);
  return (
    <PartnerLayout>
      <Shell>
        <FundDetail fund={data as unknown as FundraisingType} />
        {/* <NormalTabs
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          tabs={tabs}
        /> */}
        {requests ? (
          <RequestsDataTable
            data={requests as JoinRequestTableProps[]}
            type={'fundraising'}
          />
        ) : (
          'loadiing..'
        )}
        <Link href={`/p/manage/${props.id}/invite`}>Invite users</Link>
      </Shell>
    </PartnerLayout>
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
  await helpers.partner.getMytProjectsJoinRequestsOrInvitations.prefetch({
    projectType: 'fundraising',
    status: null,
    requestType: 'request',
  });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};
