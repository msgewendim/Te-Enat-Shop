import { Recipe } from "../client";
import { Category } from "../client";
import { cookies, dessert, hotShiro, kik, kimem, kimem2, kurkum, shiro } from "./data";

export const recipe : Recipe = {
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
  prepTime: "15",
  difficulty: "Easy",
  categories: ["Dessert", "Cookie", "Chocolate Chip"],
  image: cookies,
  relatedRecipes: [
    { _id: "chocolate-chip-cookies", title: "cookie", image: dessert },
    { _id: "doro-wet", title: "doro-wot", image: kik },
    { _id: "chocolate-chip-cookies", title: "cookie", image: kimem },
    { _id: "doro-wet", title: "doro-wot", image: kimem2 },
  ],
  reviews: [
    // Add review objects here
    // Example:
    {
      reviewerName: "John Doe",
      rating: 5,
      comment: "Love this recipe!",
      createdAt: "2023-08-20T12:45:00Z"
    },
  ],
  createdAt: "2023-08-20T12:45:00Z",
};

export const product = {
  _id: "123",
  category: "dessert",
  image: kik,
  name: "cake",
  price: 15.0,
  rate: 4,
  relatedProducts: [
    { _id: "chocolate-chip-cookies", name: "cookie" },
    { _id: "chocolate-chip-cookies", name: "cookie" },
    { _id: "chocolate-chip-cookies", name: "cookie" },
    { _id: "chocolate-chip-cookies", name: "cookie" },
  ],
  description: [
    [
      "Rich in Antioxidants",
      " The chili peppers and spices in Berbere are loaded with antioxidants, which help protect your body from free radicals and reduce inflammation.",
    ],
    [
      "Boosts Metabolism",
      " The capsaicin in chili peppers has been shown to increase metabolism and promote fat burning, making Berbere not only flavorful but also beneficial for weight management.",
    ],
    [
      "Immune-Boosting Properties",
      "The blend includes several spices known for their immune-boosting effects, such as garlic and ginger, which can help ward off colds and infections.",
    ],
    [
      "Supports Digestive Health",
      "The blend includes several spices known for their immune-boosting effects, such as garlic and ginger, which can help ward off colds and infections.",
    ],
    [
      "Anti-Inflammatory Effects",
      "Many of the spices in Berbere, including turmeric and fenugreek, have anti-inflammatory properties, which can help reduce the risk of chronic diseases.",
    ],
  ],
};

export const topRecipes = [recipe, recipe, recipe];
export const topCategories: Category[] = [
  {
    _id: "123",
    name: "קמחים",
    images: [hotShiro],
    recipes: [recipe._id, recipe._id],
  },
  {
    _id: "124",
    name: "תבלינים",
    images: [kurkum],
    recipes: [recipe._id, recipe._id],
  },
  {
    _id: "125",
    name: "קטניות",
    images: [shiro],
    recipes: [recipe._id, recipe._id],
  },
  {
    _id: "126",
    name: "משקאות",
    images: [dessert],
    recipes: [recipe._id, recipe._id],
  },
  {
    _id: "126",
    name: "כלי מטבח",
    images: [dessert],
    recipes: [recipe._id, recipe._id],
  },
];
export const products = [
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
];
