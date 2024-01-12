import { Box, Center, Paper, SegmentedControl, Text } from '@mantine/core';
import { FallbackImage } from '@/components/common/fallback-image';

export const MyEvents = ({ volunteerId }: { volunteerId: string }) => {
  console.log(volunteerId);
  return (
    <Paper bg={'white'} p={20} shadow="xs">
      <Text fz="20" fw={500}>
        Арга хэмжээ
      </Text>
      <SegmentedControl
        mt={10}
        color="primary"
        fullWidth
        data={[
          { label: 'Хүсэлт илгээгдсэн', value: 'request_sent' },
          { label: 'Удахгүй болох арга хэмжээ', value: 'coming_soon' },
          { label: 'Дууссан', value: 'done' },
        ]}
      />
      <Box pt={40} pb="20">
        <Text>
          Одоогоор ямар нэгэн арга хэмжээнд бүртгүүлээгүй байна. Арга хэмжээ
          хэсэгээс дэлгэрэнгүй мэдээлэл аваарай
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
