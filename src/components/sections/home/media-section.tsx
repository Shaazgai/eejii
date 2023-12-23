import { MediaCard } from '@/components/media/card';
import type { Media } from '@/lib/types';
import { api } from '@/utils/api';
import {
  Button,
  Container,
  Flex,
  SimpleGrid,
  Skeleton,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';

export default function MediaSection() {
  const { data: medias, isLoading } = api.media.findAll.useQuery({ limit: 4 });
  return (
    <Container p={'lg'} size={'xl'}>
      <Stack>
        <Title order={1}>Мэдээ</Title>
        <Flex justify="space-between" align={'start'}>
          <Text
            c="dimmed"
            fz={{ base: 16, lg: 20 }}
            maw={{ base: '320', lg: '100%' }}
          >
            Сангийн үйл ажиллагааны талаар сүүлийн үеийн мэдээлэлтэй хамтдаа
            байгаарай
          </Text>
          <Button
            component={Link}
            href={''}
            variant="outline"
            radius={'lg'}
            rightSection={<IconArrowUpRight />}
          >
            Дэлгэрэнгүй
          </Button>
        </Flex>
      </Stack>
      <Space h={'lg'} />
      {!isLoading ? (
        medias && medias.length > 0 ? (
          <SimpleGrid cols={{ base: 2, lg: 4 }}>
            {medias.map((media, i) => (
              <MediaCard key={i} media={media as unknown as Media} />
            ))}
          </SimpleGrid>
        ) : (
          <></>
        )
      ) : (
        <SimpleGrid cols={{ base: 2, lg: 4 }}>
          <Skeleton h={300} w={'100'} />
        </SimpleGrid>
      )}
    </Container>
  );
}
