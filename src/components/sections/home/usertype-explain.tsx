import { Avatar, Paper, SimpleGrid } from '@mantine/core';
import { api } from '@/utils/api';

export default function UsertypeExplain() {
  const { data: banner11 } = api.banner.findAll.useQuery({
    positionCode: 'supporter_logo_banner',
    limit: 1,
  });
  const userFirst = banner11
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner11[0]?.path
    : 'null';
  const { data: banner12 } = api.banner.findAll.useQuery({
    positionCode: 'partner_logo_banner',
    limit: 1,
  });
  const userSecond = banner12
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner12[0]?.path
    : 'null';
  const { data: banner13 } = api.banner.findAll.useQuery({
    positionCode: 'volunteer_logo_banner',
    limit: 1,
  });
  const userThird = banner13
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner13[0]?.path
    : 'null';

  return (
    <SimpleGrid
      bg={'var(--mantine-color-teal-0)'}
      cols={{ base: 1, lg: 3 }}
      p={40}
    >
      <Paper
        w={'100%'}
        mih={{ base: 200, lg: 400 }}
        p={20}
        shadow="sm"
        withBorder
        radius={'md'}
        ta={'center'}
      >
        <Avatar src={userFirst} alt="supporter" size={120} m={'auto'} />
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
        <Avatar src={userSecond} alt="partner" size={120} m={'auto'} />
        <h1 className="pb-3 pt-3 font-bold">Хамтрагч</h1>
        <p>
          Та мэдээ,төсөл,хөтөлбөрүүдээ энд байршуулснаар олон
          нийт,дэмжигчид,сайн дурын ажилтнуудад цаг алдалгүй хүргэж,хандив болон
          бусад олон төрлийн дэмжлэг аваарай.
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
        <Avatar src={userThird} alt="volunteer" size={120} m={'auto'} />
        <h1 className="pb-3 pt-3 font-bold">Сайн дурын ажилтан</h1>
        <p>
          Та өөрийн ур чадвар,хүсэл сонирхолд тулгуурлан санд байршуулсан сайн
          дурын хөтөлбөрүүдэд оролцож үнэ цэнэтэй сертификаттай болж,үнэгүй
          сургалтанд хамрагдаарай.
        </p>
      </Paper>
    </SimpleGrid>
  );
}
