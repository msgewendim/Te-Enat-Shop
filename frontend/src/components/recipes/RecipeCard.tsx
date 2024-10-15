import { Link } from "react-router-dom"
import { createRecipeCardImage } from "../../utils/helperFunctions"

const RecipeCard = ({ id, title, description, image, date, imageClassProps }: { id: string, title: string, description: string, image: string, date: Date, imageClassProps?: string[] }) => {
  const month = date.toLocaleString("default", { month: 'short' })
  return (
    <div style={createRecipeCardImage(image, imageClassProps ? imageClassProps[0] : "", imageClassProps ? imageClassProps[1] : "")} className="relative">
      {/* date */}
      <div className="bg-primary text-center text-white w-fit py-2 px-4 rounded-full m-3">
        <p>{date.getDay()}</p>
        <p>{month}</p>
      </div>
      {/* Info Card */}
      <div className="container absolute bottom-16 mb-16">
        <div className="bg-white w-[300px] h-[160px] rounded-lg absolute ">
          <div className="text-gray-600 text-center flex flex-col gap-2 justify-center items-start ml-5 mt-2 relative">
            {/* info recipe */}
            <h3 className="text-lg font-semibold text-primary text-center">{title}</h3>
            <p className="text-gray-400 max-w-[250px] text-start text-sm truncate  overflow-x-auto break-words">{description}</p>
            {/* read more button */}
            <Link to={`/recipes/${id}`} className="flex justify-center items-center gap-1 w-fit bg-gradient-to-r from-primary to-secondary text-white text-center p-2 mt-5 rounded-lg">
              <button className="text-sm">read more</button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mt-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard