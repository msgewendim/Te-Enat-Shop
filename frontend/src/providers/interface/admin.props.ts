import {
  Control,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Category, Product, Recipe } from "../../client/types.gen";

interface ArrayInputFieldProps {
  control: Control<Product>;
  register: UseFormRegister<Product>;
}

interface AddCategoryInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  categories: Category[];
  initialCategories?: string[];
}
interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Product) => void;
  message: string;
}
interface RecipeFormProps {
  recipe?: Recipe;
  onSubmit: (data: Recipe) => void;
  message: string;
}

export {
  ArrayInputFieldProps,
  AddCategoryInputProps,
  ProductFormProps,
  RecipeFormProps,
};
