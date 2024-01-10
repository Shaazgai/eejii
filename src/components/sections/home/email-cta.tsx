import {
  Button,
  Center,
  Container,
  Flex,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

export default function EmailCta() {
  return (
    <Container
      ta={'center'}
      size={'2xl'}
      h={302}
      pt={30}
      className="bg-[#d5e4e5]"
    >
      <Stack>
        <Title order={1}>Тогтмол мэдээллээ авах</Title>
        <Center>
          <Text ta={'center'} maw={800}>
            Та санд нэмэгдэж буй шинэ төсөл хөтөлбөрүүд, хамрагдах боломжтой
            сургалт, арга хэмжээ зэрэг сүүлийн үеийн мэдээ, мэдээллүүдийг цаг
            алдалгүй, тогтмол авахыг хүсвэл дараах хэсэгт мэйл хаягаа
            бүртгүүлэхэд хангалттай.
          </Text>
        </Center>
      </Stack>
      <Space h={'lg'} />
      <Center>
        <Flex
          align={'center'}
          direction={{ base: 'column', lg: 'row' }}
          gap={10}
        >
          <TextInput
            w={300}
            size="lg"
            radius={'xl'}
            type="email"
            placeholder="Email address"
          />
          <Button size="lg" radius={'xl'} type="submit">
            Мэдээлэл авах
          </Button>
        </Flex>
      </Center>
    </Container>
  );
}
