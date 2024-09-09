import Banner from "../components/Banner"
import Hero from "../components/Hero"
import Testimonials from "../components/Testimonials"
import BannerImg from "../assets/Image.svg"
import TopRecipes from "../components/TopRecipes"
import TopCategory from "../components/TopCategory"
import { useContext } from "react"
import { AppContext } from "../providers/interface/context"
import { topRecipes } from "../utils/examples"

const Home = () => {
  const { products } = useContext(AppContext)
  return (
    <>
      <Banner image={BannerImg} text="Te-Enat" />
      <Hero />
      <Testimonials />
      <TopRecipes
      text=""
      products={products}
      title="המוצרים שלנו" />
      <TopCategory />
      <TopRecipes text="" title="המתכונים שלנו" recipes={topRecipes} />
    </>
  )
}

export default Home