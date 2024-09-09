import { Link } from "react-router-dom"
import { Product, Recipe } from "../client"

const TopRecipes = ({ title, text, products, recipes }: { title: string, text: string, recipes?: Array<Recipe>, products?: Array<Product> }) => {

  return (
    <div style={{ backgroundColor: '#D2FCFF' }}
      className="min-h-[350px] sm:min-h-[500px] pb-10"
    >
      <div className="flex flex-col justify-center items-center mb-3 pt-8">
        <div className="flex flex-col justify-center items-center gap-2 mt-3">
          <h1 className="text-4xl font-bold text-primary capitalize">{title}</h1>
          <p className="text-sm text-black text-center w-[60vw]">
            {text}
          </p>
        </div>

        <div className="justify-between items-center mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {
            recipes &&
            recipes.slice(0, 3).map(({ _id, image, title }, index) => {
              return (
                <Link to={`/recipes/${_id}`} key={index} className="group hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-xl p-5 transition dark:hover:bg-white/10 dark:focus:bg-white/10">
                  <div className="aspect-w-16 aspect-h-10">
                    <img src={image} alt={title} className="w-full object-cover rounded-xl" />
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-md text-gray-600 mt-3 inline-flex items-center gap-x-1 font-semibold dark:text-neutral-200">
                      קרא עוד
                      <svg className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </p>
                    <h2 className="mt-5 text-end text-xl dark:text-neutral-300 dark:hover:text-white text-primary capitalize font-semibold">
                      דורו וואט
                    </h2>
                  </div>
                </Link>
              )
            })
          }
          {
            products &&
            products.slice(0, 3).map(({ _id, images, name, price }, index) => {
              return (
                <Link to={`/products/${_id}/info`} key={index} className="flex flex-col gap-4 justify-between items-center">
                  <img src={images[0]} alt={name} className="object-cover w-[250px] h-[170px]" />
                  <div className="flex justify-between items-center bg-slate-100 w-[250px] p-4 rounded-b-xl shadow-lg">
                    <p className="text-sm text-gray-600">₪{price}</p>
                    <h2 className="text-l ml-2 text-primary capitalize font-semibold">
                      {name}
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