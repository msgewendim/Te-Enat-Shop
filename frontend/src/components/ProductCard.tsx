import { useState } from "react"
import PopupProduct from "./PopupProduct"
import { Product } from "../client/types.gen";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  const [openProductId, setOpenProductId] = useState("");
  const { images, name, categories, _id, pricing } = product
  const handleOpenPopup = (productId: string) => {
    setOpenProductId(productId);
  };

  const handleClosePopup = () => {
    setOpenProductId("");
  };
  return (
    <div className="group flex flex-col max-w-[280px] bg-white shadow-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <div className="max-h-44 h-40">
        {images && <img onClick={() => handleOpenPopup(_id)} src={images[0]} alt={name} className="w-fit flex-1 h-40 cursor-pointer" />}
      </div>
      {openProductId === _id && (
        <PopupProduct
          product={product}
          open={openProductId === _id}
          setOpen={handleClosePopup}
        />
      )}
      <div className="p-1">
        <div className="flex justify-between items-center ml-1">
          <p className="text-gray-500 dark:text-neutral-500">
            {pricing[0].price}₪
          </p>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
            {name}
          </h3>
        </div>
        <span className="block text-xs text-end font-semibold uppercase text-blue-800 dark:text-blue-500">
          {categories ? categories[0] : ""}
        </span>
      </div>
      <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
        <Link to={`/products/${_id}/info`} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium bg-white text-primary shadow-sm hover: focus:outline-none focus:bg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" >
          קרא עוד
        </Link>
        <button
          onClick={() => handleOpenPopup(_id)}
          className="w-full text-white py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium  bg-[#90b77d] shadow-sm hover:bg-[#42855b] focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" >
          הוסף לעגלה
        </button>
      </div>
    </div>
  )
}
export default ProductCard