import { awaze, beyaynetu, cookies, rollInjera, shiro, tavlinim } from "../utils/data"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
const homePageImages = [
  beyaynetu,shiro, awaze, cookies
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
      <div style={{ backgroundColor: "#ffdf40" }}
        className="min-h-[80vh] sm:min-h-[60vh] bg-gray-100 dark:bg-gray-950 duration-200 flex justify-start items-start"
      >
        {/* <div className=""> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 mb-6">
          {/* Image section */}
          <div className="sm:order-1 order-2 min-h-[650px] sm:min-h-[450px] flex justify-center items-center relative">
            {/* main image section */}
            <div className="relative">
              <img src={imageId} alt="" className="ease-in-out duration-150 w-[800px] sm:w-[550px] mx-auto" />
            </div>
          </div>
          {/* text content section */}
          <div className="flex flex-col mt-14 mr-6 items-end gap-4 pt-2 sm:pt-0 text-right order-1 sm:order-1 relative">
            <h1 dir="rtl" className="lg:text-4xl text-right text-3xl font-bold text-primary ml-4">
              חדשנות ויצירתיות במטבח                <br />
              <span className="indent">
                מוצרים ומתכונים מלאי תרבות
              </span>
            </h1>
            <p dir="rtl" className="text-sm text-emerald-950 mb-2">
              אנחנו מביאים לכם את השילוב המושלם בין מסורת לטעמים חדשניים. כל מוצר ומתכון שלנו משלב יצירתיות וחדשנות, ומוסיף נגיעה חדשה למטבח שלכם.
            </p>
            {/* CARDS */}
            <div className="flex gap-4">
              <Link to="/recipes" className="cursor-pointer" >
                <img className="object-cover rounded-t-lg h-32 w-40" src={rollInjera} />
                <p className="text-white text-xl font-semibold text-center bg-emerald-700 rounded-b-md hover:text-gray-300">
                  מתכונים
                </p>
              </Link>
              <Link to="/products" className="cursor-pointer" >
                <img className="object-cover rounded-t-lg h-32 w-40" src={tavlinim} />
                <p className="text-white text-xl font-semibold text-center bg-emerald-700 rounded-b-md hover:text-gray-300">
                  חנות
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero