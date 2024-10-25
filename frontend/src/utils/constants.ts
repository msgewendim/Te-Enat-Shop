import { dessert, hotShiro, kurkum, shiro } from "./data";
const categories = [
  { name: "קמחים", value: "Flours" },
  { name: "קטניות", value: "Legumes" },
  { name: "משקאות", value: "Beverages" },
  { name: "תבלינים", value: "Spices" },
  { name: "שונות", value: "Others" },
];
const categoriesKeyValue = {
  flours: "קמחים",
  legumes: "קטניות",
  beverages: "משקאות",
  spices: "תבלינים",
  others: "שונות",
};

const ourTopCategories = [
  {
    _id: "123",
    name: "קמחים",
    image: hotShiro,
  },
  {
    _id: "124",
    name: "תבלינים",
    image: kurkum,
  },
  {
    _id: "125",
    name: "קטניות",
    image: shiro,
  },
  {
    _id: "126",
    name: "משקאות",
    image: dessert,
  },
  {
    _id: "126",
    name: "מארזים",
    image: dessert,
  },
];

type TopCategories = {
  _id: string;
  name: string;
  image: string;
};
export { categories, categoriesKeyValue, TopCategories, ourTopCategories };
