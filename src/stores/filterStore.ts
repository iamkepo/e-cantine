import { create } from "zustand";
import { Article } from "../core/types";

type FilterApp = {
  selected: {
    tagIds: number[] | null;
    price: number | null;
    query: string
  };
  initApp: () => void;
};

const initState = {
  selected: { tagIds: null, price: null, query: "" },
} as FilterApp;

export const useFilterStore = create<FilterApp>((set) => ({
  ...initState,
  initApp: () => set(() => initState),
}));

export const filteredArticles = (articles: Article[], category?: number) => {
  const { selected } = useFilterStore.getState();

  return articles.filter((article) => {
    const matchesCategory = category ? article.category === category : true;
    const matchesSearch = article.label.toLowerCase().includes(selected.query.toLowerCase());
    const matchesPrice = selected.price ? article.price <= selected.price : true;
    return matchesCategory && matchesSearch && matchesPrice;
  });
};

export const tagSelect = (id: number | null) => {
  useFilterStore.setState((state) => ({
    selected: { 
      ...state.selected, 
      tagIds: id ? state.selected.tagIds?.includes(id) ? 
      state.selected.tagIds?.filter((tagId) => tagId !== id) : 
      [...(state.selected.tagIds || []), id] : null },
  }));
};
export const priceSelect = (value: number | null) => {
  useFilterStore.setState((state) => ({
    selected: { ...state.selected, price: value },
  }));
};
export const setSearchQuery = (value: string) => {
  useFilterStore.setState((state) => ({
    selected: { ...state.selected, query: value },
  }));
};
