import { ChangeEvent } from "react"
import { Link } from "react-router-dom"
import { useAppContext } from "../../hooks/useAppContext"
import Categories from "./Categories"

const Filters = () => {
  const { setFilter, setCategory } = useAppContext()
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }
  const handleClearFilters = () => {
    setCategory("")
    setFilter("")
    const form = document.getElementById("form") as HTMLFormElement
    form.reset()
  }
  return (
    <form id="form" className="sm:w-[80%] w-full h-20 flex justify-center sm:justify-end gap-2 sm:gap-10 items-center bg-slate-300 rounded-lg sm:px-14 px-2">
      <Link to="/products">
        <button onClick={handleClearFilters} className="bg-primary text-white w-fit p-2 rounded-lg hover:bg-blue-950">
          נקה
        </button>
      </Link>
      <div className="flex items-center sm:gap-10 gap-2 justify-center">
        {/* Search field */}
        <fieldset className="dark:text-gray-800 px-1">
          <label htmlFor="Search" className="hidden">Search</label>
          <div dir="rtl" className="relative">
            <input
              type="search" name="search" id="searchProductsInput"
              onChange={(e) => handleSearch(e)} placeholder="הקלד שם מוצר"
              className="w-32 py-[10px] sm:py-2 pr-7 placeholder:absolute placeholder:right-7 text-sm rounded-md focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-violet-600" />
            <span className="absolute inset-y-0 right-0 flex items-center">
              <button type="button" title="search" className="p-1 pr-2 focus:outline-none focus:ring">
                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-800">
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
          </div>
        </fieldset>
        {/* Categories */}
        <Categories />
      </div>
    </form>
  )
}

export default Filters