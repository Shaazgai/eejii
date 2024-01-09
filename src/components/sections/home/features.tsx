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
  return (
    <BackgroundImage src="/images/homie/right_Border.png">
      <Container ta={'start'} size={'xl'}>
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
                src="/images/eventss/event_img1.png"
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
                src="/images/eventss/event_img2.png"
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
                src="/images/eventss/event_img3.png"
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
