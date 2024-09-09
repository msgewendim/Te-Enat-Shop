import { Link } from "react-router-dom"
import { topCategories } from "../utils/examples"
import { useContext } from "react"
import { AppContext } from "../providers/interface/context"

const TopCategory = () => {
  const { setCategory } = useContext(AppContext)
  return (
    <div style={{ backgroundColor: '#274C5B' }}
      className="min-h-[550px] sm:min-h-[500px] flex items-center flex-col justify-center"
    >
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center my-10 lg:my-14">
          <h2 className="text-2xl text-white font-bold md:text-4xl capitalize md:leading-tight dark:text-white">Our top categories</h2>
        </div>
        <div className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-8 md:gap-10">
          {
            topCategories.map(({ name, images }, index) => {
              return (
                <Link to={`/products?category=${name.toLowerCase()}`} onClick={() => setCategory(name)} key={index} className="text-center">
                  <img src={images ? images[0] : ""} alt={name} className="rounded-xl sm:size-48 lg:size-52 mx-auto" />
                  <div className="mt-2 sm:mt-4">
                    <h3 className="text-md font-medium text-white sm:text-base lg:text-lg dark:text-neutral-200 capitalize">{name}</h3>
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

export default TopCategory