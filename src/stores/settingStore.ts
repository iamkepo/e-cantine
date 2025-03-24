import { create } from "zustand";
  
type StateApp = {
  budget: 'normal' | 'vip',
  counter: number,
  type: 'classic' | 'vegetalien'
  initApp: () => void;
};
  
const initState = {
  budget: 'normal',
  counter: 2,
  type: 'classic'
} as StateApp;

export const useSettingStore = create<StateApp>((set) => ({
  ...initState,
  initApp: () => set(() => initState),
}));

export const handleSetting = (field: string, value: unknown) => {
  if (field === 'counter') {
    const newCount = Math.max(1, value as number);
    useSettingStore.setState((state) => ({ ...state, counter: newCount }));
  } else {
    useSettingStore.setState((state) => ({ ...state, [field]: value }));
  }
};