import star from "/star.svg"
import { useState } from "react"
import PopupProduct from "./PopupProduct"
import { ProductCardProps } from "../client/types.gen";

const ProductCard = ({ _id, name, price, image, categories, rate, imageSize = 32, shortDescription } : ProductCardProps) => {
  const [openProductId, setOpenProductId] = useState("");

  const handleOpenPopup = (productId: string) => {
    setOpenProductId(productId);
  };

  const handleClosePopup = () => {
    setOpenProductId("");
  };
  return (
    <div className="w-[280px] h-[250px] bg-gray-100 flex flex-col rounded-xl justify-center items-start mx-auto relative" >
      <span className="bg-primary text-white max-w-max p-[4px] text-center absolute left-5 top-3 rounded-md text-sm">{categories[0]}</span>
      <div className="flex flex-col w-full">
        {/* image */}
        <div onClick={() => handleOpenPopup(_id)}>
          <img src={image} alt={name} className={`min-w-${imageSize} min-h-40 object-fit flex-1 cursor-pointer`} />
        </div>
        {/* PopUp */}
        {openProductId === _id && (
          <PopupProduct 
            _id={_id} 
            open={openProductId === _id}
            setOpen={handleClosePopup} 
            name={name} 
            shortDescription={shortDescription} 
            image={image} 
            price={price} 
          />
        )}
        <div className="flex justify-between items-center">
          <div onClick={() => handleOpenPopup(_id)} className="text-xl ml-2 text-primary capitalize font-semibold cursor-pointer">
            {name}
          </div>
          {/* price */}
          <p className="text-sm text-primary mr-2 font-medium">{price}$</p>
        </div>
        <hr className="bg-primary h-0.5" />
        {/* rate */}
        <span className="flex justify-end my-1">{
          Array.from({ length: rate }, (_, index) => (
            <img key={index} src={star} alt="star-icon" width={16} />
          ))
        }</span>
      </div>
    </div>
  )
}

export default ProductCard