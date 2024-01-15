import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';

import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { ProjectList } from '@/components/list/project-list';
import { getServerAuthSession } from '@/lib/auth';
import type { Project } from '@/lib/types';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { api } from '@/utils/api';
import { Container, LoadingOverlay, Space } from '@mantine/core';
import { FeaturedProjectDetail } from '@/components/project/featured-detail';
import { ProjectDetail } from '@/components/project/detail';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { UserType } from '@/lib/db/enums';

export default function EventViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const session = useSession();
  const { id } = props;
  const { data: project, isLoading } = api.project.findById.useQuery({
    id: id as string,
  });
  const { data: relatedProjects, isLoading: isRelatedLoading } =
    api.project.findRelated.useQuery({
      excludeId: project?.id as unknown as string,
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
  function goBack() {
    if (!session) {
      router.push('/projects');
    }
    if (session.data?.user.userType === UserType.USER_VOLUNTEER) {
      router.push('/v/projects');
    } else {
      router.push('/projects');
    }
  }
  return (
    <BasicBaseLayout>
      {project?.featured == true ? (
        <FeaturedProjectDetail
          project={project as unknown as Project}
          goBack={goBack}
        />
      ) : (
        <ProjectDetail
          project={project as unknown as Project}
          goBack={goBack}
        />
      )}
      <Container size={'xl'}>
        <Space h="lg" />
        <ProjectList
          projects={relatedProjects as unknown as Project[]}
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

  await helpers.project.findById.prefetch({ id: id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};
