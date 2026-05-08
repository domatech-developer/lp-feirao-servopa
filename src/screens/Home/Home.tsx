import "./Home.scss";
import MainDefault from "@/components/Main/Main";
import HeroSection from "./modules/HeroSection";
import HomeStickyBar from "./modules/HomeStickyBar";
import FooterSection from "@/screens/Home/modules/FooterSection";
import IntroSection from "@/screens/Home/modules/IntroSection";
import HighlightSection from "@/screens/Home/modules/HighlightSection";
import BrandsSection from "@/screens/Home/modules/BrandsSection";
import CampaignSection from "@/screens/Home/modules/CampaignSection";
import LegacySection from "@/screens/Home/modules/LegacySection";
import HistorySection from "@/screens/Home/modules/HistorySection";
import FaqSection from "@/screens/Home/modules/FaqSection";
const Home = () => {
  return (
    <MainDefault id="home">
      <HomeStickyBar />
      <HeroSection />
      <IntroSection />
      <HighlightSection />
      <BrandsSection />
      <CampaignSection />
      <LegacySection />
      <HistorySection />
      <FaqSection />
      <FooterSection />
    </MainDefault>
  );
};

export default Home;
