import { MouseEvent, useContext } from "react"
import { AppContext } from "../providers/interface/context"

const Categories = () => {
  const categories = [
    "Spices",
    "Flours",
    "Legumes",
    "Beverages",
    "Kitchen Stuff"
  ]
  const { setCategory } = useContext(AppContext)
  const handleCategoryChange = (e : MouseEvent<HTMLButtonElement>, category : string) => {
    e.preventDefault()
    setCategory(category)
  }
  return (
    <div className="rounded-lg flex gap-3 items-center">
      {categories.map((cat) =>
        <button onClick={(e) => handleCategoryChange(e, cat)} key={cat} className="text-sm border-secondary border-2 text-black w-fit p-2 rounded-lg hover:bg-emerald-300">
      {cat}
    </button>
  )
}
    </div >
  )
}

export default Categories