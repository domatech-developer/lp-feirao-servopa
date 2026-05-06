import "./Home.scss";
import MainDefault from "@/components/Main/Main";
import HeroSection from "./modules/HeroSection";
import IntroSection from "./modules/IntroSection";
import HighlightSection from "./modules/HighlightSection";
import BrandsSection from "./modules/BrandsSection";
import CampaignSection from "./modules/CampaignSection";
import LegacySection from "./modules/LegacySection";
import HistorySection from "./modules/HistorySection";
import FaqSection from "./modules/FaqSection";
import FooterSection from "./modules/FooterSection";
const Home = () => {
  return (
    <MainDefault id="home">
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
