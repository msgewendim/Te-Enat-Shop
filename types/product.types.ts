import { Review } from "./recipe.types";
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  rate: number;
  category: string;
  stock: number;
  availability: "In Stock" | "Out of Stock" | "Pre-order";
  weight: string;
  ingredients?: string[];
  nutritionalInfo?: NutritionalInfo;
  allergens?: string[];
  originalPrice?: number;
  discountedPrice?: number;
  discountPercentage?: number;
  reviews: Review[];
  relatedProducts: Partial<Product>[];
  totalSales?: number;
}

interface NutritionalInfo {
  calories: number;
  fat: string;
  protein: string;
  carbohydrates: string;
}

interface Languages {
  en: {
    nativeName: string;
  };
  "he-IL": {
    nativeName: string;
  };
  [key: string]: {
    nativeName: string;
  };
}
export { Product, Languages };
