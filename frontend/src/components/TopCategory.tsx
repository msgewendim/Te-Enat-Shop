import { Link } from "react-router-dom"
import { topCategories } from "../utils/examples"

const TopCategory = () => {
  return (
    <div style={{ backgroundColor: '#274C5B' }}
      className="min-h-[550px] sm:min-h-[500px] flex items-center flex-col justify-center"
    >
      <div className="flex flex-col justify-center items-center gap-16">
        <h1 className="text-white text-4xl font-bold capitalize text-center">out top categories</h1>
        <div className="grid grid-cols-5 gap-8">
          {
            topCategories.map(({ name, images }, index) => {
              return (
                <Link to={`/products?cat=${name.toLowerCase()}`} key={index} className="w-[180px] h-[200px] flex flex-col items-center justify-center ">
                  <img src={images ? images[0] : ""} alt={name} className="rounded-xl h-[140px] object-cover mb-2"/>
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