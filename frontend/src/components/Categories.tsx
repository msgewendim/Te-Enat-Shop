import { MouseEvent, useContext } from "react"
import { AppContext } from "../providers/interface/context"

const Categories = () => {
  const categories = [
    "קמח",
    "תבלינים",
    "קטניות",
    "שתייה",
    "כלי מטבח"
  ]
  const { setCategory } = useContext(AppContext)
  const handleCategoryChange = (e : MouseEvent<HTMLButtonElement>, category : string) => {
    e.preventDefault()
    setCategory(category)
  }
  return (
    <div className="rounded-lg flex gap-3 items-center">
      {categories.map((cat) =>
        <button onClick={(e) => handleCategoryChange(e, cat)} key={cat} 
          className="text-sm border-primary border-2 text-primary w-fit p-2 rounded-lg hover:bg-slate-100">
      {cat}
    </button>
  )
}
    </div >
  )
}

export default Categories