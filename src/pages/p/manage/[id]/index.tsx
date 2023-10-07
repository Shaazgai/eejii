import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import superjson from 'superjson';

import FundDetail from '@/components/detail/fund-detail';
import PartnerLayout from '@/components/layout/partner-layout';
import { Shell } from '@/components/shells/shell';
import { Button } from '@/components/ui/button';
import { getServerAuthSession } from '@/lib/auth';
import type { Fundraising } from '@/lib/db/types';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { api } from '@/utils/api';

export default function EventViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  if (!props) return <>Loading...</>;
  const { id } = props;
  const { data } = api.fundraising.getById.useQuery({ id: id as string });
  // const { data: requests } = api.eventAssociation.findAll.useQuery({
  //   type: null,
  //   status: null,
  //   eventId: null,
  //   eventsOwnerId: '9cf3294b-ee52-40c2-ac22-07028dff4a3a',
  //   userId: null,
  // });
  // const { data: requests, isLoading: isRequestLoading } =
  //   api.partner.getMytProjectsJoinRequestsOrInvitations.useQuery({
  //     projectType: 'fundraising',
  //     status: null,
  //     requestType: 'request',
  //   });
  if (!data) return <>404</>;
  // if (isRequestLoading) <>...Loading</>;
  // const [activeIndex, setActiveIndex] = useState(0);
  // console.log(requests);
  return (
    <PartnerLayout>
      <Shell>
        <FundDetail
          fund={data as unknown as Fundraising}
          actionButton={
            <Button
              type="submit"
              onClick={() => {
                router.push(`/p/manage/${data.id}/edit`);
              }}
            >
              Edit
            </Button>
          }
        />
        {/* <NormalTabs
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          tabs={tabs}
        /> */}
        <div>
          <Button onClick={() => router.push(`/p/manage/${data.id}/invite`)}>
            Invite users
          </Button>
        </div>
        {false
          ? // <RequestsDataTable data={} type={'fundaising'} />
            null
          : 'loadiing..'}
      </Shell>
    </PartnerLayout>
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

  await helpers.event.getById.prefetch({ id });
  // await helpers.partner.getMytProjectsJoinRequestsOrInvitations.prefetch({
  //   projectType: 'fundraising',
  //   status: null,
  //   requestType: 'request',
  // });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};
