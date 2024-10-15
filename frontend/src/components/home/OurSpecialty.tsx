import { CgBowl } from "react-icons/cg"
import { GiFlour, GiGrainBundle } from "react-icons/gi"
import { PiGrains } from "react-icons/pi"
import { Link } from "react-router-dom"
import { topRecipes } from "../../utils/examples"

const OurSpecialty = () => {
  return (
    <div className="bg-[#D2FCFF] min-h-[450px] flex flex-col justify-center items-center pt-12" dir="rtl">
      <h2 className="text-right text-4xl font-bold text-primary dark:text-white mb-12">
        המיוחדות שלנו אלו היצירות שלכם
      </h2>
      <div className="justify-between items-center grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
        {
          topRecipes &&
          topRecipes.map(({ _id, image, title }, index) => {
            return (
              <Link to={`/recipes/${_id}`} key={index} className="group hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-xl p-5 transition dark:hover:bg-white/10 dark:focus:bg-white/10">
                <div className="aspect-w-16 aspect-h-10">
                  <img src={image} alt={title} className="w-[300px] object-cover rounded-xl" />
                </div>
                <div className="flex justify-between items-end">
                  <h2 className="mt-5 text-end text-xl dark:text-neutral-300 dark:hover:text-white text-primary capitalize font-semibold">
                    עוגיות טף
                  </h2>
                  <p className="text-md text-gray-600 mt-3 inline-flex items-center gap-x-1 font-semibold dark:text-neutral-200">
                    קרא עוד
                  </p>
                </div>
              </Link>
            )
          })
        }
      </div>
      {/* <hr className="w-[90%] border border-primary" /> */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mx-20 my-10">
        <div className="h-[200px] text-center max-w-sm p-2 flex flex-col justify-start items-center relative">
          <GiGrainBundle size={48} className="mb-2" />
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            תבלינים אקזוטיים
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 mb-5">
            גלו את הטעמים של העולם עם אוסף התבלינים האקזוטיים שלנו.
          </p>
          {/* </div> */}
        </div>
        <div className="h-[200px] text-center max-w-sm p-2 flex flex-col justify-start items-center relative">

          <GiFlour size={48} className="mb-2" />
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            קטניות אורגניות
          </h5>
          <p className="font-normal text-gray-700 w-[250px] dark:text-gray-400 mb-5">
            תהנו מהטוב של הטבע הגדל בשדות מופחתי ריסוסי הדברה מזיקים.
          </p>
        </div>
        <div className="h-[200px] text-center max-w-sm p-2 flex flex-col justify-start items-center relative">
          <CgBowl size={48} className="mb-2" />
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            תערובות גורמה            </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 mb-5">
            הרימו את היצירות הקולינריות שלכם עם תערובות התבלינים האיכותיות והבלעדיות שלנו.
          </p>
        </div>
        <div className="h-[200px] text-center max-w-sm p-2 flex flex-col justify-start items-center relative">
          <PiGrains size={48} className="mb-2" />
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            יתרונות בריאותיים
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 mb-5">
            שפרו את אורח החיים שלכם עם מבחר התבלינים והתערובות שנבחרו בקפידה עבורכם
          </p>
        </div>
      </div>
    </div>
  )
}

export default OurSpecialty