import { create } from "zustand";
import { articles } from "../helpers/constants";

type StateApp = {
  selected: {
    tag: number | null;
    type: number | null;
    query: string
  };
  initApp: () => void;
};

const initState = {
  selected: { tag: null, type: null, query: "" },
} as StateApp;

export const useFilterStore = create<StateApp>((set) => ({
  ...initState,
  initApp: () => set(() => initState),
}));



export const filteredArticles = (category?: number) => {
  const { selected } = useFilterStore.getState();

  return articles.filter((article) => {
    const matchesTag = selected.tag ? article.tags.includes(selected.tag) : true;
    const matchesType = selected.type ? article.type === selected.type : true;
    const matchesCategory = category ? article.category === category : true;
    const matchesSearch = article.label.toLowerCase().includes(selected.query.toLowerCase());
    return matchesTag && matchesType && matchesCategory && matchesSearch;
  });
};

export const tagSelect = (id: number | null) => {
  useFilterStore.setState((state) => ({
    selected: { ...state.selected, tag: id === state.selected.tag ? null : id },
  }));
};

export const typeSelect = (id: number | null) => {
  useFilterStore.setState((state) => ({
    selected: { ...state.selected, type: id === state.selected.type ? null : id },
  }));
};


export const setSearchQuery = (value: string) => {
  useFilterStore.setState((state) => ({
    selected: { ...state.selected, query: value },
  }));
};