import RecipeCard from "../components/recipes/RecipeCard";
import Banner from "../components/ui/Banner";
import { awaze, buna, enjera, kik, kitfo, shiro } from "../utils/data";
import RecipesBanner from "/RecipesBanner.svg";


const Recipes = () => {
  const recipes = [
    { id: "2", title: 'Recipe 2', description: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum, Simply dummy text of the printing and typesetting industry. Lorem Ipsum", image: enjera, date: new Date(1999, 8, 22) },
    { id: "1", title: 'Recipe 1', description: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum", image: kik, date: new Date() },
    { id: "4", title: 'Recipe 4', description: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum", image: buna, date: new Date(2010, 9, 30) },
    { id: "5", title: 'Recipe 5', description: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum", image: awaze, date: new Date() },
    { id: "3", title: 'Recipe 3', description: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum", image: shiro, date: new Date() },
    { id: "6", title: 'Recipe 6', description: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum", image: kitfo, date: new Date(2012, 6, 30) },
  ]

  return (
    <main>
      <Banner image={RecipesBanner} text="גלה את המתכונים שלנו" />
      {/* Add your recipes here */}
      <div className="m-24 grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8 ml-20 -mr-4">
        {recipes.map(({ id, title, description, image, date }) =>
          <RecipeCard key={id} id={id} title={title} description={description} image={image} date={date} />
        )}
      </div>
    </main>
  )
}

export default Recipes