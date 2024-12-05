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
import EarlyAdapters from "../components/layout/modals/EarlyAdapters"
import { useEffect, useState } from "react"

const Home = () => {
  const [isEarlyAdaptersPopupOpen, setIsEarlyAdaptersPopupOpen] = useState(false);
  const [oneTimePopup, setOneTimePopup] = useState(0);
  const handleCloseEarlyAdaptersPopup = () => {
    setIsEarlyAdaptersPopupOpen(false);
  }
  useEffect(() => {
    if (oneTimePopup === 0) {
      setTimeout(() => {
        setIsEarlyAdaptersPopupOpen(true);
      }, 1000);
      setOneTimePopup(oneTimePopup + 1);
    }
  }, [oneTimePopup]);
  return (
    <>
      <Banner image={BannerImg} text="Tenat" />
      <Hero />
      <WhoAreWe />
      <Features />
      <TopProducts />
      <OurSpecialty />
      <TopCategory />
      <OurPackages />
      <QASection />
      <Grantees />
      <EarlyAdapters isPopupOpen={isEarlyAdaptersPopupOpen} handleClosePopup={handleCloseEarlyAdaptersPopup} />
    </>
  )
}

export default Home