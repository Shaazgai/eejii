import {
  Center,
  Container,
  Flex,
  Image,
  Space,
  Text,
  Title,
} from '@mantine/core';

export default function VolunteersMap() {
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
            <Image
              maw={180}
              src="/images/volunteer_level/level_4.png"
              alt="levelIMG"
            />
            <Text fz={{ base: 28, lg: 20 }} fw={500}>
              0 Volunteers
            </Text>
          </Flex>
          <Flex
            align={'center'}
            gap={10}
            direction={{ base: 'row', lg: 'column' }}
          >
            <Image
              maw={180}
              src="/images/volunteer_level/level_3.png"
              alt="levelIMG"
            />
            <Text fz={{ base: 28, lg: 20 }} fw={500}>
              0 Volunteers
            </Text>
          </Flex>
          <Flex
            align={'center'}
            gap={10}
            direction={{ base: 'row', lg: 'column' }}
          >
            <Image
              maw={180}
              src="/images/volunteer_level/level_2.png"
              alt="levelIMG"
            />
            <Text fz={{ base: 28, lg: 20 }} fw={500}>
              0 Volunteers
            </Text>
          </Flex>
          <Flex
            align={'center'}
            gap={10}
            direction={{ base: 'row', lg: 'column' }}
          >
            <Image
              maw={180}
              src="/images/volunteer_level/level_1.png"
              alt="levelIMG"
            />
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
      <Image
        src="/images/homie/map.png"
        height={500}
        w={'100%'}
        radius={'lg'}
        alt="img"
      />
    </Container>
  );
}
