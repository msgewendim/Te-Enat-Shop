import { PiCookingPot } from "react-icons/pi"
import { TfiTimer } from "react-icons/tfi"
import { BsPeople } from "react-icons/bs"
import recipeBanner from "/RecipeBanner.svg"
import { createRecipeCardImage } from "../utils/helperFunctions"
import { recipe } from "../utils/examples"
import Banner from "../components/ui/Banner"
import { PackageInfo } from "../components/products/ProductPackages"
import RelatedRecipes from "../components/recipes/RelatedRecipes"

const RecipePage = () => {
  const { title, prepTime, description, difficulty, image, ingredients, instructions, relatedRecipes } = recipe

  return (
    <>
      < Banner image={recipeBanner} text={"עוגיות טף"} />
      {/* Recipe Details */}
      < div className="mt-12" >
        {/* Recipe Image */}{/* Prep Time */} {/* Difficulty */}{/* Categories */} {/* display on the image */}
        <div className="grid grid-cols-3 justify-center">
          <div style={createRecipeCardImage(image, "60svw", "80svh")} className="col-span-2">
          </div>
          <div className="flex flex-col text-center items-start " dir="rtl">
            <div className="dark:text-white text-sm text-right max-w-[500px] ml-5" >
              <h1 className="text-3xl font-bold text-primary dark:text-white">{title}</h1>
              <p>{description}</p>
            </div >
            <div className="flex-1 flex-col justify-center items-center">
              <h2 className="text-xl font-bold text-primary text-center mb-3">מצרכים</h2>
              <ul className="bg-gray-200 py-4">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <input id="ingredients-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="ingredients-list" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                    {/* <li typeof="checkbox" key={index} className="flex ml-6 my-4 text-sm gap-1"> */}
                    <p className="font-semibold">{ingredient.quantity}</p>
                    <p className="text-sm">{ingredient.name}</p>
                    {/* </li> */}
                  </div>
                ))}
              </ul>
            </div>
            {/* <div className="">
              <span className="flex flex-col mr-2 ">{
                categories?.map((cat) => <p className="bg-primary p-2 gap-1 mt-2 w-fit rounded-lg text-white">{cat}</p>)
              }</span>
            </div> */}
          </div>
        </div>
        {/* Recipe Description */}
        <div className="flex gap-6 justify-between items-center max-h-[400px]">
          {/* Ingredients */}
          <div className="mt-6 flex items-center gap-8 text-xs">
            <PackageInfo icon={TfiTimer} label="זמן הכנה" title={prepTime} />
            <PackageInfo icon={PiCookingPot} label="קושי " title={difficulty} />
            <PackageInfo icon={BsPeople} label="כמות סועדים" title={23} />
          </div>
          {/* Instructions */}
          <div className="flex flex-col justify-center items-center my-3">
            <h2 className="text-xl font-bold text-primary text-center mb-3">Instructions</h2>
            <ol className="py-4">
              {instructions.map((instruction, index) => (
                <div key={index}>
                  <li className="text-sm list-disc ml-3">{instruction}</li>
                  <hr className="w-full h-[2px] my-8 bg-gray-600 last:h-0" />
                </div>
              ))}
            </ol>
          </div>
        </div>

        {/* Related Recipes */}
        <RelatedRecipes relatedRecipes={relatedRecipes} />
      </div >
    </>
  )
}

export default RecipePage