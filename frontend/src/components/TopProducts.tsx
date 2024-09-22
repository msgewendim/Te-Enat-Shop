import { useContext } from "react"
import { AppContext } from "../providers/interface/context"
import { Link } from "react-router-dom"

const TopProducts = () => {
  const { products } = useContext(AppContext)
  return (
    <div>
      <div style={{ backgroundColor: '#D2FCFF' }}
        className="min-h-[350px] sm:min-h-[500px] pb-10"
      >
        <div className="flex flex-col justify-center items-center mb-3 pt-8">
          <div className="flex flex-col justify-center items-center gap-2 mt-3">
            <h1 className="text-4xl font-bold text-primary capitalize">
              המוצרים שלנו
            </h1>
            <p dir="rtl" className="text-sm px-10 text-black text-right w-[60vw]">
              גלו את המוצרים המובילים שלנו שמשלבים בין איכות לטעם ייחודי. כל מוצר נבחר בקפידה כדי להעניק לכם חוויית בישול עשירה ומגוונת.
            </p>
          </div>
          <div className="justify-between items-center mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
            {
              products &&
              // <div className="flex items-center justify-center">
              //   <button className="" onClick={(e) => handleLoad(e)} name="start">
              //     <img src={leftArrow} alt="" width={36} />
              //   </button>
              // {
              products.slice(0, 3).map(({ _id, images, name, pricing }, index) => {
                return (
                  <Link to={`/products/${_id}/info`} key={index} className="flex flex-col gap-4 justify-between items-center">
                    <img src={images[0]} alt={name} className="object-cover w-[250px] h-[170px]" />
                    <div className="flex justify-between items-center bg-slate-100 w-[250px] p-4 rounded-b-xl shadow-lg">
                      <p className="text-sm text-gray-600">₪{pricing[0].price}</p>
                      <h2 className="text-l ml-2 text-primary capitalize font-semibold">
                        {name}
                      </h2>
                    </div>
                  </Link>
                )
              })
              // }
              // <button className="" onClick={(e) => handleLoad(e)} name="end">
              //   <img src={rightArrow} alt="" width={36} />
              // </button>
              // </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopProducts