type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rate: number;
};

type Languages = {
  "en": {
    nativeName: string;
  };
  "he-IL": {
    nativeName: string;
  };
  [key: string]: {
    nativeName: string;
  };
}
export type { Product, Languages };
