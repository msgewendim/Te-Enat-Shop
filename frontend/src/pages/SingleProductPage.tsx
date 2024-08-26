import videoProduct from "/videoProduct.png";
import ProductPageBanner from "/ProductPageBanner.svg";
import RelatedProducts from "../components/RelatedProducts";
import { divideDescriptionInfo } from "../utils/helperFunctions";
import Banner from "../components/Banner";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../providers/interface/context";
import { useParams } from "react-router-dom";
import { Product } from "../client";
import PopupProduct from "../components/PopupProduct";

const SingleProduct = () => {
  const { getProductById } = useContext(AppContext)
  const [product, setProduct] = useState<Product>()
  const [openProductId, setOpenProductId] = useState("");
  const handleOpenPopup = (productId: string) => {
    setOpenProductId(productId);
  };

  const handleClosePopup = () => {
    setOpenProductId("");
  };
  const { productID } = useParams()
  const getProduct = async () => {
    const product = await getProductById(productID as string)
    setProduct(product as Product)
  }
  useEffect(() => {
    getProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productID])
  if (!product) return <h1>Product not found</h1>;
  const { features, name, images, categories } = product
  // half descriptions
  const [even_numbered_desc, odd_numbered_desc] = divideDescriptionInfo(features)
  return (
    <main className="flex flex-col">
      <Banner text={name} image={ProductPageBanner} />
      {/* Product details */}
      <div className="flex justify-center items-center mt-4">
        {/* text of product */}
        <div className="relative">
          {/* nutrition */}
          <div className="flex items-center justify-center my-8">
            <div className="w-[300px] flex flex-col gap-12 pl-5 mr-5 text-end order-1">
              {
                even_numbered_desc.map((desc, index) => {
                  return (
                    <div className="ml-4" key={index}>
                      <h3 className="text-lg text-primary font-semibold" >{desc[0]}</h3>
                      <p className="text-xs text-start " >{desc[1]}</p>
                    </div>)
                })
              }
            </div>
            {/* Product Image */}
            <div className="order-2 w-[500px] object-cover">
              {/* <h1 className="text-4xl text-primary font-bold capitalize text-center my-3">{name}</h1> */}
              <img src={images[0]} alt={name} />
            </div>
            <div className="w-[300px] flex flex-col gap-12 ml-5 justify-end items-end order-3">
              {
                odd_numbered_desc.map((desc, index) => {
                  return (<div className="relative" key={index}>
                    <h3 className="text-lg text-primary font-semibold" >{desc[0]}</h3>
                    <p className="text-xs text-start" >{desc[1]}</p>
                  </div>)
                })
              }
            </div>
          </div>
          {/* Buttons  */}
          <div className="flex justify-center items-center gap-10 my-3 mb-16">
            <button className="bg-primary w-fit p-2 text-white rounded-lg cursor-pointer hover:bg-slate-800">
              Recipes
            </button>
            {openProductId === productID && (
              <PopupProduct
                product={product}
                open={openProductId === productID}
                setOpen={handleClosePopup}
              />
            )}
            <button onClick={() => handleOpenPopup(productID as string)} className="bg-secondary w-fit p-2 px-3 text-white rounded-lg cursor-pointer hover:bg-slate-600">
              Buy
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-14">
        <div className="mb-8">
          <img src={videoProduct} alt="" width={700} />
        </div>
        {/* Product related products */}
        <RelatedProducts category={categories[0]} />
      </div>
    </main>
  )
}

export default SingleProduct