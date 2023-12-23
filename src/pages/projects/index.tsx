import 'swiper/css';
import 'swiper/css/navigation';

// import Swiper core and required modules
// import { FallbackImage } from '@/components/common/fallback-image';
// import VolunteerLayout from '@/components/layout/volunteer-layout';
import { FallbackImage } from '@/components/common/fallback-image';
import BasicBaseLayout from '@/components/layout/basic-base-layout';
import {
  BackgroundImage,
  Button,
  Container,
  Flex,
  Grid,
  Paper,
  Space,
  Tabs,
  TextInput,
  Title,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Index() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>('project');

  function handleActiveTab(value: string | null) {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, type: value },
      },
      undefined,
      { shallow: true }
    );
    setActiveTab(value);
  }

  // const { data: projects, isLoading: isFundLoading } =
  //   api.project.getAll.useQuery({
  //     page: 1,
  //     limit: 10,
  //     enabled: true,
  //     status: ProjectStatus.APPROVED,
  //   });
  console.log(activeTab);

  return (
    <BasicBaseLayout>
      <FallbackImage
        w={'100%'}
        width={1600}
        radius={0}
        height={400}
        src="/images/projectss/main.png"
        alt="main"
      />
      <Container size={'xl'}>
        <Grid gutter={'xl'} columns={12} className="-translate-y-16">
          <Grid.Col span={{ base: 12, md: 7, lg: 8 }}>
            <Paper shadow="md" py={30} px={40} radius={'lg'}>
              <Title mb={10}>Та ямар төсөл дэмжихийг хүсч байна вэ?</Title>
              <Flex justify={'space-between'} gap={10}>
                <TextInput
                  w={'100%'}
                  placeholder="Нэр"
                  required
                  size="lg"
                  radius={'xl'}
                />
                <Button radius={'xl'} size="lg" miw={150}>
                  Төсөл хайх
                </Button>
              </Flex>
            </Paper>
            <Space h={'xl'} />
            <Title order={3} mb={10}>
              Онцгой төсөл
            </Title>
            <Paper>
              <BackgroundImage
                h={360}
                src="/images/projectss/main.png"
                radius={'lg'}
                style={{ overflow: 'hidden' }}
              >
                <Flex
                  direction={'column'}
                  align={'center'}
                  c={'white'}
                  h={'100%'}
                  justify={'center'}
                  style={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <h2 className="text-lg font-semibold">
                    'Mother project Hospice'
                  </h2>
                  <h1 className="pb-12 text-3xl font-semibold">
                    "Mother" Hospice and Palliative Care Center
                  </h1>
                  <Button className="h-[44px] w-[144px] rounded-none bg-primary">
                    Хандив өгөх
                  </Button>
                </Flex>
              </BackgroundImage>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5, lg: 4 }}>
            <Paper
              withBorder
              shadow="md"
              radius={'lg'}
              h={{ base: 300, md: 640, lg: 600 }}
            >
              <div>hi</div>
            </Paper>
          </Grid.Col>
        </Grid>

        <Tabs value={activeTab} onChange={handleActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="project">Project</Tabs.Tab>
            <Tabs.Tab value="grant-project">Grant Project</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        {/* <div className="-translate-y-10">
          <EventSlider
            events={events?.items as unknown as Event[]}
            isEventLoading={isEventLoading}
          />
        </div>
        <div className="-translate-y-10">
          <FundSlider
            projects={projects?.items as unknown as Project[]}
            isFundLoading={isFundLoading}
          />
        </div> */}
      </Container>
    </BasicBaseLayout>
  );
}

// export const getServerSideProps: GetServerSideProps = async context => {
//   const events = await api.event.getAll.useQuery();
//   const project = await api.project.getAll.useQuery();

//   return {
//     props: {
//       events: null,
//     },
//   };
// };
