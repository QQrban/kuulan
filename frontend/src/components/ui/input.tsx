// components/ui/input.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'w-full h-14 rounded-2xl border-2 bg-white/70 px-12 text-[16px] text-(--text-main) shadow-sm outline-none transition',
        'border-[color-mix(in_oklab,var(--brand-1)_35%,white)]',
        'focus:border-[color-mix(in_oklab,var(--brand-1)_75%,white)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--brand-1)_18%,transparent)]',
        'placeholder:text-(--text-muted) disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
}

export { Input };
