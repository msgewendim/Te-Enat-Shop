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


const Home = () => {
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
    </>
  )
}

export default Home