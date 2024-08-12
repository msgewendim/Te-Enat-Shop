import { Link } from "react-router-dom"
import { topRecipes } from "../utils/examples"

const TopRecipes = () => {

  return (
    <div style={{ backgroundColor: '#D2FCFF' }}
      className="min-h-[350px] sm:min-h-[500px]"
    >
      <div className="flex flex-col justify-center items-center my-3">
        <div className="flex flex-col justify-center items-center gap-2 mt-3">
          <h1 className="text-4xl font-bold text-primary capitalize">Our organic experts</h1>
          <p className="text-sm text-black text-center w-[60vw]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla corporis consequatur sequi quod, libero quis quae ullam molestiae dignissimos illo esse blanditiis repudiandae ex tempore veniam. Quo officia illum placeat.
          </p>
        </div>

        <div className="flex justify-between items-center gap-8 mt-16 ">
          {
            topRecipes.map(({ _id, image, title }, index) => {
              return (
                <Link to={`/recipes/${_id}`} key={index} className="flex flex-col gap-4 justify-between items-center">
                  <img src={image} alt={title} className="object-cover w-[250px] h-[170px]" />
                  <div className="bg-slate-100 w-[250px] p-4 rounded-b-xl shadow-lg">
                    <h2 className="text-l ml-2 text-primary capitalize font-semibold">
                      {title}
                    </h2>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default TopRecipes