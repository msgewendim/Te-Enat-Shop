import { useContext, MouseEvent } from "react"
import { AppContext } from "../providers/interface/context"
import Select from "./Select"

const Categories = ({ categories }: { categories: Array<string> }) => {
  const { setCategory } = useContext(AppContext)
  const handleCategoryChange = (e: MouseEvent<HTMLButtonElement>, category: string) => {
    e.preventDefault()
    setCategory(category)
  }
  return (
    <div className="rounded-lg items-center">
      <Select selectItems={categories} item={categories[0]} handleClick={setCategory} classes="md:hidden" />
      <div className="md:flex gap-2 hidden">
        {
          categories.map((cat) => {
            return (
              <button key={cat} onClick={(e) => handleCategoryChange(e, cat)}
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

export default Categories