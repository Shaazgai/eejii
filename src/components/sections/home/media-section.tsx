import { api } from '@/utils/api';
import {
  Badge,
  Button,
  Container,
  Flex,
  Image,
  Paper,
  SimpleGrid,
  Skeleton,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import { format } from 'date-fns';
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
            {medias.map((media, i) => {
              const image =
                process.env.NEXT_PUBLIC_AWS_PATH +
                '/' +
                media?.Images?.[0]?.path;
              return (
                <Paper key={i}>
                  <Image
                    src={image}
                    fallbackSrc="/images/placeholder.svg"
                    alt="mediaIMG"
                    radius={'lg'}
                    height={180}
                    w={'100%'}
                  />
                  <Badge mt={'sm'} color="gray.3" c={'gray.8'} radius={'xl'}>
                    {format(media.createdAt, 'yyyy-MM-dd HH:mm:ss')}
                  </Badge>
                  <Text fw={600} mt={'sm'}>
                    {media.title}
                  </Text>
                  <Text lineClamp={4} mt={5} c="dimmed">
                    {media.body}
                  </Text>
                  <Button
                    component={Link}
                    mt={'lg'}
                    fullWidth
                    variant="outline"
                    href={`/media/${media.id}`}
                    radius={'lg'}
                    rightSection={<IconArrowUpRight />}
                  >
                    Унших
                  </Button>
                </Paper>
              );
            })}
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
