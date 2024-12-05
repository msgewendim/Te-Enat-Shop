import { CartItem, OrderItem, Recipe } from '../../client/types.gen';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useGetProductsFromRecipe } from './useGetProductsFromRecipe';
import { useAppContext } from '../app/useAppContext';
import useGenericData from '../app/useGenericData';
import { addItemToCartList, addItemToOrderList } from '../../utils/helperFunctions';


export default function useRecipePage() {
  const { t } = useTranslation();
  const { recipeID } = useParams();
  const { useGetItemById } = useGenericData<Recipe>("/recipes");
  const { data: recipe, isError, isLoading, error } = useGetItemById(recipeID || "");
  const { productsFromRecipe, isError: isErrorProductsFromRecipe, error: errorProductsFromRecipe } = useGetProductsFromRecipe(recipe?.ingredients || []);
  const { setCartItems, setOrderItems, cartItems, orderItems } = useAppContext();

  const handleAddAllProductsToCart = useCallback(() => {
    if (!productsFromRecipe) {
      toast.error(t('errors.noProductsAvailable'));
    }

    const newCartItems: CartItem[] = [];
    const newOrderItems: OrderItem[] = [];

    productsFromRecipe.forEach((product) => {
      const newItem = {
        item: product,
        quantity: 1,
        size: product.pricing[0].size.sizeName,
        price: product.pricing[0].price
      };
      newCartItems.push(newItem);
      newOrderItems.push({
        description: product.name,
        quantity: 1,
        price: product.pricing[0].price,
        size: product.pricing[0].size.sizeName,
        currency: "ILS",
        vatType: 1,
      });
    });

    // Update cart and order lists with the new items using reduce to avoid multiple calls to setCartItems and setOrderItems
    const updatedCartItems = newCartItems.reduce((acc, item) => addItemToCartList(acc, item), cartItems);
    const updatedOrderItems = newOrderItems.reduce((acc, item) => addItemToOrderList(acc, item), orderItems);

    setCartItems(updatedCartItems);
    setOrderItems(updatedOrderItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    toast.success(t('cart.allProductsAdded'));
  }, [productsFromRecipe, cartItems, orderItems, setCartItems, setOrderItems, t]);


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
