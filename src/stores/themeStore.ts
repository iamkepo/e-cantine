import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  theme: string;
  init: () => void;
};

const myMiddlewares = <T extends object>(f: StateCreator<T>) => persist(f, { name: 'themeStore' });

export const useThemeStore = create<State>()(
  myMiddlewares((set) => ({
    theme: "light",
    init: () => set(() => ({ theme: 'light' })),
  })),
);

export const toggleTheme = () => {
  const { theme } = useThemeStore.getState();
  const newTheme = theme === "dark" ? "light" : "dark";
  useThemeStore.setState({ theme: newTheme });
};