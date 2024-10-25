import { MouseEvent } from "react"
import Select from "./Select"
import { useAppContext } from "../../hooks/useAppContext"
import { categories } from "../../utils/constants"
const FilterCategories = () => {
  const { setCategory } = useAppContext()
  const categoryNames: Array<string> = ["קטגוריות"]
  categories.forEach((cat) => {
    categoryNames.push(cat.name)
  })
  const handleCategoryChange = (e: MouseEvent<HTMLButtonElement>, category: string) => {
    e.preventDefault()
    setCategory(category)
  }

  return (
    <div className="rounded-lg items-center">
      <Select selectItems={categoryNames} item={categoryNames[0]} classes="md:hidden" />
      <div className="md:flex gap-2 hidden">
        {
          categoryNames.map((cat, idx) => {
            return (
              <button key={idx} onClick={(e) => handleCategoryChange(e, cat)}
                className="text-sm border-primary border-2 text-primary w-fit p-2 rounded-lg hover:bg-slate-100" >
                {cat}
              </button>
            )
          })
        }
      </div>
    </div >
  )
}

export default FilterCategories