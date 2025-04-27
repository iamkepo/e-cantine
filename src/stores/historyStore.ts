import { create, StateCreator } from "zustand";
import { History, PlanningEvent } from '../core/types';
import { persist } from "zustand/middleware";

type HistoryStore = {
  history: History[] | undefined;
  initApp: () => void;
};

const initState = {
  history: undefined,
  initApp: () => {},
} as HistoryStore;
const myMiddlewares = <T extends object>(f: StateCreator<T>) => persist(f, { name: 'historyStore' });

export const useHistoryStore = create<HistoryStore>()(
  myMiddlewares((set) => ({
    ...initState,
    initApp: () => set(() => initState),
  })),
);

export const getHistory = () => {
  const { history } = useHistoryStore.getState();
  return history || [];
};
export const getEventsByDate = (date: string) => {
  const { history } = useHistoryStore.getState();
  let list: PlanningEvent[] = [];
  if (history) {
    list = history.map(item => item.events).flat();
  }
  return list.filter(event => event.date === date);
};

export const addHistory = (history: History) => {
  useHistoryStore.setState((state) => ({
    history: [...(state.history || []), history]
  }));
};

export const removeHistory = (index: number) => {
  useHistoryStore.setState((state) => ({
    history: state.history?.filter((_, i) => i !== index)
  }));
};