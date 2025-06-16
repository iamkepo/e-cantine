// src/store/cart.ts
import { CartItem, IArticle } from "@/core";
// TODO: Vérifiez que Slot est bien exporté de '@/enums', sinon adaptez l'import
import { Slot } from "@/enums";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartState {
  items: CartItem[];
}

// Tax rate as a percentage
const TAX_RATE = 20;
// Base shipping cost
const BASE_SHIPPING = 2.99;
// Free shipping threshold
const FREE_SHIPPING_THRESHOLD = 35;

const initState = {
  items: [] as Array<CartItem>,
} as CartState;

import type { StateCreator } from "zustand";

const myMiddlewares = <T extends object>(f: StateCreator<T, [], [], T>) => persist(f, { name: 'e-cantine-cart' });

export const useCartStore = create<CartState>()(
  myMiddlewares((set: (fn: (state: CartState) => CartState) => void) => ({
    ...initState,
    initApp: () => set(() => initState),
  })),
);
      // Add an item to the cart
export const addItem = (item: CartItem): void => {
  useCartStore.setState(state => {
    const existingItemIndex = state.items.findIndex(
      i => i.articleId === item.articleId && i.date === item.date && i.slot === item.slot
    );
    if (existingItemIndex > -1) {
      const newItems = [...state.items];
      newItems[existingItemIndex].quantity += item.quantity;
      // Remove si quantité <= 0
      if (newItems[existingItemIndex].quantity <= 0) {
        newItems.splice(existingItemIndex, 1);
      }
      return { items: newItems };
    }
    if (item.quantity <= 0) return { items: state.items };
    return { items: [...state.items, item] };
  });
};

// Remove an item from the cart
export const removeItem = (articleId: number, date: Date, slot: Slot): void => {
  useCartStore.setState(state => ({
    items: state.items.filter(
      item => !(item.articleId === articleId && item.date === date && item.slot === slot)
    )
  }));
};
export const removeItemByDate = (date: Date) => {
  useCartStore.setState(state => ({
    items: state.items.filter(item => item.date !== date)
  }));
}

export const removeItemBySlot = (date: Date, slot: Slot) => {
  useCartStore.setState(state => ({
    items: state.items.filter(item => item.date !== date && item.slot !== slot)
  }));
}
// Update item quantity
export const updateQuantity = (articleId: number, date: Date, slot: Slot, quantity: number): void => {
  useCartStore.setState(state => {
    if (quantity < 0) return { items: state.items };
    if (quantity === 0) {
      return {
        items: state.items.filter(item =>
          !(item.articleId === articleId && item.date === date && item.slot === slot)
        )
      };
    }
    return {
      items: state.items.map(item =>
        item.articleId === articleId && item.date === date && item.slot === slot
          ? { ...item, quantity }
          : item
      )
    };
  });
};

// Clear the cart
export const clearCart = (): void => {
  useCartStore.setState({ items: [] });
};

export const validateCart = (): void => {
  const { items } = useCartStore.getState();
  const today = new Date().getTime();
  items.forEach(item => {
    if (item.quantity <= 0) {
      removeItem(item.articleId, item.date, item.slot);
    }
    if (new Date(item.date).getTime() < today) {
      removeItemByDate(item.date);
    }
  });
}
  
// Calculate the cart subtotal
export const getSubtotal = (articles: IArticle[]): number => {
  validateCart();
  const { items } = useCartStore.getState();
  return items.reduce((total: number, item: CartItem) => total + (item.quantity * (articles.find(a => a.id === item.articleId)?.price as number) || 0), 0) || 0;
};

// Calculate tax
export const getTax = (articles: IArticle[]): number => {
  const subtotal = getSubtotal(articles);
  return subtotal * (TAX_RATE / 100);
};
  
// Calculate shipping
export const getShipping = (articles: IArticle[]): number => {
  const subtotal = getSubtotal(articles);
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : BASE_SHIPPING;
};

// Calculate cart total including tax and shipping
export const getTotal = (articles: IArticle[]): number => {
  const subtotal = getSubtotal(articles);
  const tax = getTax(articles);
  const shipping = getShipping(articles);
  return subtotal + tax + shipping;
};

// Get total number of items in cart
export const getItemCount = (): number => {
  const { items } = useCartStore.getState();
  return items.reduce((count: number, item: CartItem) => count + item.quantity, 0) || 0;
};

// Get count of items for each slot in a specific day
export const getCountByDate = (date: Date): Record<Slot, number> => {
  const { items } = useCartStore.getState();
  const dateItems = items.filter((item: CartItem) => item.date === date);
  return dateItems.reduce((acc: Record<Slot, number>, item: CartItem) => {
    acc[item.slot] = (acc[item.slot] || 0) + item.quantity;
    return acc;
  }, {} as Record<Slot, number>);
};

// Get unique days in the cart
export const getDates = (): Date[] => {
  const { items } = useCartStore.getState();
  return [...(items.map((item: CartItem) => item.date))].sort();
};

export const filterBySlot = (slot: Slot): CartItem[] => {
  const { items } = useCartStore.getState();
  return items.filter((item: CartItem) => item.slot === slot);
};

// export const getMissingSlots = (): {name: Slot, checked: boolean}[] => {
//   const { items } = useCartStore.getState();

//   const missingSlots = Object.values(Slot).map((slot) => ({ 
//     name: slot, 
//     checked: items.filter(el => el.slot === slot).length > 0 
//   }));

//   return missingSlots;
// }

// export const setIgnoreSlots = (slots: {name: Slot, checked: boolean}[]) => {
//   useCartStore.setState({
//     ignoreSlots: slots
//   });
// };
