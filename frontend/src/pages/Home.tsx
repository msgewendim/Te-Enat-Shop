import Banner from "../components/ui/Banner"
import Hero from "../components/home/Hero"
import WhoAreWe from "../components/home/WhoAreWe"
import BannerImg from "../assets/Image.svg"
import TopCategory from "../components/home/TopCategory"
import Grantees from "../components/home/Grantees"
import OurSpecialty from "../components/home/OurSpecialty"
import TopProducts from "../components/products/TopProducts"
import QASection from "../components/home/QAsection"
import Features from "../components/home/Features"
import OurPackages from "../components/packages/OurPackages"
import EarlyAdaptersPopup, { EarlyAdaptersPopupButton } from "../components/layout/modals/EarlyAdapters"
import { useState } from "react"
import { useTranslation } from "react-i18next";

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