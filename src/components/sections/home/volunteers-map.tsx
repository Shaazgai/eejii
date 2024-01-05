import {
  Center,
  Container,
  Flex,
  Image,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { api } from '@/utils/api';

export default function VolunteersMap() {
  const { data: banner14 } = api.banner.findAll.useQuery({
    positionCode: 'level_first_banner',
    limit: 1,
  });
  const levelFirst = banner14
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner14[0]?.path
    : 'null';
  const { data: banner15 } = api.banner.findAll.useQuery({
    positionCode: 'level_second_banner',
    limit: 1,
  });
  const levelSecond = banner15
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner15[0]?.path
    : 'null';
  const { data: banner16 } = api.banner.findAll.useQuery({
    positionCode: 'level_third_banner',
    limit: 1,
  });
  const levelThird = banner16
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner16[0]?.path
    : 'null';
  const { data: banner17 } = api.banner.findAll.useQuery({
    positionCode: 'level_four_banner',
    limit: 1,
  });
  const levelFour = banner17
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner17[0]?.path
    : 'null';

  const { data: banner18 } = api.banner.findAll.useQuery({
    positionCode: 'home_map_banner',
    limit: 1,
  });
  const HomeMap = banner18
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner18[0]?.path
    : 'null';

  return (
    <Container size={'xl'}>
      <Center w={'100%'} pt={80}>
        <Flex
          w={'100%'}
          justify="space-around"
          align="flex-start"
          direction="row"
          wrap="wrap"
          gap={20}
          pt={20}
        >
          <Flex
            align={'center'}
            gap={10}
            direction={{ base: 'row', lg: 'column' }}
          >
            <Image maw={180} src={levelFour} alt="levelIMG" />
            <Text fz={{ base: 28, lg: 20 }} fw={500}>
              0 Volunteers
            </Text>
          </Flex>
          <Flex
            align={'center'}
            gap={10}
            direction={{ base: 'row', lg: 'column' }}
          >
            <Image maw={180} src={levelThird} alt="levelIMG" />
            <Text fz={{ base: 28, lg: 20 }} fw={500}>
              0 Volunteers
            </Text>
          </Flex>
          <Flex
            align={'center'}
            gap={10}
            direction={{ base: 'row', lg: 'column' }}
          >
            <Image maw={180} src={levelSecond} alt="levelIMG" />
            <Text fz={{ base: 28, lg: 20 }} fw={500}>
              0 Volunteers
            </Text>
          </Flex>
          <Flex
            align={'center'}
            gap={10}
            direction={{ base: 'row', lg: 'column' }}
          >
            <Image maw={180} src={levelFirst} alt="levelIMG" />
            <Text fz={{ base: 28, lg: 20 }} fw={500}>
              0 Volunteers
            </Text>
          </Flex>
        </Flex>
      </Center>
      <Space h={'xl'} />
      <Center>
        <Title order={1} p={20}>
          Дэлхийн өнцөг булан бүрдэх манай сайн дурынхан
        </Title>
      </Center>
      <Image src={HomeMap} height={500} w={'100%'} radius={'lg'} alt="img" />
    </Container>
  );
}
