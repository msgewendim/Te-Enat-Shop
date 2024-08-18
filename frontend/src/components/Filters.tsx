import { ChangeEvent, useContext } from "react"
import { AppContext } from "../providers/ContextProvider"
import { Link, useNavigate } from "react-router-dom"

const Filters = () => {
  const { getProducts, setCategory, category, setFilter, filter } = useContext(AppContext)
  const navigate = useNavigate()
  const handleClearFilters = () => {
    setCategory("")
    setFilter("")
    navigate("/products")
    const form = document.getElementById("form") as HTMLFormElement
    form.reset()
    getProducts()
  }
  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name } = e.target
    if (name === "category") setCategory(e.target.value)
    else if (name === "search") setFilter(e.target.value)
  }
  const handleFiltering = () => {
    getProducts()
  }
  // fetch products After filtering
  // useEffect(() => {
  //   getProducts()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filter, category])

  return (
    <form id="form" className="w-[80vw] h-20 flex gap-5 justify-center items-center bg-slate-200 rounded-lg px-2">
      {/* <div className="flex gap-2 justify-center items-center">
        <label htmlFor="search">Search</label>
        <input type="text" name="search" id="searchProductsInput" className="rounded-lg h-8 px-2 hover:focus:outline-primary outline-none" placeholder="product name" onChange={(e) => handleChange(e)} />
      </div> */}
      <fieldset className="space-y-1 dark:text-gray-800 px-1">
        <label htmlFor="Search" className="hidden">Search</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="button" title="search"  className="p-1 focus:outline-none focus:ring">
              <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-800">
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
              </svg>
            </button>
          </span>
          <input 
            type="search" name="search" id="searchProductsInput" onChange={(e) => handleChange(e)} placeholder="Search..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-violet-600" />
        </div>
      </fieldset>
      <div className="rounded-lg flex gap-3 items-center">
        {/* <label htmlFor="category" className="text-sm font-medium text-gray-900">Category</label> */}
        <select onChange={(e) => handleChange(e)} name="category" id="categoryInput" className="w-32 py-2 rounded-lg pl-1 hover:outline-primary outline-none mt-1.5 border-gray-300 text-gray-700 sm:text-sm first:to-gray-800">
          {/* categories */}
          <option value="" disabled>Category</option>
          <option value="Spices">Spice</option>
          <option value="Flours">Flour</option>
          <option value="Legumes">Legumes</option>
          <option value="Beverages">Beverages</option>
          <option value="KitchenStuff">Kitchen Stuff</option>
        </select>
      </div>
      <div className="flex gap-5">
        <Link to={`/products?${category && filter ? `?category=${category}&filter=${filter}` : "" || category ? `?category=${category}` : "" || filter ? `?filter=${filter}` : ""}`}>
          <button onClick={handleFiltering} className="bg-secondary text-white w-fit p-2 rounded-lg hover:bg-green-900">
            Filter
          </button>
        </Link>
        <Link to="/products">
          <button onClick={handleClearFilters} className="bg-primary text-white w-fit p-2 rounded-lg hover:bg-blue-950">
            Clear
          </button>
        </Link>
      </div>
    </form>
  )
}

export default Filters