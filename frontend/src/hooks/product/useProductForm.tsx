import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'

import { Product } from '../../client/types.gen';
import { ProductSchema } from '../../validation/AddProduct.validation';

function useProductForm(initialProduct?: Product) {
  const { register, control, handleSubmit, formState: { errors, touchedFields }, setValue, reset } = useForm<Product>({
    defaultValues: initialProduct || {
      name: "",
      shortDescription: "",
      pricing: [{ size: { sizeName: '', sizeQuantity: 0 }, price: 0 }],
      image: "",
      categories: [],
      subCategories: [],
      features: {
        value: []
      }
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
    existingSubCategories,
    touchedFields
  }
}

export default useProductForm