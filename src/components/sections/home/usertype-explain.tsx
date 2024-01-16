import { Avatar, Box, Container, Paper, SimpleGrid } from '@mantine/core';

export default function UsertypeExplain() {
  return (
    <Box bg={'var(--mantine-color-primary-0)'}>
      <Container ta={'center'} size={'xl'}>
        <SimpleGrid cols={{ base: 1, lg: 3 }} p={40}>
          <Paper
            w={'100%'}
            mih={{ base: 200, lg: 400 }}
            p={20}
            shadow="sm"
            withBorder
            radius={'md'}
            ta={'center'}
          >
            <Avatar
              src="/images/supporter/supporter_logo.png"
              alt="supporter"
              size={120}
              m={'auto'}
            />
            <h1 className="pb-3 pt-3 font-bold">Дэмжигч</h1>
            <p>
              Та санд байршсан дурын төсөл хөтөлбөрүүдийг дэмжин, өөрийн нэрийн
              нийгмийн хариуцлагийг тодотгох түүхчилсэн самбар эзэмшээрэй.
            </p>
          </Paper>
          {/* partner */}
          <Paper
            w={'100%'}
            mih={{ base: 200, lg: 400 }}
            p={20}
            shadow="sm"
            withBorder
            radius={'md'}
            ta={'center'}
          >
            <Avatar
              src="/images/partner/partner_logo.png"
              alt="partner"
              size={120}
              m={'auto'}
            />
            <h1 className="pb-3 pt-3 font-bold">Хамтрагч</h1>
            <p>
              Та мэдээ,төсөл,хөтөлбөрүүдээ энд байршуулснаар олон
              нийт,дэмжигчид,сайн дурын ажилтнуудад цаг алдалгүй хүргэж,хандив
              болон бусад олон төрлийн дэмжлэг аваарай.
            </p>
          </Paper>
          {/* volunteer */}
          <Paper
            w={'100%'}
            mih={{ base: 200, lg: 400 }}
            p={20}
            shadow="sm"
            withBorder
            radius={'md'}
            ta={'center'}
          >
            <Avatar
              src="/images/volunteer/volunteer_logo.png"
              alt="volunteer"
              size={120}
              m={'auto'}
            />
            <h1 className="pb-3 pt-3 font-bold">Сайн дурын ажилтан</h1>
            <p>
              Та өөрийн ур чадвар,хүсэл сонирхолд тулгуурлан санд байршуулсан
              сайн дурын хөтөлбөрүүдэд оролцож үнэ цэнэтэй сертификаттай
              болж,үнэгүй сургалтанд хамрагдаарай.
            </p>
          </Paper>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
