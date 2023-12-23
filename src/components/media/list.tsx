import type { Media } from '@/lib/types';
import { api } from '@/utils/api';
import {
  Alert,
  Center,
  Flex,
  Pagination,
  SimpleGrid,
  Skeleton,
  Stack,
  Title,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MediaCard } from './card';

export const MediaList = () => {
  const router = useRouter();
  const { category, categoryName, q, page } = router.query;
  const [activePage, setPage] = useState(page ? +page : 1);
  const limit = 10;

  function handleSetPage(value: number) {
    setPage(value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: value },
    });
  }

  const {
    data: medias,
    isLoading,
    refetch,
    isRefetching,
  } = api.media.findAll.useQuery({
    search: q as string,
    category: category as string,
    page: activePage,
    limit,
  });
  console.log(medias);
  console.log(q);

  useEffect(() => {
    refetch();
  }, [q, category]);

  if (isLoading || isRefetching) {
    return (
      <Stack>
        <Flex>
          <Skeleton h={40} w={200} />
        </Flex>
        <SimpleGrid cols={{ base: 2, lg: 3, xl: 4 }}>
          <Skeleton h={400} w={300} />
          <Skeleton h={400} w={300} />
          <Skeleton h={400} w={300} />
        </SimpleGrid>
      </Stack>
    );
  }
  const totalPages =
    medias && medias?.length > 0 ? Math.ceil(medias?.length / limit) : 0;
  return (
    <Stack>
      <Flex>
        <Title
          order={2}
          style={{
            borderBottom: '2px solid var(--mantine-color-teal-7)',
          }}
        >
          {categoryName ?? 'News'}
        </Title>
      </Flex>
      <SimpleGrid cols={{ base: 2, lg: 3, xl: 4 }}>
        {medias && medias.length > 0 ? (
          medias.map((media, i) => (
            <MediaCard key={i} media={media as unknown as Media} />
          ))
        ) : (
          <Alert variant="light" color="blue" title="No medias"></Alert>
        )}
      </SimpleGrid>
      <Center>
        <Pagination
          value={activePage}
          onChange={handleSetPage}
          total={totalPages}
          radius="xl"
        />
      </Center>
    </Stack>
  );
};
