import { CgBowl } from "react-icons/cg"
import { GiFlour, GiGrainBundle } from "react-icons/gi"
import { PiGrains } from "react-icons/pi"

const SpecialOffers = () => {
  return (
    <div className="min-h-[450px] flex flex-col justify-center items-center" dir="rtl">
      <h2 className="text-right text-4xl font-bold text-primary dark:text-white">
        מארזים וחבילות
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mx-20 my-10">
        <div className="h-[200px] text-center max-w-sm p-2 flex flex-col justify-start items-center relative">
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
      
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 mb-5">
            גלו את הטעמים של העולם עם אוסף התבלינים האקזוטיים שלנו.
          </p>
          {/* </div> */}
          <GiGrainBundle size={48}  className="absolute bottom-2"/>
        </div>
        <div className="h-[200px] text-center max-w-sm p-2 flex flex-col justify-start items-center relative">

          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            קטניות אורגניות
          </h5>
          <p className="font-normal text-gray-700 w-[250px] dark:text-gray-400 mb-5">
            תהנו מהטוב של הטבע הגדל בשדות מופחתי ריסוסי הדברה מזיקים.
          </p>
          <GiFlour size={48} className="absolute bottom-2" />
        </div>
        <div className="h-[200px] text-center max-w-sm p-2 flex flex-col justify-start items-center relative">

          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            תערובות גורמה            </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 mb-5">
            הרימו את היצירות הקולינריות שלכם עם תערובות התבלינים האיכותיות והבלעדיות שלנו.
          </p>
          <CgBowl size={48} className="absolute bottom-2" />
        </div>
        <div className="h-[200px] text-center max-w-sm p-2 flex flex-col justify-start items-center relative">
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            יתרונות בריאותיים
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 mb-5">
            שפרו את אורח החיים שלכם עם מבחר התבלינים והתערובות שנבחרו בקפידה עבורכם
          </p>
          <PiGrains size={48}  className="absolute bottom-2"/>
        </div>
      </div>
    </div>
  )
}

export default SpecialOffers