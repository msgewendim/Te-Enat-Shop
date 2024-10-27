import { Recipe } from "../client";
import { cookies, dessert, hotShiro, kurkum, shiro } from "./data";

export const recipe: Recipe = {
  _id: "chocolate-chip-cookies",

  name: "Chocolate Chip Cookies",
  description:
    "Chocolate chip cookies are a delicious and healthy dessert that can be enjoyed with a variety of snacks. These cookies are filled with chocolate chips, which are a great source of fiber and healthy fats. They are also easy to make and can be enjoyed on a variety of days of the week.",
  ingredients: [
    { name: "unsalted butter", quantity: "100g" },
    { name: "granulated sugar", quantity: "50g" },
    { name: "light brown sugar", quantity: "25g" },
    { name: "salt", quantity: "1tsp" },
    { name: "vanilla extract", quantity: "1 cup" },
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
  reviews: [
    // Add review objects here
    // Example:
    {
      reviewerName: "John Doe",
      rating: 5,
      comment: "Love this recipe!",
      createdAt: new Date().toDateString(),
    },
  ],
  createdAt: new Date().toDateString(),
};

export const topRecipes = [recipe, recipe, recipe, recipe, recipe, recipe];
export const topCategories = [
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
    name: "מארזים",
    images: [dessert],
    recipes: [recipe._id, recipe._id],
  },
];
export const recipesList: Recipe[] = [
  {
    _id: "1",
    name: "Shiro Wot",
    description: "A delicious Ethiopian chickpea stew",
    image: "https://example.com/images/shiro-wot.jpg",
    ingredients: [
      { name: "Shiro powder", quantity: "1 cup" },
      { name: "Onion", quantity: "1 large" },
      { name: "Garlic", quantity: "3 cloves" },
      { name: "Tomato", quantity: "1 medium" },
      { name: "Vegetable oil", quantity: "1/4 cup" },
      { name: "Water", quantity: "2 cups" },
    ],
    instructions: [
      "Finely chop the onion and garlic.",
      "Heat oil in a pot and sauté the onion and garlic until golden brown.",
      "Add the tomato and cook for a few minutes.",
      "Gradually add the shiro powder while stirring constantly.",
      "Pour in the water and simmer for 15-20 minutes, stirring occasionally.",
      "Serve hot with injera or bread.",
    ],
    prepTime: "30 minutes",
    difficulty: "Easy",
    categories: ["Ethiopian", "Vegetarian"],
    reviews: [
      { reviewerName: "user1", rating: 5, comment: "Authentic taste!" },
      {
        reviewerName: "user2",
        rating: 4,
        comment: "Easy to make and delicious.",
      },
    ],
    createdAt: new Date("2024-03-15T10:00:00Z").toDateString(),
  },
  {
    _id: "2",
    name: "Injera",
    description: "Traditional Ethiopian flatbread",
    image: "https://example.com/images/injera.jpg",
    ingredients: [
      { name: "Teff flour", quantity: "2 cups" },
      { name: "Water", quantity: "3 cups" },
      { name: "Salt", quantity: "1/2 teaspoon" },
    ],
    instructions: [
      "Mix teff flour with water and salt in a large bowl.",
      "Cover and let ferment for 2-3 days at room temperature.",
      "Heat a large non-stick pan or griddle over medium heat.",
      "Pour a thin layer of batter in a spiral pattern.",
      "Cook until bubbles form and the top is dry.",
      "Remove from heat and let cool slightly before serving.",
    ],
    prepTime: "3 days (including fermentation)",
    difficulty: "Medium",
    categories: ["Ethiopian", "Bread"],
    reviews: [
      {
        reviewerName: "user3",
        rating: 5,
        comment: "Perfect texture and taste!",
      },
      {
        reviewerName: "user4",
        rating: 4,
        comment: "Takes practice but worth it.",
      },
    ],
    createdAt: new Date("2024-03-10T14:30:00Z").toDateString(),
  },
  {
    _id: "3",
    name: "Doro Wat",
    description: "Spicy Ethiopian chicken stew",
    image: "https://example.com/images/doro-wat.jpg",
    ingredients: [
      { name: "Chicken", quantity: "1 whole, cut into pieces" },
      { name: "Onions", quantity: "3 large" },
      { name: "Berbere spice", quantity: "1/4 cup" },
      { name: "Garlic", quantity: "4 cloves" },
      { name: "Ginger", quantity: "1 inch piece" },
      { name: "Eggs", quantity: "4" },
    ],
    instructions: [
      "Sauté onions in oil until caramelized.",
      "Add berbere spice, garlic, and ginger. Cook for a few minutes.",
      "Add chicken pieces and cook until browned.",
      "Pour in water or chicken stock and simmer for 40 minutes.",
      "Add hard-boiled eggs and cook for an additional 5 minutes.",
      "Serve hot with injera.",
    ],
    prepTime: "1 hour 30 minutes",
    difficulty: "Medium",
    categories: ["Ethiopian", "Chicken"],
    reviews: [
      { reviewerName: "user5", rating: 5, comment: "Absolutely delicious!" },
      {
        reviewerName: "user6",
        rating: 4,
        comment: "Spicy but full of flavor.",
      },
    ],
    createdAt: new Date("2024-03-20T09:15:00Z").toDateString(),
  },
];
