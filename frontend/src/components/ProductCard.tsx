import { Link } from "react-router-dom"
import star from "/star.svg"
{/* Each card should have a product image, name, price, and a "Add to Cart" button */ }

const ProductCard = ({ id, name, price, image, category, rate, imageSize }: { id?: string, name: string, price: number, image: string, category: string, imageSize?: number, rate: number }) => {

  return (
    <div className="w-[250px] h-[250px] bg-gray-100 flex flex-col rounded-xl justify-center items-center relative" >
      <span className="bg-primary text-white max-w-max p-[4px] text-center absolute left-5 top-3 rounded-md text-sm">{category}</span>
      <div className="flex flex-col">
        {/* image */}
        <Link to={`/products/${id}`}>
          <img src={image} alt={name} className={`min-w-${imageSize ? imageSize : 32} min-h-40 object-fit flex-1`} />
        </Link>
        {/* name */}
        <Link to={`/products/${id}`} className="text-xl ml-2 text-primary capitalize font-semibold">{name}</Link>
        <hr className="text-black " />
        {/* price & rate*/}
        <div className="flex justify-between mx-2">
          <p className="text-sm text-primary ml-2">{price}$</p>
          {/* rate */}
          <span className="flex">{
            Array.from({ length: rate }, (_, index) => (
              <img key={index} src={star} alt="star-icon" width={16} />
            ))
          }</span>
        </div>
      </div>
      {/* Add product purchase button */}
      {/* Add product wishlist button */}
      {/* Add product compare button */}
      {/* Add product social media share buttons */}
      {/* Add product related images */}
      {/* Add product reviews */}
    </div>
  )
}

export default ProductCard