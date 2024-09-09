import { useState } from "react"
import PopupProduct from "./PopupProduct"
import { Product } from "../client/types.gen";
import { Link } from "react-router-dom";

const ProductCard = ({ product, imageSize = 32, }: { product: Product, imageSize?: number }) => {
  const [openProductId, setOpenProductId] = useState("");
  const { images, name, categories, _id, price } = product
  const handleOpenPopup = (productId: string) => {
    setOpenProductId(productId);
  };

  const handleClosePopup = () => {
    setOpenProductId("");
  };
  return (
    <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <div onClick={() => handleOpenPopup(_id)} className="flex flex-col justify-center items-center rounded-t-xl">
        {images && <img src={images[0]} alt={name} className={`min-w-${imageSize} rounded-t-xl min-h-40 flex-1 cursor-pointer`} />}
      </div>
      {openProductId === _id && (
        <PopupProduct
          product={product}
          open={openProductId === _id}
          setOpen={handleClosePopup}
        />
      )}
      <div className="p-1">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 dark:text-neutral-500">
            {price}₪
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
        <button 
          onClick={() => handleOpenPopup(_id)} 
          className="w-full text-white py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-primary shadow-sm hover:bg-[#246580] focus:outline-none focus:bg-[#186787] disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" >
          Buy
        </button>
        <Link to={`/products/${_id}/info`} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-slate-200 text-gray-800 shadow-sm hover:bg-slate-50 focus:outline-none focus:bg-slate-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" >
          Learn More
        </Link>
      </div>
    </div>
  )
}
export default ProductCard



// const ProductCard = ({ product, imageSize = 32, }: { product: Product, imageSize?: number }) => {
//   const [openProductId, setOpenProductId] = useState("");
//   const { images, name, categories, _id, price } = product
//   const handleOpenPopup = (productId: string) => {
//     setOpenProductId(productId);
//   };

//   const handleClosePopup = () => {
//     setOpenProductId("");
//   };
//   return (
//     <div className="w-[280px] h-[250px] bg-gray-100 flex flex-col rounded-xl justify-center items-start mx-auto relative" >
//       <div className="flex flex-col w-full">
//         {/* image */}
//         <div onClick={() => handleOpenPopup(_id)}>
//           {images && <img src={images[0]} alt={name} className={`min-w-${imageSize} min-h-40 object-fit flex-1 cursor-pointer`} />}
//         </div>
//         {/* PopUp */}
//         {openProductId === _id && (
//           <PopupProduct
//             product={product}
//             open={openProductId === _id}
//             setOpen={handleClosePopup}
//           />
//         )}
//         <div className="flex justify-between items-center">
//           <div onClick={() => handleOpenPopup(_id)} className="text-xl ml-2 text-primary capitalize font-semibold cursor-pointer">
//             {name}
//           </div>
//           {/* price */}
//           <p className="text-sm text-primary mr-2 font-medium">{price}₪</p>
//         </div>
//         <hr className="bg-primary h-0.5" />
//         <span className="text-primary max-w-max p-[4px] text-center text-sm">{categories[0]}</span>
//       </div>
//     </div>
//   )
// }