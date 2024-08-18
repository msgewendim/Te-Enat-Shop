import Banner from "../components/Banner"
import Hero from "../components/Hero"
import Testimonials from "../components/Testimonials"
import BannerImg from "../assets/Image.svg"
import TopRecipes from "../components/TopRecipes"
import TopCategory from "../components/TopCategory"

const Home = () => {
  return (
    <>
      <Banner image={BannerImg} text="Te-Enat" />
      <Hero />
      <Testimonials />
      <TopRecipes />
      <TopCategory />
      <TopRecipes />
    </>
  )
}

export default Home