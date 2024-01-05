import { api } from '@/utils/api';
import {
  BackgroundImage,
  Button,
  Container,
  Flex,
  Image,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
export default function Features() {
  const { data: banner7 } = api.banner.findAll.useQuery({
    positionCode: 'home_right_border',
    limit: 1,
  });
  const HomeRightBorder = banner7
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner7[0]?.path
    : 'null';
  const { data: banner8 } = api.banner.findAll.useQuery({
    positionCode: 'home_event_banner',
    limit: 1,
  });
  const HomeEventBanner = banner8
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner8[0]?.path
    : 'null';
  return (
    <BackgroundImage src={HomeRightBorder}>
      <Container fluid p={'lg'}>
        <Title ml={20} order={1}>
          <span className="text-primary">Eejii.org</span>-ийн онцлог
        </Title>
        <SimpleGrid cols={{ base: 1, lg: 3 }}>
          {/* event1 */}
          <Paper
            p={20}
            bg="none"
            className="relative before:absolute before:bottom-12  before:left-2 before:h-[290px] before:w-[4px] before:bg-[#FBC26E]"
          >
            <Title order={5} p={10}>
              Төсөл хөтөлбөрүүд
            </Title>
            <Flex direction={{ base: 'row', lg: 'column' }}>
              <Image
                height={'180'}
                w={{ base: '200', md: '500', lg: '100%' }}
                src={HomeEventBanner}
                alt="projectIMG"
              />
              <Text p={10}>
                “Ээжий Ертөнц” НҮТББ-ын хөнгөвчлөх тусламж үйлчилгээг сайжруулах
                зорилгын дор нийт 300 ширхэг дотроо 30 төрлийн хэрэглээний
                бүтээгдэхүүнийг багц болгон ХАЙР ДҮҮРЭН ЦҮНХ болгоод 120 өвчтөнд
                эмнэлгийн тодорхойлолтын дагуу “Ээжий” <br /> төслөөс хандивлах
                юм.
              </Text>
            </Flex>
            <Flex justify={'end'}>
              <Button
                variant="subtle"
                color="var(--mantine-color-teal-8)"
                component={Link}
                href={'/projects'}
                rightSection={<IconArrowRight />}
              >
                Бүгд
              </Button>
            </Flex>
          </Paper>
          {/* event2 */}
          <Paper
            p={20}
            bg="none"
            // display={'flex'}
            className="relative before:absolute before:bottom-12  before:left-2 before:h-[290px] before:w-[4px] before:bg-[#FBC26E]"
          >
            <Title order={5} p={10}>
              Төсөл хөтөлбөрүүд
            </Title>
            <Flex direction={{ base: 'row', lg: 'column' }}>
              <Image
                height={'180'}
                w={{ base: '200', md: '500', lg: '100%' }}
                src={HomeEventBanner}
                alt="projectIMG"
              />
              <Text p={10}>
                “Ээжий Ертөнц” НҮТББ-ын хөнгөвчлөх тусламж үйлчилгээг сайжруулах
                зорилгын дор нийт 300 ширхэг дотроо 30 төрлийн хэрэглээний
                бүтээгдэхүүнийг багц болгон ХАЙР ДҮҮРЭН ЦҮНХ болгоод 120 өвчтөнд
                эмнэлгийн тодорхойлолтын дагуу “Ээжий” <br /> төслөөс хандивлах
                юм.
              </Text>
            </Flex>
            <Flex justify={'end'}>
              <Button
                variant="subtle"
                color="var(--mantine-color-teal-8)"
                component={Link}
                href={'/projects'}
                rightSection={<IconArrowRight />}
              >
                Бүгд
              </Button>
            </Flex>
          </Paper>
          <Paper
            p={20}
            bg="none"
            // display={'flex'}
            className="relative before:absolute before:bottom-12  before:left-2 before:h-[290px] before:w-[4px] before:bg-[#FBC26E]"
          >
            <Title order={5} p={10}>
              Төсөл хөтөлбөрүүд
            </Title>
            <Flex direction={{ base: 'row', lg: 'column' }}>
              <Image
                height={'180'}
                w={{ base: '200', md: '500', lg: '100%' }}
                src={HomeEventBanner}
                alt="projectIMG"
              />
              <Text p={10}>
                “Ээжий Ертөнц” НҮТББ-ын хөнгөвчлөх тусламж үйлчилгээг сайжруулах
                зорилгын дор нийт 300 ширхэг дотроо 30 төрлийн хэрэглээний
                бүтээгдэхүүнийг багц болгон ХАЙР ДҮҮРЭН ЦҮНХ болгоод 120 өвчтөнд
                эмнэлгийн тодорхойлолтын дагуу “Ээжий” <br /> төслөөс хандивлах
                юм.
              </Text>
            </Flex>
            <Flex justify={'end'}>
              <Button
                variant="subtle"
                color="var(--mantine-color-teal-8)"
                component={Link}
                href={'/projects'}
                rightSection={<IconArrowRight />}
              >
                Бүгд
              </Button>
            </Flex>
          </Paper>
        </SimpleGrid>
      </Container>
    </BackgroundImage>
  );
}
