import { Link } from "react-router-dom"
import { Product, Recipe } from "../client"

const TopRecipes = ({ title, text, products, recipes }: { title: string, text: string, recipes?: Array<Recipe>, products?: Array<Product> }) => {

  return (
    <div style={{ backgroundColor: '#D2FCFF' }}
    dir="rtl"
      className="min-h-[350px] sm:min-h-[500px]"
    >
      <div className="flex flex-col justify-center items-center mb-3 pt-8">
        <div className="flex flex-col justify-center items-center gap-2 mt-3">
          <h1 className="text-4xl font-bold text-primary capitalize">{title}</h1>
          <p className="text-sm text-black text-center w-[60vw]">
            {text}
          </p>
        </div>

        <div className="flex justify-between items-center gap-8 mt-16 ">
          {
            products &&
            products.map(({ _id, images, name, price }, index) => {
              return (
                <Link to={`/products/${_id}`} key={index} className="flex flex-col gap-4 justify-between items-center">
                  <img src={images[0]} alt={name} className="object-cover w-[250px] h-[170px]" />
                  <div className="flex justify-between items-center bg-slate-100 w-[250px] p-4 rounded-b-xl shadow-lg">
                    <h2 className="text-l ml-2 text-primary capitalize font-semibold">
                      {name}
                    </h2>
                    <p className="text-sm text-gray-600">Price: ${price}</p>
                  </div>
                </Link>
              )
            })
          }
          {
            recipes &&
            recipes.map(({ _id, image, title, prepTime }, index) => {
              return (
                <Link to={`/products/${_id}`} key={index} className="flex flex-col gap-4 justify-between items-center">
                  <img src={image} alt={title} className="object-cover w-[250px] h-[170px]" />
                  <div className="flex justify-between items-center bg-slate-100 w-[250px] p-4 rounded-b-xl shadow-lg">
                    <h2 className="text-l ml-2 text-primary capitalize font-semibold">
                      {title}
                    </h2>
                    <p className="text-sm text-gray-600">time: {prepTime}</p>
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