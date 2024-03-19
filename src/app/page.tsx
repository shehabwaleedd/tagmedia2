import Landing from "@/components/landing";
import ServicesHomePage from "@/components/serviceHome";
import NewsHomePage from "@/components/news";
import Partners from "@/components/ourPartners";
import Integration from "@/components/integration"
import Integration2 from "@/components/integration2"
import OurTeam from "@/components/ourTeam";
import ContactHomePage from "@/components/contact"
import FooterUpper from "@/components/footerUpper"

export default function Home() {
  return (
    <main>
      <Landing />
      <ServicesHomePage />
      <NewsHomePage />
      <Partners />
      <Integration />
      <OurTeam />
      <Integration2 />
      <ContactHomePage />
      <FooterUpper />
    </main>
  );
}
