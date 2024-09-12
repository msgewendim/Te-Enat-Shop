import { Link } from "react-router-dom"
import { topRecipes } from "../utils/examples"

const TopRecipes = () => {
  return (
    <div style={{ backgroundColor: '#D2FCFF' }}
      className="min-h-[350px] sm:min-h-[500px] pb-10"
    >
      <div className="flex flex-col justify-center items-center mb-3 pt-8">
        <div className="flex flex-col justify-center items-center gap-2 mt-3">
          <h1 className="text-4xl font-bold text-primary capitalize">
            המתכונים שלנו
          </h1>
          <p className="text-sm text-black text-center w-[60vw]">
            טקסט על המתכונים
          </p>
        </div>
        <div className="justify-between items-center mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-6">
          {
            topRecipes &&
            topRecipes.slice(0, 3).map(({ _id, image, title }, index) => {
              return (
                <Link to={`/recipes/${_id}`} key={index} className="group hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-xl p-5 transition dark:hover:bg-white/10 dark:focus:bg-white/10">
                  <div className="aspect-w-16 aspect-h-10">
                    <img src={image} alt={title} className="w-full object-cover rounded-xl" />
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-md text-gray-600 mt-3 inline-flex items-center gap-x-1 font-semibold dark:text-neutral-200">
                      קרא עוד
                      <svg className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </p>
                    <h2 className="mt-5 text-end text-xl dark:text-neutral-300 dark:hover:text-white text-primary capitalize font-semibold">
                      דורו וואט
                    </h2>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default TopRecipes