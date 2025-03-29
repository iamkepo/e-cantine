import { create, StateCreator } from "zustand";
import { Cart } from "../helpers/types";
import { persist } from "zustand/middleware";

type CartApp = {
  cart: Array<Cart>;
  subtotal: number;
  initApp: () => void;
};

const initState = {
  cart: [] as Array<Cart>,
  subtotal: 0,
} as CartApp;
const myMiddlewares = <T extends object>(f: StateCreator<T>) => persist(f, { name: 'langStore' });

export const useCartStore = create<CartApp>()(
  myMiddlewares((set) => ({
    ...initState,
    initApp: () => set(() => initState),
  })),
);

export const findAndItem = (id: number): Cart | undefined => {
  const { cart } = useCartStore.getState();
  const item = cart.find((item) => item.id === id);
  return item;
};
const findAndUpdateItem = (
  items: Array<Cart>,
  id: number,
  updateFn: (item: Cart) => void
) => {
  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    const updatedItems = [...items];
    updateFn(updatedItems[index]);
    return updatedItems;
  }
  return items;
};
export const filterCartByCategory = (category: number) => {
  const { cart } = useCartStore.getState();
  return cart.filter((item) => item.category === category); // Ensure `category` exists on items
};

export const addItemCart = (value: Cart) => {
  useCartStore.setState((state) => {
    const existingItemIndex = state.cart.findIndex((item) => item.id === value.id);
    if (existingItemIndex !== -1) {
      const updatedItems = [...state.cart];
      updatedItems[existingItemIndex].count += value.count;
      return { cart: updatedItems };
    }
    return { cart: [...state.cart, value] };
  });
};

export const removeItemCart = (id: number) => {
  useCartStore.setState((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
  }));
};

export const decrementItemCount = (id: number) => {
  const item = findAndItem(id);
  if (item && item.count === 1) {
    removeItemCart(id); // Remove item if count is 1
    return;
  }
  useCartStore.setState((state) => {
    return {
      cart: findAndUpdateItem(state.cart, id, (item) => {
        if (item.count > 1) {
          item.count -= 1;
        }
      }),
    };
  });
};

export const incrementItemCount = (id: number) => {
  useCartStore.setState((state) => ({
    cart: findAndUpdateItem(state.cart, id, (item) => {
      item.count += 1;
    }),
  }));
};
export const setSubtotal = ()=>{
  useCartStore.setState((state) => ({
    subtotal: state.cart.reduce((sum, item) => sum + item.count * (item.price || 0), 0)
  }));
}
