import BasicBaseLayout from '@/components/layout/basic-base-layout';
import { SimpleGrid, Rating, Text, Button, Image } from '@mantine/core';
import { api } from '@/utils/api';
import Link from 'next/link';

export default function Index() {
  const { data: banner } = api.banner.findAll.useQuery({
    positionCode: 'partners_banner_image',
    limit: 1,
  });
  const partnersBanner = banner
    ? process.env.NEXT_PUBLIC_AWS_PATH + '/' + banner.banners[0]?.path
    : '';
  return (
    <BasicBaseLayout>
      <div className="h-[432px] bg-primary flex justify-around">
        <div className="w-[60%] flex justify-center items-center pt-20">
          <div className="bg-[url('/images/partner/partnersBg.png')] h-[311px] w-[338px]">
            <img
              src="/images/partner/partnerLeftTop.png"
              alt="roundIMG"
              className="h-[125px] w-[133px] absolute top-28 left-60"
            />
            <img
              src="/images/partner/partnerIn.png"
              alt="in"
              className="h-[228px] w-[257px]  relative top-8 left-6"
            />
            <img
              src="/images/partner/partnerBottom.png"
              alt="topRounded"
              className="h-[80px] w-[86px]  relative top-6 left-64"
            />
          </div>
          {/* <img
            src="/images/partner/partnerRightTop.png"
            alt="cycle"
            className="h-[80px] w-[86px] absolute top-32 left-[36%]"
          /> */}
        </div>
        <div className="w-[40%] flex flex-col justify-center items-start">
          <h1 className="text-brand450 text-5xl">Eejii partners</h1>
          <h2 className="text-brand450 text-xl pt-5 pb-6">
            Let’s create an earth full of love together
          </h2>
          <Link href="/auth/login?callbackUrl=%2Fv">
            <button className="border border-primarySecond pt-4 pb-4 pr-7 pl-7 bg-primarySecond rounded-2xl font-semibold">
              Хамтрагч болох
            </button>
          </Link>
        </div>
      </div>
      <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }}>
        <div className="flex flex-col justify-around items-start text-start pl-20 pr-20 pt-12 pb-12">
          <h1 className="text-brand400 font-semibold text-3xl leading-[46px]">
            Сайхан ирээдүйг сайн хүн биш сайн хүмүүс бүтээдэг
          </h1>
          <p className="text-lg italic font-semibold">
            “Бид нэгдсэнээр зөв тусыг хэрэгтэй хүнд нь хүргэх, нийгмийн хэт
            туйлшрал, бэлэнчлэх сэтгэлгээ, ядуурал, өвчлөлөөс хүн амыг <br />{' '}
            хамгаалан хамтдаа олон талаар хөгжүүлэх боломжтой”
          </p>
          <h2 className="text-lg font-semibold">
            Ананда Диди, Бадамлянхуа асрамжийн төвийн үүсгэн байгуулагч
          </h2>
        </div>
        <div className="">
          <img
            src="/images/partner/partnerAbout.png"
            alt="partnerIMg"
            className="w-full"
          />
        </div>
      </SimpleGrid>
      <div className="w-[283px] bg-[#fbfbfb]  m-auto">
        <h5 className="text-2xl pt-12 pb-2 text-center uppercase font-semibold border-b-4 border-primary">
          Бидний хамтрагчид
        </h5>
      </div>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        className="flex justify-around items-center pt-10 bg-[#fbfbfb]"
      >
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/library.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">
              Гандисийн олон нийтийн номын сан
            </h1>
            <img
              src="/images/partner/badge.png"
              alt="badge"
              className="h-[18px] w-[18px]"
            />
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/library.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">
              Гандисийн олон нийтийн номын сан
            </h1>
            <img
              src="/images/partner/badge.png"
              alt="badge"
              className="h-[18px] w-[18px]"
            />
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/library.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">
              Гандисийн олон нийтийн номын сан
            </h1>
            <img
              src="/images/partner/badge.png"
              alt="badge"
              className="h-[18px] w-[18px]"
            />
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/library.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">
              Гандисийн олон нийтийн номын сан
            </h1>
            <img
              src="/images/partner/badge.png"
              alt="badge"
              className="h-[18px] w-[18px]"
            />
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/library.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">
              Гандисийн олон нийтийн номын сан
            </h1>
            <img
              src="/images/partner/badge.png"
              alt="badge"
              className="h-[18px] w-[18px]"
            />
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/library.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">
              Гандисийн олон нийтийн номын сан
            </h1>
            <img
              src="/images/partner/badge.png"
              alt="badge"
              className="h-[18px] w-[18px]"
            />
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
      </SimpleGrid>
      <div className="pt-20 pb-20 bg-[#fbfbfb]">
        <Image src={partnersBanner} />
      </div>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        className="flex justify-around items-center pt-10 pb-16 bg-[#fbfbfb]"
      >
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/itPark.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">IT Park</h1>
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/lotus.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">
              Lotus children centre (Бадамлянхуа хүүхдийн төв)
            </h1>
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/lotus.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">
              Lotus children centre (Бадамлянхуа хүүхдийн төв)
            </h1>
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/itPark.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">IT Park</h1>
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/lotus.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">
              Lotus children centre (Бадамлянхуа хүүхдийн төв)
            </h1>
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/lotus.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">
              Lotus children centre (Бадамлянхуа хүүхдийн төв)
            </h1>
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/itPark.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">IT Park</h1>
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/lotus.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">
              Lotus children centre (Бадамлянхуа хүүхдийн төв)
            </h1>
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
        <div className="w-[373px] h-[232px] border shadow-2xl m-auto rounded-xl p-4 flex flex-col justify-around items-start">
          <img
            src="/images/partner/lotus.png"
            alt="library"
            className="h-[73px] w-[73px]"
          />
          <span className="flex items-center">
            <h1 className="text-md font-bold">
              Lotus children centre (Бадамлянхуа хүүхдийн төв)
            </h1>
          </span>
          <span className="flex items-center">
            <Rating
              fractions={2}
              defaultValue={1.5}
              color="rgba(255, 231, 13, 1)"
            />
            <h2 className="w-[19px] h-4 text-sm font-bold text-[#616161]">
              /3/
            </h2>
          </span>
          <Text size="md" c="[#616161]">
            IAHPC " International Association for Hospice and Palliative Care
            "-н албан ёсны гишүүн "ЭЭЖИЙ"
          </Text>
        </div>
      </SimpleGrid>
      <section className="bg-[url('/images/media/firstBG.png')] bg-cover w-full pt-16 pb-16">
        <div>
          <div className="w-[417px] bg-transparent pb-10 m-auto">
            <h5 className="text-2xl pb-2 text-center uppercase font-semibold border-b-4 border-primary">
              ХЭРХЭН БИДЭНТЭЙ ХАМТРАХ ВЭ?
            </h5>
          </div>
          <Text fw={500} size="md" pt={10} pl={120} pr={120} ta="center">
            {' '}
            Эдгээр хураамжууд нь тус сангийн зар сурталчилгаа, маркетинг, үйл
            ажиллагааны зардал, цалин, татвар хураамж, сайн үйлсийн болон сайн
            дурын хөтөлбөр зэрэг зайлшгүй шаардлагатай зардлыг санхүүжүүлнэ.{' '}
          </Text>
        </div>
        <SimpleGrid
          cols={{ base: 1, md: 2, lg: 3 }}
          className="flex w-full justify-around pt-10"
        >
          <div className="m-auto flex h-[278px] w-[359px]  flex-col justify-around rounded-xl bg-brand450 text-center before:relative before:h-[28px]  before:w-[4px] before:bg-brand450 before:rounded-sm pt-5 bg-[url('/images/about/blueBG.png')]">
            <h2 className="relative flex bottom-12 left-7 text-3xl font-black text-brand450">
              ₮0
              <h5 className="pl-2 pt-3 text-sm text-gray-200">1 жил</h5>
            </h2>
            <span className="relative bottom-14 left-7 text-start text-xl font-extrabold text-brand450">
              Basic Plan
            </span>
            <ul className="relative bottom-14 w-[322px] text-md pl-7 text-start text-gray-200">
              Та санд төсөл хөтөлбөр болон арга хэмжээ оруулах,сурталчилгаа
              байршуулах болон өөрийн нэр дээрх хуудсыг хөгжүүлээрэй
            </ul>
            <Link href="#">
              <Button className="relative right-16 bottom-5 h-[48px] w-[182px] rounded-xl bg-[#0356b2] border-1.5 border-[#0356b2] font-bold text-lg text-brand450  hover:bg-[#0356b2]">
                Гишүүн болох
              </Button>
            </Link>
          </div>
          <div className="m-auto flex h-[278px] w-[359px]  flex-col justify-around rounded-xl bg-brand450 text-center before:relative before:h-[28px]  before:w-[4px] before:bg-brand450 pt-5 before:rounded-sm bg-[url('/images/about/primaryBG.png')]">
            <h2 className="relative flex bottom-12 left-7 text-3xl font-black text-brand450">
              ₮3'000'000
              <h5 className="pl-2 pt-3 text-sm text-gray-200">1 жил</h5>
            </h2>
            <span className="relative bottom-14 left-7 text-start text-xl font-extrabold text-brand450">
              Standart Plan
            </span>
            <ul className="relative bottom-14 w-[322px] text-md pl-7 text-start text-gray-200">
              Та санд төсөл хөтөлбөр болон арга хэмжээ оруулах,сурталчилгаа
              байршуулах болон өөрийн нэр дээрх хуудсыг хөгжүүлээрэй
            </ul>
            <Link href="#">
              <Button className="relative right-16 bottom-5 h-[48px] w-[182px] rounded-xl bg-primary border-1.5 border-primary font-bold text-lg text-brand450  hover:bg-primary">
                Гишүүн болох
              </Button>
            </Link>
          </div>
          <div className="m-auto flex h-[278px] w-[359px]  flex-col justify-around rounded-xl bg-brand450 text-center before:relative before:h-[28px]  before:w-[4px] before:bg-brand450 pt-5 before:rounded-sm bg-[url('/images/about/cyanBG.png')]">
            <h2 className="relative flex bottom-12 left-7 text-3xl font-black text-brand450">
              Premium Plan
            </h2>
            <span className="relative bottom-16 left-7 text-start text-xl font-extrabold text-brand450">
              Coming soon...
            </span>
            <ul className="relative bottom-12 left-28 flex justify-center w-[139px] height-[101px] bg-[url('/images/about/womanBG.png')] object-cover pr-4 text-start">
              <img
                src="/images/about/woman.png"
                alt="woman"
                className="h-[100px] w-[116px]"
              />
            </ul>
          </div>
        </SimpleGrid>
      </section>
    </BasicBaseLayout>
  );
}
