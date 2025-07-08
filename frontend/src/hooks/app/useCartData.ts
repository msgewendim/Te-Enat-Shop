import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import { MinimalCartItem, Product, Package } from '../../client/types.gen';
import { getItemById } from '../../lib/GenericService';

/**
 * Hook to fetch full cart item data from minimal cart items
 * Fetches product/package data by ID for display purposes
 */
export function useCartItemsData(minimalItems: MinimalCartItem[]) {
  // Memoize queries to prevent unnecessary re-fetches
  const { queries, itemQueryMap } = useMemo(() => {
    // Create a map to avoid duplicate queries for same item
    const uniqueItems = new Map<string, MinimalCartItem>();
    const itemQueryMap = new Map<string, number>(); // Maps itemType-itemId to query index
    
    minimalItems.forEach(item => {
      const key = `${item.itemType}-${item.itemId}`;
      if (!uniqueItems.has(key)) {
        uniqueItems.set(key, item);
      }
    });

    const uniqueItemsArray = Array.from(uniqueItems.values());
    
    // Create mapping from item key to query index
    uniqueItemsArray.forEach((item, index) => {
      const key = `${item.itemType}-${item.itemId}`;
      itemQueryMap.set(key, index);
    });

    const queries = uniqueItemsArray.map((item) => ({
      queryKey: [item.itemType.toLowerCase(), item.itemId],
      queryFn: async () => {
        const endpoint = item.itemType === 'Product' ? '/products' : '/packages';
        return await getItemById<Product | Package>(endpoint, item.itemId);
      },
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1, // Reduce retries to minimize multiple calls
    }));

    return { queries, itemQueryMap };
  }, [minimalItems]);

  const results = useQueries({ queries });

  // Transform results into enriched cart items
  const enrichedCartItems = minimalItems.map((minimalItem) => {
    // Find the corresponding query result using the map
    const itemKey = `${minimalItem.itemType}-${minimalItem.itemId}`;
    const queryIndex = itemQueryMap.get(itemKey);
    const queryResult = queryIndex !== undefined ? results[queryIndex] : undefined;

    const fullItemData = queryResult?.data;

    return {
      // Minimal cart data
      itemId: minimalItem.itemId,
      quantity: minimalItem.quantity,
      size: minimalItem.size,
      price: minimalItem.price,
      itemType: minimalItem.itemType,
      
      // Full item data (null if loading/error)
      item: fullItemData || null,
      
      // Query states
      isLoading: queryResult?.isLoading || false,
      isError: queryResult?.isError || false,
      error: queryResult?.error || null,
    };
  });

  // Overall loading and error states
  const isLoading = results.some(result => result.isLoading);
  const isError = results.some(result => result.isError);
  const errors = results.filter(result => result.error).map(result => result.error);

  return {
    cartItems: enrichedCartItems,
    isLoading,
    isError,
    errors,
  };
}

/**
 * Hook to get total price from minimal cart items
 */
export function useCartTotals(minimalItems: MinimalCartItem[]) {
  const totalPrice = minimalItems.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );
  
  const totalItems = minimalItems.reduce((total, item) => 
    total + item.quantity, 0
  );

  return {
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    totalItems,
    itemCount: minimalItems.length,
  };
} 