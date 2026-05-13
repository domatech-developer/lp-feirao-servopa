"use client";

import "./Home.scss";
import MainDefault from "@/components/Main/Main";
import { FeiraoCountdownProvider } from "./FeiraoCountdownContext";
import { HomeFormModalProvider } from "./HomeFormModalContext";
import FeiraoFormModal from "./modules/FeiraoFormModal";
import HeroSection from "./modules/HeroSection";
import HomeStickyBar from "./modules/HomeStickyBar";
import HomeMobileFloatingHeader from "./modules/HomeMobileFloatingHeader";
import FooterSection from "@/screens/Home/modules/FooterSection";
import IntroHighlightBridge from "@/screens/Home/modules/IntroHighlightBridge";
import BrandsSection from "@/screens/Home/modules/BrandsSection";
import CampaignSection from "@/screens/Home/modules/CampaignSection";
import LegacySection from "@/screens/Home/modules/LegacySection";
import HistorySection from "@/screens/Home/modules/HistorySection";
import FaqSection from "@/screens/Home/modules/FaqSection";
const Home = () => {
  return (
    <FeiraoCountdownProvider>
      <HomeFormModalProvider>
        <MainDefault id="home">
          <HomeMobileFloatingHeader />
          <HomeStickyBar />
          <HeroSection />
          <IntroHighlightBridge />
          <BrandsSection />
          <CampaignSection />
          <LegacySection />
          <HistorySection />
          <FaqSection />
          <FooterSection />
        </MainDefault>
        <FeiraoFormModal />
      </HomeFormModalProvider>
    </FeiraoCountdownProvider>
  );
};

export default Home;
