import { awaze, beyaynetu, cookies, rollInjera, shiro, tavlinim } from "../../utils/data"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
const homePageImages = [
  beyaynetu, shiro, awaze, cookies
]
const Hero = () => {
  let randomIndex = Math.floor(Math.random() * homePageImages.length)
  const [imageId, setImageId] = useState(homePageImages[randomIndex])
  useEffect(() => {
    setImageId(homePageImages[randomIndex])
  }, [randomIndex])

  setInterval(() => {
    setTimeout(() => {
      if (randomIndex >= homePageImages.length) {
        randomIndex = 0
      } else {
        randomIndex++
      }
    }, 5000);
  }, 5000);
  return (
    <>
      <div style={{ backgroundColor: "#d3f5d3" }}
        className="min-h-[80vh] sm:min-h-[60vh] bg-gray-100 dark:bg-gray-950 duration-200"
      >
        <div className="grid grid-cols-1 items-start sm:grid-cols-2">
          {/* Image section */}
          <div className="sm:order-1 order-2 w-fit sm:w-[600px] mx-auto sm:mt-14 mt-4 mb-6 sm:mb-0 flex justify-center items-center relative">
            {/* main image section */}
            <img src={imageId} alt="photo" className="ease-in-out duration-150 w-full object-contain" />
          </div>

          {/* text content section */}
          <div className="flex flex-col sm:mt-14 mt-4 mr-2 sm:mr-6 items-end gap-4 pt-2 sm:pt-0 text-right order-1 sm:order-1">
            {/* TEXT */}
            <HeroText />

            {/* CARDS */}
            <div className="flex gap-4 items-center justify-center">
              <HeroCard
                image={rollInjera}
                title="מתכונים"
                link="/recipes"
              />
              <HeroCard
                image={tavlinim}
                title="חנות"
                link="/products"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero

type HeroCardProps = {
  image: string,
  title: string,
  link: string,
}
const HeroCard = ({ image, title, link }: HeroCardProps) => {
  return (
    <Link to={link} className="cursor-pointer sm:w-[160px] w-[140px]" >
      <img className="object-cover rounded-t-lg h-32 w-full" src={image} />
      <p className="text-white text-xl font-semibold text-center bg-emerald-700 rounded-b-md hover:text-gray-300">
        {title}
      </p>
    </Link>
  )
}

const HeroText = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1 dir="rtl" className="lg:text-5xl text-right text-3xl font-bold text-primary ml-4">
        חווית הבישול שלכם
        <br />
        <span className="indent">
          עומדת להשתדרג
        </span>
      </h1>
      <p dir="rtl" className="font-normal text-emerald-950 mb-2 text-xl">
        הזמינו חומרי גלם איכותיים, למדו ובשלו אוכל מושלם עבור האהובים שלכם
      </p>
    </div>
  )
}