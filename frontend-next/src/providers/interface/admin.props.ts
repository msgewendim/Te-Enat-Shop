import {
  Control,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { Category, Product, SubCategory } from "../../client/types.gen";

interface ArrayInputFieldProps {
  control: Control<Product>;
  register: UseFormRegister<Product>;
}

interface AddCategoryInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  listOfCategories: Category[];
  initialMainCategories?: Category[];
  initialSubCategories?: SubCategory[];
  type: "product" | "recipe";
}
type FormProps<T> = {
  mutateFormState?: {
    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
    error: Error | null;
  };
  item?: T;
  onSubmit: (data: T) => void;
  message: string;
};
type RecipeTableData = {
  _id: string;
  name: string;
  categories: React.ReactNode;
  servings: number;
  difficulty: string;
};
interface RecipeDashboardReturn {
  tableData: RecipeTableData[];
  headers: string[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}
type ProductTableData = {
  _id: string;
  name: string;
  categories: React.ReactNode;
  pricing: React.ReactNode;
};

interface ProductDashboardReturn {
  tableData: ProductTableData[];
  headers: string[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}
type OrderTableData = {
  _id: string;
  userId: string;
  products: React.ReactNode;
  totalPrice: number;
};
interface OrdersDashboardReturn {
  tableData: OrderTableData[];
  headers: string[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}
type PackageTableData = {
  _id: string;
  name: string;
  price: number;
  servings: number;
  ingredientsCount: number;
};

interface PackageDashboardReturn {
  tableData: PackageTableData[];
  headers: string[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}
export type {
  ArrayInputFieldProps,
  AddCategoryInputProps,
  FormProps,
  RecipeDashboardReturn,
  ProductDashboardReturn,
  RecipeTableData,
  ProductTableData,
  PackageTableData,
  OrderTableData,
  PackageDashboardReturn,
  OrdersDashboardReturn,
};
