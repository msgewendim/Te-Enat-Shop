import { ObjectId } from "mongoose";

interface Product {
  _id: ObjectId | null;
  name: string;
  shortDescription: string;
  pricing: Array<Object>;
  images: string[];
  rate: number;
  categories: string[];
  InStock: number;
  availability: "In Stock" | "Out of Stock" | "Pre-order";
  features?: Array<String>;
  relatedProducts?: Partial<Product>[];
  totalSales?: number;
}

export interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  image: string;
  categories: string[];
  rate: number;
  shortDescription: string;
  imageSize?: number;
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
