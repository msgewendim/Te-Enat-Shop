import videoProduct from "/videoProduct.png";
import ProductPageBanner from "/ProductPageBanner.svg";
import { divideDescriptionInfo } from "../utils/helperFunctions";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/ui/Loader";
import { useGetProductById } from "../hooks/useProductsData";
import { toast } from "react-toastify";
import Banner from "../components/ui/Banner";
import PopupProduct from "../components/products/PopupProduct";
import RelatedProducts from "../components/products/RelatedProducts";

const SingleProduct = () => {
  const { productID } = useParams()
  const { data, isError, isLoading, error } = useGetProductById(productID || "")
  const [openProductId, setOpenProductId] = useState("");

  const handleClosePopup = () => {
    setOpenProductId("");
  };

  if (isLoading || !data) {
    return <Loader />
  }
  if (isError) {
    toast.error(error.message);
  }
  const { features, name, images, categories } = data
  // half descriptions
  const [even_numbered_desc, odd_numbered_desc] = divideDescriptionInfo(features ? features : [])
  console.log(features, "description features");
  return (
    <main className="flex flex-col">
      <Banner text={name} image={ProductPageBanner} />
      {/* Product details */}
      <div className="flex justify-center items-center mt-4">
        {/* text of product */}
        < div className="relative">
          {/* nutrition */}
          <div className="flex items-center justify-center my-8">
            <div className="w-[300px] flex flex-col gap-12 pl-5 mr-5 text-end order-1">
              {
                even_numbered_desc.map((desc, index) => {
                  return (
                    <div className="ml-4 text-center" key={index} dir="rtl">
                      <h3 className="text-2xl text-primary font-semibold"  >{desc[0]}</h3>
                      <p className="text-md" >{desc[1]}</p>
                    </div>)
                })
              }
            </div>
            {/* Product Image */}
            <div className="order-2 w-[680px] object-cover">
              {/* <h1 className="text-4xl text-primary font-bold capitalize text-center my-3">{name}</h1> */}
              <img src={images[0]} alt={name} />
            </div>
            <div className="w-[300px] flex flex-col gap-12 ml-5 justify-end items-end order-3">
              {
                odd_numbered_desc.map((desc, index) => {
                  return (
                    <div className="relative text-center" key={index} dir="rtl">
                      <h3 className="text-2xl text-primary font-semibold" >{desc[0]}</h3>
                      <p className="text-md" >{desc[1]}</p>
                    </div>)
                })
              }
            </div>
          </div>
          {/* Buttons  */}
          <div className="flex justify-center items-center gap-10 my-3 mb-16">
            <button className="bg-white w-fit p-2 text-primary rounded-lg cursor-pointer border-2 border-gray-700">
              מתכונים
            </button>
            {openProductId === productID && data && (
              <PopupProduct
                product={data}
                open={openProductId === productID}
                setOpen={handleClosePopup}
              />
            )}
            <button onClick={() => setOpenProductId(productID as string)} className="bg-primary_btn w-fit p-2 px-3 text-white rounded-lg cursor-pointer hover:bg-hoverBtnColor2">
              קנה
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-14">
        <div className="mb-8">
          <img src={videoProduct} alt="" width={700} />
        </div>
        {/* Product related products */}
        <RelatedProducts productCategory={categories[0]} />
      </div>
    </main >
  )
}

export default SingleProduct