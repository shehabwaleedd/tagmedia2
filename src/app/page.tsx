import Landing from "@/components/landing";
import ServicesHomePage from "@/components/serviceHome";
import NewsHomePage from "@/components/news";
import Integration from "@/components/integration"
import Integration2 from "@/components/integration2"
import OurTeam from "@/components/ourTeam";
import ContactHomePage from "@/components/contact"
import FooterUpper from "@/components/footerUpper"
import Announcment from "@/animation/marquee/Marquee";
import MarqueeContent from "@/components/MarqueeContent";
import { serverDynamicFetch } from '@/lib/serverDynamicFetch'

export default async function Home() {
  const defaultPartners = await serverDynamicFetch('partner');
  const defaultPortfolio = await serverDynamicFetch('portfolio');

  return (
    <main>
      <Landing />
      <ServicesHomePage />
      <NewsHomePage />
      <Announcment content={MarqueeContent(defaultPortfolio)} direction={"right"} title="Our Portfolio" />
      <Announcment content={MarqueeContent(defaultPartners)} direction={"left"} title="Our Partners" />
      <Integration />
      <OurTeam />
      <Integration2 />
      <ContactHomePage />
      <FooterUpper />
    </main>
  );
}
