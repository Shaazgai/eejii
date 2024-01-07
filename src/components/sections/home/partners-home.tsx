import { Center, Container, Flex, Image, Title } from '@mantine/core';
import { api } from '@/utils/api';

export default function PartnersHome() {
  const { data: banner8 } = api.banner.findAll.useQuery({
    positionCode: 'partner_airtour_banner',
    limit: 1,
  });
  const PartnerFirst = banner8
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner8.banners[0]?.path
    : '';
  const { data: banner9 } = api.banner.findAll.useQuery({
    positionCode: 'partner_ttr_banner',
    limit: 1,
  });
  const PartnerSecond = banner9
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner9.banners[0]?.path
    : '';
  const { data: banner10 } = api.banner.findAll.useQuery({
    positionCode: 'partner_lotus_banner',
    limit: 1,
  });
  const PartnerThird = banner10
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner10.banners[0]?.path
    : '';
  return (
    <Container size={'xl'}>
      <Center pt={40}>
        <Title>Манай хамрагчид</Title>
      </Center>
      <Flex
        w={'100%'}
        justify="space-around"
        align="flex-start"
        direction="row"
        wrap="wrap"
        gap={20}
        p={50}
      >
        <Image src={PartnerFirst} alt="airTour" h={100} w={200} fit="contain" />
        <Image h={100} w={200} fit="contain" src={PartnerSecond} alt="ttr" />
        <Image
          h={100}
          w={200}
          miw={200}
          fit="contain"
          src={PartnerThird}
          alt="Lotus"
        />
      </Flex>
    </Container>
  );
}
