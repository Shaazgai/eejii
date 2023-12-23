import PublicLayout from '@/components/layout/public-layout';
import { MediaDetail } from '@/components/media/media-detail';
import { RelatedMedias } from '@/components/media/related-medias';
import type { Media } from '@/lib/types';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { api } from '@/utils/api';
import { Container, LoadingOverlay, Space } from '@mantine/core';
import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';

export default function Detail(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { id } = props;
  if (!id) <LoadingOverlay visible />;
  const { data: media } = api.media.getById.useQuery({ id: id as string });
  return (
    <PublicLayout>
      <Space h={'xl'} />
      <Container size={'lg'}>
        {media ? <MediaDetail media={media as unknown as Media} /> : 'no media'}
        <Space h={130} />
        <RelatedMedias id={media?.id as string} />
      </Container>
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      db: db,
      userId: undefined,
      userType: undefined,
      role: undefined,
    },
    transformer: superjson, // optional - adds superjson serialization
  });

  const id = context.params?.id;

  if (typeof id !== 'string') throw new Error('no id');

  await helpers.media.getById.prefetch({ id: id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};
