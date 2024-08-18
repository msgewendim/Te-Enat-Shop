import videoProduct from "/videoProduct.png";
import ProductPageBanner from "/ProductPageBanner.svg";
import RelatedProducts from "../components/RelatedProducts";
import { product } from "../utils/examples";
import { divideDescriptionInfo } from "../utils/helperFunctions";
import Banner from "../components/Banner";
import { veggie } from "../utils/data";

const SingleProduct = () => {
  const {description, name, relatedProducts } = product
  // half descriptions
  const [even_numbered_desc, odd_numbered_desc] = divideDescriptionInfo(description)
  return (
    <main className="flex flex-col">
      <Banner text={name} image={ProductPageBanner} />
      {/* Product details */}
      <div className="flex justify-center items-center">
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
            <div className="order-2 w-[400px] object-cover">
              {/* <h1 className="text-4xl text-primary font-bold capitalize text-center my-3">{name}</h1> */}
              <img src={veggie} alt={name} />
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
            <div className="bg-primary w-fit p-2 text-white rounded-lg cursor-pointer hover:bg-slate-800">
              Recipes
            </div>
            <div className="bg-secondary w-fit p-2 px-3 text-white rounded-lg cursor-pointer hover:bg-slate-600">
              Buy
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-3">
        <div className="mb-8">
          <img src={videoProduct} alt="" width={700} />
        </div>
        {/* Product related products */}
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
    </main>
  )
}

export default SingleProduct