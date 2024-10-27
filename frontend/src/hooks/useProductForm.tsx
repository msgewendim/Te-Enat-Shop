import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from '../client/types.gen';
import { ProductSchema } from '../providers/validation/AddProduct.validation';

const useProductForm = (initialProduct?: Product) => {
  const { register, control, handleSubmit, formState: { errors }, setValue, reset } = useForm<Product>({
    defaultValues: initialProduct || {
      pricing: [{ size: '', price: 0 }],
      image: "",
      categories: [],
      features: {
        id: String(Date.now()),
        value: []
      },
      name: "",
      shortDescription: ""
    },
    resolver: zodResolver(ProductSchema)  // validate the form
  });
  const existingCategories = initialProduct?.categories || [];
  return {
    register,
    control,
    handleSubmit,
    errors,
    setValue,
    reset,
    existingCategories
  }
}

export default useProductForm