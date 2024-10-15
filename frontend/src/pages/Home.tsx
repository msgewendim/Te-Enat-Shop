import Banner from "../components/ui/Banner"
import Hero from "../components/home/Hero"
import WhoAreWe from "../components/home/WhoAreWe"
import BannerImg from "../assets/Image.svg"
import TopCategory from "../components/home/TopCategory"
import Grantees from "../components/home/Grantees"
import OurSpecialty from "../components/home/OurSpecialty"
import ProductPackages from "../components/products/ProductPackages"
import TopProducts from "../components/products/TopProducts"

const Home = () => {
  return (
    <>
      <Banner image={BannerImg} text="Tenat" />
      <Hero />
      <WhoAreWe />
      <Grantees />
      <TopProducts />
      <OurSpecialty />
      <TopCategory />
      <ProductPackages />
    </>
  )
}

export default Home