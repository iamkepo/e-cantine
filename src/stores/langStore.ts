import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { translations } from "../helpers/translations";

interface LangApp {
  lang: string;
  initLang: () => void;
}

const myMiddlewares = <T extends object>(f: StateCreator<T>) => persist(f, { name: 'langStore' });

export const useLangStore = create<LangApp>()(
  myMiddlewares((set) => ({
    lang: 'fr',
    initLang: () => set(() => ({ lang: 'fr'})),
  })),
);

export const changeLang = (item: string) =>{
  useLangStore.setState(() => ({ lang: item }))
  translateElements()
}
export const autoTranslate = (key: string): string => {
  if (!key) return '';
  const { lang } = useLangStore.getState(); // Get the current language from the store

  return translations[key][lang] || key;
};

export const translate = (key: string, current: string): string => {
  if (!key) return '';

  return translations[key][current] || key;
};

export const translateElements = () => {  
  const { lang } = useLangStore.getState(); // Get the current language from the store

  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (key) {
      element.textContent = translate(key, lang);
    }
  });
};
