// import Sign from '@/bazo/login-next';
// import BasicBaseLayout from '@/components/layout/basic-base-layout';

import PublicLayout from '@/components/layout/public-layout';
import EmailCta from '@/components/sections/home/email-cta';
import PartnersHome from '@/components/sections/home/partners-home';
import VolunteersMap from '@/components/sections/home/volunteers-map';
import MediaSection from '@/components/sections/home/media-section';
import Features from '@/components/sections/home/features';
import UsertypeExplain from '@/components/sections/home/usertype-explain';
import Banner from '@/components/sections/home/banner';

export default function Home() {
  return (
    <PublicLayout>
      <Banner />
      <UsertypeExplain />
      <Features />
      <MediaSection />
      <VolunteersMap />
      <PartnersHome />
      <EmailCta />
    </PublicLayout>
  );
}
