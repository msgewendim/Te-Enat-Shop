import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGetProductsFromRecipe } from './useGetProductsFromRecipe';
import { CartItem, Recipe } from '../../client/types.gen';
import { addItemToCartList } from '../../utils/helperFunctions';
import { useAppContext } from '../app/useAppContext';
import useGenericData from '../app/useGenericData';


export default function useRecipePage() {
  const { t } = useTranslation();
  const { recipeID } = useParams();
  const { useGetItemById } = useGenericData<Recipe>("/recipes");
  const { data: recipe, isError, isLoading, error } = useGetItemById(recipeID || "");
  const { productsFromRecipe, isError: isErrorProductsFromRecipe, error: errorProductsFromRecipe } = useGetProductsFromRecipe(recipe?.ingredients || []);
  const { setCartItems, cartItems } = useAppContext();

  const handleAddAllProductsToCart = useCallback(() => {
    if (!productsFromRecipe) {
      toast.error(t('errors.noProductsAvailable'));
    }

    const newCartItems: CartItem[] = [];

    productsFromRecipe.forEach((product) => {
      const newItem: CartItem = {
        item: product,
        quantity: 1,
        size: product?.pricing[0]?.size?.sizeName || '',
        price: product?.pricing[0]?.price || 0,
        itemType: "Product",
        name: product?.name || '',
        image: product?.image || '',
      };
      newCartItems.push(newItem);
    });

    // Update cart and order lists with the new items using reduce to avoid multiple calls to setCartItems
    const updatedCartItems = newCartItems.reduce((acc, item) => addItemToCartList(acc, item), cartItems);

    setCartItems(updatedCartItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    toast.success(t('cart.allProductsAdded'));
  }, [productsFromRecipe, cartItems, setCartItems, t]);


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
