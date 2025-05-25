import { create, StateCreator } from "zustand";
import { Cart, PlanningEvent } from '../core/types';
import { persist } from "zustand/middleware";
import { days } from "../core/constants";
import { IArticle, ICategory } from "@/core/interfaces";

type CartApp = {
  cart: Array<Cart>;
  dates: Date[] | undefined;
  events: PlanningEvent[] | undefined;
  weeks: number;
  checkedDays: string[];
  startDate: Date;
  subtotal: number;
  persons: string[] | undefined;
  initApp: () => void;
};

const initState = {
  cart: [] as Array<Cart>,
  dates: undefined,
  events: undefined,
  weeks: 1,
  checkedDays: [days[1]],
  startDate: new Date(),
  persons: undefined,
  subtotal: 0,
} as CartApp;
const myMiddlewares = <T extends object>(f: StateCreator<T>) => persist(f, { name: 'cartStore' });

export const useCartStore = create<CartApp>()(
  myMiddlewares((set) => ({
    ...initState,
    initApp: () => set(() => initState),
  })),
);

export const findItem = (id: number): Cart | undefined => {
  const { cart } = useCartStore.getState();
  const item = cart.find((item) => item.id === id);
  return item;
};
export const findAccompanement = (id1: number, id2: number): Cart | undefined => {
  const { cart } = useCartStore.getState();
  const item = cart.find((item) => item.id === id1 && item.accompanement.find(a => a.id === id2));
  return item;
};
export const findBoisson = (id1: number, id2: number): Cart | undefined => {
  const { cart } = useCartStore.getState();
  const item = cart.find((item) => item.id === id1 && item.boisson.find(a => a.id === id2));
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

export const addAccompanement = (id1: number, id2: number) => {
  useCartStore.setState((state) => ({
    cart: findAndUpdateItem(state.cart, id1, (item) => {
      item.accompanement.push({
        id: id2,
        count: 1
      });
    }),
  }));
};

export const removeAccompanement = (id1: number, id2: number) => {
  useCartStore.setState((state) => ({
    cart: findAndUpdateItem(state.cart, id1, (item) => {
      item.accompanement = item.accompanement.filter((accomp) => accomp.id !== id2);
    }),
  }));
};

export const addBoisson = (id1: number, id2: number) => {
  useCartStore.setState((state) => ({
    cart: findAndUpdateItem(state.cart, id1, (item) => {
      item.boisson.push({
        id: id2,
        count: 1
      });
    }),
  }));
};

export const removeBoisson = (id1: number, id2: number) => {
  useCartStore.setState((state) => ({
    cart: findAndUpdateItem(state.cart, id1, (item) => {
      item.boisson = item.boisson.filter((boisson) => boisson.id !== id2);
    }),
  }));
};
export const incrementAccompanement = (id1: number, id2: number) => {
  useCartStore.setState((state) => ({
    cart: findAndUpdateItem(state.cart, id1, (item) => {
      item.accompanement = item.accompanement.map((accomp) => {
        if (accomp.id === id2) {
          return {
            ...accomp,
            count: accomp.count + 1
          };
        }
        return accomp;
      });
    }),
  }));
};
export const decrementAccompanement = (id1: number, id2: number) => {
  useCartStore.setState((state) => ({
    cart: findAndUpdateItem(state.cart, id1, (item) => {
      item.accompanement = item.accompanement.map((accomp) => {
        if (accomp.id === id2) {
          return {
            ...accomp,
            count: accomp.count - 1
          };
        }
        return accomp;
      });
    }),
  }));
};
export const incrementBoisson = (id1: number, id2: number) => {
  useCartStore.setState((state) => ({
    cart: findAndUpdateItem(state.cart, id1, (item) => {
      item.boisson = item.boisson.map((boisson) => {
        if (boisson.id === id2) {
          return {
            ...boisson,
            count: boisson.count + 1
          };
        }
        return boisson;
      });
    }),
  }));
};
export const decrementBoisson = (id1: number, id2: number) => {
  useCartStore.setState((state) => ({
    cart: findAndUpdateItem(state.cart, id1, (item) => {
      item.boisson = item.boisson.map((boisson) => {
        if (boisson.id === id2) {
          return {
            ...boisson,
            count: boisson.count - 1
          };
        }
        return boisson;
      });
    }),
  }));
};

export const addItemCart = (id: number, count: number = 1) => {
  useCartStore.setState((state) => {
    const existingItemIndex = state.cart.findIndex((item) => item.id === id);
    if (existingItemIndex !== -1) {
      const updatedItems = [...state.cart];
      updatedItems[existingItemIndex].count += count;
      return { cart: updatedItems };
    }
    return { cart: [...state.cart, { id, count, accompanement: [], boisson: [] }] };
  });
};

export const removeItemCart = (id: number) => {
  useCartStore.setState((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
  }));
};

export const decrementItemCount = (id: number) => {
  const item = findItem(id);
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

export const setItemCount = (count: number) => {
  useCartStore.setState((state) => ({
    cart: state.cart.map(item => ({
      ...item,
      count
    }))
  }));
};
export const setSubtotal = (articles: IArticle[], supplements: IArticle[])=>{
  useCartStore.setState((state) => ({
    subtotal: state.cart.reduce((sum, item) => sum + item.count * (articles.find(a => a.id === item.id)?.price || 0) + priceAccomp(supplements, item), 0)
  }));
}

export const priceAccomp = (articles: IArticle[], item: Cart) => {
  return item.accompanement.reduce((sum, accomp) => sum + accomp.count * (articles.find(a => a.id === accomp.id)?.price || 0), 0);
}
export const priceBoisson = (articles: IArticle[], item: Cart) => {
  return item.boisson.reduce((sum, boisson) => sum + boisson.count * (articles.find(a => a.id === boisson.id)?.price || 0), 0);
}
export const setDates = (dates: Date[]) => {
  useCartStore.setState({
    dates
  });
}
export const setCheckedDays = (days: string[]) => {
  useCartStore.setState({
    checkedDays: days
  });
}
export const setStartDate = (date: Date) => {
  useCartStore.setState({
    startDate: date
  });
}
export const setWeeks = (weeks: number) => {
  useCartStore.setState({
    weeks
  });
}
export const setPerson = (person: string[]) => {
  useCartStore.setState({
    persons : person
  });
}
export const addPerson = (person: string) => {
  useCartStore.setState((state) => ({
    persons: [...(state.persons || []), person]
  }));
}
export const removePerson = (person: string) => {
  useCartStore.setState((state) => ({
    persons: state.persons?.filter(p => p !== person)
  }));
}

export const setEvents = (events: PlanningEvent[]) => {
  useCartStore.setState({
    events
  });
}
export const removeEvent = (index: number) => {
  useCartStore.setState((state) => ({
    events: state.events?.filter((_, i) => i !== index)
  }));
}


export function generatePlanning(
  dates: Date[],
  articles: IArticle[],
  categories: ICategory[]
): PlanningEvent[] {
  const { cart } = useCartStore.getState();
  const events: PlanningEvent[] = [];

  // Pour chaque catégorie
  categories.filter(c => c.id != null).forEach(category => {
    // Récupère tous les plats de cette catégorie
    const categoryItems = cart.filter(item => articles.find(a => a.id === item.id)?.categoryId === category.id);
    if (categoryItems.length === 0) return;

    // Pour chaque date, attribue un plat en bouclant sur la liste des plats (round-robin)
    dates.forEach((date, dateIdx) => {
      const item = categoryItems[dateIdx % categoryItems.length];
      const dateStr = new Date(date).toISOString().split("T")[0];
      events.push({
        id: item.id || 0,
        title: articles.find(a => a.id === item.id)?.name + " (" + category.name + ")",
        date: dateStr,
        slot: category.name
      });
    });
  });

  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export const clearCart  = () => {
  useCartStore.setState({
    cart: [],
    dates: undefined,
    events: undefined,
    weeks: 1,
    checkedDays: [days[1]],
    startDate: new Date(),
    subtotal: 0,
    persons: undefined
  });
};
  