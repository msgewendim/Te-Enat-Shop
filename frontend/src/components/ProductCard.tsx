import { Link } from "react-router-dom"
import star from "/star.svg"
interface ProductCardProps {
  _id?: string,
  name: string,
  price: number,
  image: string,
  categories: string[],
  rate: number,
  imageSize?: number,
}
const ProductCard = ({ _id, name, price, image, categories, rate, imageSize = 32 }: ProductCardProps) => {

  return (
    <div className="w-[250px] h-[250px] bg-gray-100 flex flex-col rounded-xl justify-center items-center relative" >
      <span className="bg-primary text-white max-w-max p-[4px] text-center absolute left-5 top-3 rounded-md text-sm">{categories[0]}</span>
      <div className="flex flex-col w-full">
        {/* image */}
        <Link to={`/products/${_id}`}>
          <img src={image} alt={name} className={`min-w-${imageSize} min-h-40 object-fit flex-1`} />
        </Link>
        {/* name */}
        <Link to={`/products/${_id}`} className="text-xl ml-2 text-primary capitalize font-semibold">{name}</Link>
        <hr className="bg-primary h-0.5" />
        {/* price & rate*/}
        <div className="flex justify-between items-center mx-3">
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