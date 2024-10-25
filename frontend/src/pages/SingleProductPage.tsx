import videoProduct from "/videoProduct.png";
import ProductPageBanner from "/ProductPageBanner.svg";
import { useParams } from "react-router-dom";
import Loader from "../components/ui/Loader";
import { useGetProductById } from "../hooks/useProductsData";
import { toast } from "react-toastify";
import Banner from "../components/ui/Banner";
import PopupProduct from "../components/products/PopupProduct";
import RelatedProducts from "../components/products/RelatedProducts";
import { Feature } from "../client";
import { divideFeatures } from "../utils/helperFunctions";
import { useState } from "react";

const SingleProduct = () => {
  const { productID } = useParams();
  const { data, isError, isLoading, error } = useGetProductById(productID || '');
  const [openProductId, setOpenProductId] = useState("");

  const handleClosePopup = () => {
    setOpenProductId("");
  };

  if (isError && error) {
    toast.error(error.message);
    return null;
  }
  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    toast.error("מוצר אינו זמין")
    return null;
  }

  const { name, image, categories, features } = data;

  // Assuming divideDescriptionInfo is defined elsewhere
  const { leftFeatures, rightFeatures } = divideFeatures(features.value);
  // console.log("features: ", leftFeatures, rightFeatures);
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
              {rightFeatures.map((val, i) => {
                return (
                  <FeatureElement key={i} feature={val} />
                );
              })}
            </div>
            {/* Product Image */}
            <div className="order-2 w-[680px] object-cover">
              {/* <h1 className="text-4xl text-primary font-bold capitalize text-center my-3">{name}</h1> */}
              <img src={image} alt={name} />
            </div>
            <div className="w-[300px] flex flex-col gap-12 ml-5 justify-end items-end order-3">
              {
                leftFeatures.map((feature, index) => {
                  return (
                    <FeatureElement key={index} feature={feature} />
                  );
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

const FeatureElement = ({ feature }: { feature: Feature }) => {
  return (
    <div className="relative text-center" dir="rtl">
      {feature.title &&
        <h3 className="text-2xl text-primary font-semibold" >{feature.title}</h3>}
      {feature.description && <p className="text-md" >{feature.description}</p>}
    </div>
  )
}
