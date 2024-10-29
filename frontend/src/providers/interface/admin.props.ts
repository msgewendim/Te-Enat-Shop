import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Category, Product } from "../../client/types.gen";

interface ArrayInputFieldProps {
  control: Control<Product>;
  register: UseFormRegister<Product>;
}
interface AddCategoryInputProps {
  register: UseFormRegister<Product>;
  setValue: UseFormSetValue<Product>;
  categories: Category[];
  initialCategories?: string[];
}
interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Product) => void;
  message: string;
}

export { ArrayInputFieldProps, AddCategoryInputProps, ProductFormProps };
