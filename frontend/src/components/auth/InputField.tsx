import { ReactNode } from 'react';

export default function InputField({
  label,
  icon,
  hint,
  error,
  children,
}: {
  label: string;
  icon: ReactNode;
  hint?: string;
  error?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-(--text-main)">{label}</span>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[color-mix(in_oklab,var(--brand-1)_70%,white)]">
          {icon}
        </span>
        {children}
      </div>

      {hint && (
        <span
          className={[
            'text-[12px] leading-snug',
            error ? 'text-red-500' : 'text-(--text-muted)',
          ].join(' ')}
        >
          {hint}
        </span>
      )}
    </label>
  );
}
