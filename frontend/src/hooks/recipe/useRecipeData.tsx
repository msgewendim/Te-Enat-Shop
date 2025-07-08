import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGetProductsFromRecipe } from './useGetProductsFromRecipe';
import { MinimalCartItem, Recipe } from '../../client/types.gen';
import useGenericData from '../app/useGenericData';
import { useCartStore } from '../../stores/useCartStore';


export default function useRecipePage() {
  const { t } = useTranslation();
  const { recipeID } = useParams();
  const { useGetItemById } = useGenericData<Recipe>("/recipes");
  const { data: recipe, isError, isLoading, error } = useGetItemById(recipeID || "");
  const { productsFromRecipe, isError: isErrorProductsFromRecipe, error: errorProductsFromRecipe } = useGetProductsFromRecipe(recipe?.ingredients || []);
  const { addToCart } = useCartStore();

  const handleAddAllProductsToCart = useCallback(() => {
    if (!productsFromRecipe || productsFromRecipe.length === 0) {
      toast.error(t('errors.noProductsAvailable'));
      return;
    }

    const newCartItems: MinimalCartItem[] = [];

    productsFromRecipe.forEach((product) => {
      const newItem: MinimalCartItem = {
        itemId: product._id,
        quantity: 1,
        size: product?.pricing[0]?.size?.sizeName || '',
        price: product?.pricing[0]?.price || 0,
        itemType: "Product",
      };
      newCartItems.push(newItem);
    });

    newCartItems.forEach((item) => {
      addToCart(item);
    });

    toast.success(t('cart.allProductsAdded'));
  }, [productsFromRecipe, addToCart, t]);


  if (isError || isErrorProductsFromRecipe) {
    toast.error(error?.message || errorProductsFromRecipe?.message || t('errors.genericError'));
  }


  return {
    recipe: recipe as Recipe,
    productsFromRecipe,
    handleAddAllProductsToCart,
    isLoadingGettingRecipe: isLoading,
    isErrorGettingRecipe: isError,
    isErrorProductsFromRecipe,
    errorGettingRecipe: error,
    errorProductsFromRecipe
  };
}
