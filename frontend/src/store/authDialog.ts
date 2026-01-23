import { create } from 'zustand';

type AuthDialogState = {
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  open: () => void;
  close: () => void;
};

export const useAuthDialog = create<AuthDialogState>((set) => ({
  isOpen: false,
  setOpen: (v) => set({ isOpen: v }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
