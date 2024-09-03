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
      text="הבחירה המושלמת לאורח חיים בריא ומודע לסביבה. עם חלבון, ויטמינים ומינרלים חיוניים, תנו לאהובים שלכם ליהנות ממזון נקי מהדברה, מזין וטעים תוך שמירה על כדור הארץ. בחנות שלנו יש מבחר של קטניות אורגניות שנארזו באהבה ובאריזות אקולוגיות. האוכל מגיע לקיבה שלנו והסובבים אותנו, הצטרפו אלינו להפצת המודעות למטבח בריא, נקי מהדברה ומלא השראה,  קטניות אורגניות, הבחירה הטבעית שלך!" products={products} 
      title="המחלקה האורגנית שלנו" />
      <TopCategory />
      <TopRecipes text="" title="המתכונים שלנו" recipes={topRecipes} />
    </>
  )
}

export default Home