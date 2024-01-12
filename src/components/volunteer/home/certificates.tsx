import { FallbackImage } from '@/components/common/fallback-image';
import { Box, Paper, Text, Button, Flex, Center } from '@mantine/core';

export const Certificates = () => {
  return (
    <Paper bg={'white'} p={20} shadow="xs">
      <Flex align={'center'} justify={'space-between'}>
        <Text fz="20" fw={500}>
          Сэртификат
        </Text>{' '}
        <Button radius="lg" variant={'outline'} color="primary">
          Тодорхойлолт авах
        </Button>
      </Flex>
      <Box pt={40} pb="20">
        <Text ta="center" maw="500" m="auto">
          Одоогоор сертификат аваагүй байна. Арга хэмжээнд оролцсоныхоо дараа
          энэ хэсгээс сертификат болон тодорхойлолтоо аваарай{' '}
        </Text>
        <Center mt="20">
          <FallbackImage
            src={'/icons/volunteer.svg'}
            width={100}
            height={100}
            alt="img"
          />
        </Center>
      </Box>
    </Paper>
  );
};
