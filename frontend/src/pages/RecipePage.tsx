import Banner from "../components/Banner"
import recipeBanner from "/RecipeBanner.svg"
import { createRecipeCardImage } from "../utils/helperFunctions"
import RelatedRecipes from "../components/RelatedRecipes"
import Reviews from "../components/Reviews"
import { recipe } from "../utils/examples"

const RecipePage = () => {
  const { title, prepTime, description, difficulty, categories, image, ingredients, instructions, relatedRecipes } = recipe

  return (
    <>
      < Banner image={recipeBanner} text={title} />
      {/* Recipe Details */}
      < div className="mt-12" >
        {/* Recipe Image */}{/* Prep Time */} {/* Difficulty */}{/* Categories */} {/* display on the image */}
        <div className="flex justify-center items-baseline">
          <div style={createRecipeCardImage(image, "60svw", "80svh")} className="flex flex-row justify-between items-start">
            <span className="bg-primary text-white p-2 rounded-lg ms-2 mt-2">{prepTime} minutes</span>
            <span className="bg-primary text-white p-2 rounded-lg ms-2 mt-2">{difficulty}</span>
            <span className="flex flex-col mr-2 ">{
              categories?.map((cat) => <p className="bg-primary p-2 gap-1 mt-2 w-fit rounded-lg text-white">{cat}</p>)
            }</span>
          </div>
        </div>
        {/* Recipe Description */}
        <div className="dark:text-white text-sm w-[500px] ml-5 my-8" >
          <p>{description}</p>
        </div >
        <div className="flex gap-6 justify-between items-center max-h-[400px]">
          {/* Ingredients */}
          <div className="flex-1 flex-col justify-center items-center">
            <h2 className="text-xl font-bold text-primary text-center mb-3">Ingredients</h2>
            <ul className="bg-gray-200 py-4">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex ml-6 my-4 text-sm gap-1">
                  <p className="font-semibold">{ingredient.quantity}</p>
                  <p className="text-sm">{ingredient.name}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* Instructions */}
          <div className="flex flex-col justify-center items-center my-3">
            <h2 className="text-xl font-bold text-primary text-center mb-3">Instructions</h2>
            <ol className="py-4">
              {instructions.map((instruction, index) => (
                <>
                  <li key={index} className="text-sm list-disc ml-3">{instruction}</li>
                  <hr className="w-full h-[2px] my-8 bg-gray-600 last:h-0" />
                </>
              ))}
            </ol>
          </div>
        </div>

        {/* Related Recipes */}
        <RelatedRecipes relatedRecipes={relatedRecipes} />
        {/* Reviews */}
        <Reviews />
      </div >
    </>
  )
}

export default RecipePage