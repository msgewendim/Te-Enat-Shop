import { useState } from "react"
import { useTranslation } from "react-i18next";

import BannerImg from "../assets/Image.svg"
import Features from "../components/home/Features"
import Grantees from "../components/home/Grantees"
import Hero from "../components/home/Hero"
import OurSpecialty from "../components/home/OurSpecialty"
import QASection from "../components/home/QAsection"
import TopCategory from "../components/home/TopCategory"
import WhoAreWe from "../components/home/WhoAreWe"
import EarlyAdaptersPopup, { EarlyAdaptersPopupButton } from "../components/layout/modals/EarlyAdapters"
import OurPackages from "../components/packages/OurPackages"
import TopProducts from "../components/products/TopProducts"
import Banner from "../components/ui/Banner"

const Home = () => {
  const { t } = useTranslation();

  const [isEarlyAdaptersPopupOpen, setIsEarlyAdaptersPopupOpen] = useState(false);
  const handleCloseEarlyAdaptersPopup = () => {
    setIsEarlyAdaptersPopupOpen(false);
  };

  return (
    <>
      <Banner image={BannerImg} text={t("tenat")} />
      <Hero />
      <WhoAreWe />
      <Features />
      <TopProducts />
      <OurSpecialty />
      <TopCategory />
      <EarlyAdaptersPopupButton isOpen={isEarlyAdaptersPopupOpen} setIsOpen={setIsEarlyAdaptersPopupOpen} />
      <EarlyAdaptersPopup isPopupOpen={isEarlyAdaptersPopupOpen} handleClosePopup={handleCloseEarlyAdaptersPopup} />
      <OurPackages />
      <QASection />
      <Grantees />
    </>
  )
}

export default Home