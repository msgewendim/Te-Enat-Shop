import { useState } from "react"
import { useTranslation } from "react-i18next"
import Card from "./Card"
import { tavlinim, rollInjera, veggie } from "../utils/data"

// const ImageList = [
//   {
//     id: 1,
//     image: beyaynetu
//   },
//   {
//     id: 2,
//     image: enjera
//   },
//   {
//     id: 3,
//     image: menu2
//   },
//   {
//     id: 4,
//     image: menu
//   }
// ]

// const bgImage = {
//   backgroundImage: `url(${menu})`,
//   // backgroundColor: "#D2FCFF"
//   backgroundSize: 'cover',
//   backgroundPosition: "",
//   backgroundRepeat: 'no-repeat',
//   height: '100%',
//   width: '100%',
// }
const Hero = () => {
  const [imageId, setImageId] = useState(veggie)
  const { t } = useTranslation()
  return (
    <>
      <div style={{ backgroundColor: '#D2FCFF' }}
        className="min-h-[550px] sm:min-h-[600px] bg-gray-100 dark:bg-gray-950 duration-200 flex justify-center items-center"
      >
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text content section */}
            <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative">
              {/* <div className="absolute -top-[20px] left-[20px]"> */}
              <h1 className="text-5xl sm:text-4xl font-bold text-primary ml-4 mb-8">
                We Do Creative <br />Things For Success</h1>
              <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, molestias libero? Aut consequuntur deleniti consequatur neque dignissimos quae distinctio eos.</p>
              {/* </div> */}
              <div className="flex gap-4 m-4">
                <Card imageUrl={tavlinim} title={t("shop")} />
                <Card imageUrl={rollInjera} title={t("recipes")} />
              </div>
            </div>
            {/* Image section */}
            <div className="order-1 sm:order-2 min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative">
              {/* main image section */}
              <div className="">
                <img src={imageId} alt="" className="w-[300px] sm:w-[450px] mx-auto spin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero