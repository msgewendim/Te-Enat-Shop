import ProductCard from "../components/ProductCard";
import ProductPageBanner from "/ProductPageBanner.svg";
import nuts from "/nuts.svg";
import star from "/star.svg"

const SingleProduct = () => {
  const product = { id: "123", category: "dessert", image: nuts, name: "cake", price: 15.0, rate: 4, description: "" }
  return (
    <main>
      <div className="">
        <img src={ProductPageBanner} alt="product page banner" />
      </div>
      {/* Product details */}
      <div className="flex">
        <div className="">

        <ProductCard imageSize={200} {...product} />
        </div>

        {/* text of product */}
        <div className="">
          <h1>{product.name}</h1>
          <span className="flex">{
            Array.from({ length: product.rate }, (_, index) => (
              <img key={index} src={star} alt="star-icon" width={16} />
            ))
          }</span>
          <h1>{product.price}</h1>
          <h1>{product.description}</h1>
          <span>
            <p>Quantity : <span>{}</span></p>
            <button>Add to Cart</button>
          </span>
        </div>
      </div>



      {/* Product related products */}
      <div className="">
        <h1>Related Products</h1>
        <div className="grid grid-cols-4 gap-4">
          <ProductCard imageSize={64} {...product} />
          <ProductCard imageSize={64} {...product} />
          <ProductCard imageSize={64} {...product} />
          <ProductCard imageSize={64} {...product} />
        </div>
      </div>
    </main>
  )
}

export default SingleProduct