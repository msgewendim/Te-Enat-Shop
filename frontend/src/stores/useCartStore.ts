import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MinimalCartItem } from '../client/types.gen';

interface CartState {
  items: MinimalCartItem[];
  addToCart: (item: MinimalCartItem) => void;
  removeFromCart: (itemId: string, size: string) => void;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemsCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (newItem) => set((state) => {
        // Check if item with same ID and size already exists
        const existingItemIndex = state.items.findIndex(
          item => item.itemId === newItem.itemId && item.size === newItem.size
        );
        
        if (existingItemIndex !== -1) {
          // Update quantity of existing item
          const updatedItems = [...state.items];
          const existingItem = updatedItems[existingItemIndex];
          if (existingItem) {
            existingItem.quantity += newItem.quantity;
          }
          return { items: updatedItems };
        } else {
          // Add new item
          return { items: [...state.items, newItem] };
        }
      }),
      
      removeFromCart: (itemId, size) => set((state) => ({
        items: state.items.filter(item => 
          !(item.itemId === itemId && item.size === size)
        ),
      })),
      
      updateQuantity: (itemId, size, quantity) => set((state) => {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          return {
            items: state.items.filter(item => 
              !(item.itemId === itemId && item.size === size)
            )
          };
        }
        
        const updatedItems = state.items.map(item =>
          item.itemId === itemId && item.size === size
            ? { ...item, quantity }
            : item
        );
        return { items: updatedItems };
      }),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getItemsCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
      // Optionally, you can specify which parts to persist
      partialize: (state) => ({ items: state.items }),
    }
  )
);
