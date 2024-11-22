import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  theme: string;
  init: () => void;
};

const myMiddlewares = <T extends object>(f: StateCreator<T>) => persist(f, { name: 'appStore' });

export const useAppStore = create<State>()(
  myMiddlewares((set) => ({
    theme: "light",
    init: () => set(() => ({ theme: 'light' })),
  })),
);

export const toggleTheme = () => {
  const { theme } = useAppStore.getState();
  const newTheme = theme === "dark" ? "light" : "dark";
  useAppStore.setState({ theme: newTheme });
};