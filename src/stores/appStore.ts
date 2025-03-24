import { create } from "zustand";

type ToastType = 'success' | 'danger' | 'primary' | null;
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

type StateApp = {
  toast: {
    type: ToastType;
    show: boolean;
    message: string | null;
  };
  modal: {
    show: boolean;
    body: React.ReactNode;
    size: ModalSize;
  };
  initApp: () => void;
};

const initState = {
  toast: { type: null, show: false, message: null },
  modal: { show: false, body: null, size: 'md' as ModalSize },
} as StateApp;

export const useAppStore = create<StateApp>((set) => ({
  ...initState,
  initApp: () => set(() => initState),
}));

// Toast
const showToast = (type: Exclude<ToastType, null>, message: string) => {
  useAppStore.setState({ toast: { type, message, show: true } });

  setTimeout(() => {
    closeToast();
  }, 4000);
};

export const toast = {
  primary: (message: string) => showToast('primary', message),
  success: (message: string) => showToast('success', message),
  danger: (message: string) => showToast('danger', message),
};

export const closeToast = () => useAppStore.setState({ toast: initState.toast });

// Modal
const showModal = (body: React.ReactNode, size: ModalSize = 'md') => {
  useAppStore.setState({ modal: { show: true, body, size } });
};

export const modal = {
  open: showModal,
  close: () => useAppStore.setState({ modal: initState.modal }),
};