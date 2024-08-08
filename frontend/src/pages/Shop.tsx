import ProductCard from "../components/ProductCard"
import ShopBanner from "/ShopBanner.svg"
import { cake, adamame, cookies } from "../utils/data"
import { Product } from "../../types/product.types"
import Banner from "../components/Banner"

const products: Array<Product> = [
  // Add your product objects here
  { id: "123", category: "dessert", image: cake, name: "cake", price: 15.0, rate: 4, description: "" },
  { id: "456", category: "bakery", image: adamame, name: "bread", price: 5.0, rate: 5, description: "" },
  { id: "789", category: "produce", image: cookies, name: "tomatoes", price: 2.5, rate: 3, description: "" },
  { id: "111", category: "produce", image: cookies, name: "tomatoes", price: 2.5, rate: 3, description: "" },
  { id: "3234", category: "produce", image: cookies, name: "tomatoes", price: 2.5, rate: 3, description: "" },
  { id: "112", category: "produce", image: cookies, name: "tomatoes", price: 2.5, rate: 3, description: "" },
  { id: "78139", category: "produce", image: cookies, name: "tomatoes", price: 2.5, rate: 3, description: "" },
  { id: "734589", category: "produce", image: cookies, name: "tomatoes", price: 2.5, rate: 3, description: "" },
  //... add more products as needed
  // Remember to add appropriate props to each product card component to display the product details correctly
]
const Shop = () => {
  const handleReloadMore = () => {
    // fetch product cards from backend using pagination
  }
  return (
    <main >
      <Banner image={ShopBanner} text="Shop" />

      <div className="max-w-[90vw] grid lg:gap-8 sm:grid-cols-2 sm:mx-10 lg:grid-cols-4 gap-4 mx-auto my-10 justify-center items-center ">
        {
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        }
      </div>
      <div className="bg-primary text-white p-2 w-fit rounded-lg text-center ml-[40vw] mb-4">
        <button onClick={handleReloadMore}>reload more</button>
      </div>
    </main>
  )
}

export default Shop