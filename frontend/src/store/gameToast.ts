import { create } from 'zustand';

export type GameToastVariant = 'success' | 'warning';

export type GameToastPayload = {
  variant: GameToastVariant;
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  onPrimary?: () => void;
};

type GameToastState = {
  toast: (GameToastPayload & { open: true }) | null;
  show: (p: GameToastPayload) => void;
  success: (p: Omit<GameToastPayload, 'variant'>) => void;
  warning: (p: Omit<GameToastPayload, 'variant'>) => void;
  hide: () => void;
};

export const useGameToast = create<GameToastState>((set) => ({
  toast: null,

  show: (p) =>
    set({
      toast: {
        open: true,
        ...p,
        primaryLabel:
          p.primaryLabel ?? (p.variant === 'success' ? 'Далее →' : 'Ок'),
      },
    }),

  success: (p) =>
    set({
      toast: {
        open: true,
        variant: 'success',
        title: p.title,
        subtitle: p.subtitle,
        primaryLabel: p.primaryLabel ?? 'Далее →',
        onPrimary: p.onPrimary,
      },
    }),

  warning: (p) =>
    set({
      toast: {
        open: true,
        variant: 'warning',
        title: p.title,
        subtitle: p.subtitle,
        primaryLabel: p.primaryLabel ?? 'Ок',
        onPrimary: p.onPrimary,
      },
    }),

  hide: () => set({ toast: null }),
}));
