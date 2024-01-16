import { api } from '@/utils/api';
import {
  Text,
  BackgroundImage,
  Paper,
  Button,
  Space,
  Grid,
  Flex,
  Container,
} from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';

export default function Banner() {
  const { data: banner4 } = api.banner.findAll.useQuery({
    positionCode: 'home_left_middle',
    limit: 1,
  });
  const HomeMiddleLeft = banner4
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner4.banners[0]?.path
    : '';
  const { data: banner5 } = api.banner.findAll.useQuery({
    positionCode: 'home_right_middle',
    limit: 1,
  });
  const HomeMiddleRight = banner5
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner5.banners[0]?.path
    : '';

  return (
    <Container ta={'center'} p={20} size={'xl'}>
      <div className="w-full">
        <div>
          <h1 className="h-24 font-serif text-4xl font-extrabold text-primaryDark">
            Хамтдаа <br /> хайр дүүрэн ертөнцийг бүтээе
          </h1>
          <p className="text-xl">
            Монгол дахь хүмүүнлэгийн үйл ажиллагаа <br /> болон сайн дурынхныг
            дэмжих сан
          </p>
          <h2 className="pt-2 text-xl font-bold uppercase text-primary">
            All in one
          </h2>
        </div>
        <Space h="lg" />
        <Flex h="100%" direction={{ base: 'column', lg: 'row' }} gap={'md'}>
          <Grid columns={6} gutter={'md'}>
            <Grid.Col span={{ base: 6, lg: 3 }}>
              <Paper bg={'primary.6'} p={10} radius="lg" ta={'start'}>
                <Text fw={500} fz={30} c={'white'}>
                  55%
                </Text>
                <Text c={'white'}>
                  Манай нийт <br /> оролцогчдын 55 хувийг <br /> нь сайн дурын
                  ажилчид эзэлж байна
                </Text>
                <Button
                  radius={'lg'}
                  mt={20}
                  fullWidth
                  rightSection={<IconArrowUpRight />}
                >
                  Бидэнтэй нэгдэх
                </Button>
              </Paper>
              <Space h={{ base: 0, lg: 'md' }} />
              <div className="hidden lg:flex rounded-2xl bg-[#245255] px-4 py-8 items-center">
                <img
                  src="/images/homie/Checkmark.png"
                  alt="chekMarkIMG"
                  className="h-[55px] w-[55px]"
                />
                <h1 className="pl-2 font-bold text-white">Be a good Human</h1>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 6, lg: 3 }}>
              <Flex h={'100%'} gap="md" w="100%" justify={'space-between'}>
                <div className="flex lg:hidden rounded-2xl bg-[#245255] w-96 px-4 py-8 items-center justify-center flex-col gap-4">
                  <img
                    src="/images/homie/Checkmark.png"
                    alt="chekMarkIMG"
                    className="h-[55px] w-[55px]"
                  />
                  <h1 className="pl-2 font-bold text-white">Be a good Human</h1>
                </div>
                <Paper
                  w="100%"
                  bg={'primary.6'}
                  radius="lg"
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    alignSelf: 'end',
                  }}
                  h={{ base: '220px', lg: '70%' }}
                >
                  <BackgroundImage src={HomeMiddleLeft} h={'100%'}>
                    <Flex h={'100%'} align={'center'} justify={'center'}>
                      <Text fw={600} fz={20} c={'white'}>
                        Нийт 20+ cайн дурын ажлууд
                      </Text>
                    </Flex>
                  </BackgroundImage>
                </Paper>
              </Flex>
            </Grid.Col>
          </Grid>
          <Flex mih="100%" align={'end'}>
            <Paper
              w="100%"
              h={'150px'}
              p="10"
              pt="30"
              bg={'gray.4'}
              radius="lg"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Text fw={500}>
                Бид нийт 4.819.065,00 төгрөгийн хандив цуглуулжээ
              </Text>
              <Button fullWidth rightSection={<IconArrowUpRight />} radius="lg">
                Хандив өгөх
              </Button>
            </Paper>
          </Flex>
          <Grid columns={6} gutter={'md'}>
            <Grid.Col span={{ base: 6, lg: 3 }}>
              <Flex h={'100%'} gap="md" w="100%" justify={'space-between'}>
                <Paper
                  w="100%"
                  bg={'primary.6'}
                  radius="lg"
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    alignSelf: 'end',
                  }}
                  h={{ base: '220px', lg: '70%' }}
                >
                  <BackgroundImage src={HomeMiddleRight} h={'100%'}>
                    <Flex h={'100%'} align={'center'} justify={'center'}>
                      <Text fw={600} fz={20} c={'white'}>
                        Нийт 20+ cайн дурын ажлууд
                      </Text>
                    </Flex>
                  </BackgroundImage>
                </Paper>
                <div className="flex lg:hidden rounded-2xl bg-[#245255] w-96 px-4 py-8 items-center justify-center flex-col gap-4">
                  <img src="/images/homie/Checkmark.png" alt="chekMarkIMG" />
                  <h1 className="pl-2 font-bold text-white">Be a good Human</h1>
                </div>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 6, lg: 3 }}>
              <Paper bg={'primary.6'} p={10} radius="lg" ta={'start'}>
                <Text fw={500} fz={30} c={'white'}>
                  55%
                </Text>
                <Text c={'white'}>
                  Манай нийт <br /> оролцогчдын 55 хувийг <br /> нь сайн дурын
                  ажилчид эзэлж байна
                </Text>
                <Button
                  radius={'lg'}
                  mt={20}
                  fullWidth
                  rightSection={<IconArrowUpRight />}
                >
                  Бидэнтэй нэгдэх
                </Button>
              </Paper>
              <Space h={{ base: 0, lg: 'md' }} />
              <div className="hidden lg:flex rounded-2xl bg-[#245255] px-4 py-8 items-center">
                <img
                  src="/images/homie/Checkmark.png"
                  alt="chekMarkIMG"
                  className="h-[55px] w-[55px]"
                />
                <h1 className="pl-2 font-bold text-white">Be a good Human</h1>
              </div>
            </Grid.Col>
          </Grid>
        </Flex>
      </div>
    </Container>
  );
}
