import { Review } from "./recipe.types";
interface Product {
  _id: string;
  name: string;
  shortDescription: string;
  price: number;
  images: string[];
  rate: number;
  categories: string[];
  InStock: number;
  availability: "In Stock" | "Out of Stock" | "Pre-order";
  weights: string[];
  benefits?: Array<String>;
  reviews?: Review[];
  relatedProducts?: Partial<Product>[];
  totalSales?: number;
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
