import { ReactNode } from 'react';

type ButtonProps = {
  icon?: ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  icon,
  label,
  className,
  onClick,
}: ButtonProps) {
  const classes = [
    'inline-flex items-center gap-3 rounded-full px-5 py-2 text-base font-semibold text-white',
    'bg-[linear-gradient(135deg,var(--brand-1),var(--brand-2))] shadow-[0_12px_24px_rgba(160,91,255,0.35)]',
    'transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} onClick={onClick}>
      {icon ? (
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20">
          {icon}
        </span>
      ) : null}
      <span>{label}</span>
    </button>
  );
}
