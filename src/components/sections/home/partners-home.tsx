import { Center, Container, Flex, Image, Title } from '@mantine/core';

export default function PartnersHome() {
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
        <Image
          src="/images/partner/partner1.png"
          alt="airTour"
          h={100}
          w={200}
          fit="contain"
        />
        <Image
          h={100}
          w={200}
          fit="contain"
          src="/images/partner/partner2.png"
          alt="ttr"
        />
        <Image
          h={100}
          w={200}
          miw={200}
          fit="contain"
          src="/images/partner/partner3.png"
          alt="Lotus"
        />
      </Flex>
    </Container>
  );
}
