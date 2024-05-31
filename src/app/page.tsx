import dynamic from "next/dynamic";
import Landing from "@/components/landing";
import ServicesHomePage from "@/components/serviceHome"
import { serverDynamicFetch } from '@/lib/serverDynamicFetch'
import MarqueeContent from "@/components/MarqueeContent";
const NewsHomePage = dynamic(() => import('@/components/news'), { ssr: false });
const Announcment = dynamic(() => import('@/animation/marquee/Marquee'), { ssr: false });
const OurTeam = dynamic(() => import('@/components/ourTeam'), { ssr: false });
const Integration = dynamic(() => import('@/components/integration'), { ssr: false });
const Integration2 = dynamic(() => import('@/components/integration2'), { ssr: false });
const FooterUpper = dynamic(() => import('@/components/footerUpper'), { ssr: false });
import ContactHomePage from "@/components/contact"

import styles from "./page.module.scss"

export default async function Home() {
  const defaultPartners = await serverDynamicFetch('partner');
  const defaultPortfolio = await serverDynamicFetch('portfolio');

  return (
    <main className={styles.main}>
      <Landing />
      <ServicesHomePage />
      <NewsHomePage />
      <Announcment content={MarqueeContent(defaultPartners)} direction={"left"} title="Our Partners" />
      <Integration />
      <Announcment content={MarqueeContent(defaultPortfolio)} direction={"right"} title="Our Portfolio" />
      <OurTeam />
      <Integration2 />
      <ContactHomePage />
      <FooterUpper />
    </main>
  );
}
