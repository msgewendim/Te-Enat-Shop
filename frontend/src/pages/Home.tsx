import Banner from "../components/Banner"
import Hero from "../components/Hero"
import Testimonials from "../components/Testimonials"
import BannerImg from "../assets/Image.svg"

const Home = () => {
  return (
    <>
      <Banner image={BannerImg} text="Te-Enat"/>
      <Hero />
      <Testimonials />
    </>
  )
}

export default Home