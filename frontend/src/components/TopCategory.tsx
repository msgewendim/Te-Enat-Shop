import { Link } from "react-router-dom"
import { topCategories } from "../utils/examples"

const TopCategory = () => {
  return (
    <div style={{ backgroundColor: '#274C5B' }}
      className="min-h-[350px] sm:min-h-[400px] flex items-center flex-col justify-center"
    >
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-white text-3xl font-bold capitalize text-center">out top categories</h1>
        <div className="grid grid-cols-4 gap-2">
          {
            topCategories.map(({ name, images }, index) => {
              return (
                <Link to={`/products?cat=${name.toLowerCase()}`} key={index} className="object-cover w-[200px] h-[150px] flex flex-col items-center justify-center ">
                  <img src={images ? images[0] : ""} alt={name} className="rounded-2xl" />
                  <h3 className="text-md text-white font-semibold capitalize">{name}</h3>
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