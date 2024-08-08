import { Recipe } from "../../../types/recipe.types";
import { cookies } from "./data";

export const recipe: Recipe = {
  _id: "chocolate-chip-cookies",

  title: "Chocolate Chip Cookies",
  description:
    "Chocolate chip cookies are a delicious and healthy dessert that can be enjoyed with a variety of snacks. These cookies are filled with chocolate chips, which are a great source of fiber and healthy fats. They are also easy to make and can be enjoyed on a variety of days of the week.",
  ingredients: [
    { _id: "1233", name: "unsalted butter", quantity: "100g" },
    { _id: "1231", name: "granulated sugar", quantity: "50g" },
    { _id: "1213", name: "light brown sugar", quantity: "25g" },
    { _id: "1236", name: "salt", quantity: "1tsp" },
    { _id: "1239", name: "vanilla extract", quantity: "1 cup" },
  ],
  instructions: [
    "In a large bowl, cream butter and sugar until light and fluffy.",
    "Add brown sugar and salt, and beat until combined.",
    "Add vanilla extract and beat until combined.",
    "Gradually add the chocolate chips, beating until melted and well combined.",
    "Place the cookies in a greased baking sheet or cookie tray.",
    "Bake for 15-20 minutes, or until a toothpick inserted in the center comes out clean.",
  ],
  prepTime: '15',
  difficulty: "Easy",
  categories: ["Dessert", "Cookie", "Chocolate Chip"],
  image: cookies,
  relatedRecipes: [{ _id: "chocolate-chip-cookies", title: "cookie" }, { _id: "doro-wet", title: "doro-wot" }, { _id: "chocolate-chip-cookies", title: "cookie" }, { _id: "doro-wet", title: "doro-wot" }],
  reviews: [
    // Add review objects here
    // Example:
    { _id: "123", userId: "John Doe", rating: 5, comment: "Love this recipe!", recipeId: "1221", createdAt: new Date() },
  ],
  createdAt: new Date()
}
