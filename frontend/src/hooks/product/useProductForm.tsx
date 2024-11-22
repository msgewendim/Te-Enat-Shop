import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from '../../client/types.gen';
import { ProductSchema } from '../../validation/AddProduct.validation';

function useProductForm(initialProduct?: Product) {
  const { register, control, handleSubmit, formState: { errors }, setValue, reset } = useForm<Product>({
    defaultValues: initialProduct || {
      pricing: [{ size: { sizeName: '', sizeQuantity: 0 }, price: 0 }],
      image: "",
      categories: [],
      features: {
        value: []
      },
      name: "",
      shortDescription: ""
    },
    resolver: zodResolver(ProductSchema)  // validate the form
  });
  const existingMainCategories = initialProduct?.categories || [];
  const existingSubCategories = initialProduct?.subCategories || [];
  return {
    register,
    control,
    handleSubmit,
    errors,
    setValue,
    reset,
    existingMainCategories,
    existingSubCategories
  }
}

export default useProductForm