import React from 'react';

type PillProps = {
  label: string;
  icon?: React.ReactNode;
  bgColor: string;
  borderColor: string;
  textColor?: string;
  className?: string;
};

export default function CategoryPill({
  label,
  icon,
  bgColor,
  borderColor,
  textColor,
  className = '',
}: PillProps) {
  const color = textColor ?? borderColor;

  return (
    <div
      className={[
        'inline-flex items-center gap-3 rounded-full p-3 lg:px-6 lg:py-4',
        'border-2 shadow-[0_12px_28px_rgba(17,24,39,0.12)]',
        className,
      ].join(' ')}
      style={{ backgroundColor: bgColor, borderColor }}
    >
      {icon && (
        <span className="grid place-items-center" style={{ color }}>
          {icon}
        </span>
      )}
      <span
        className="text-xl min-[854px]:text-2xl font-semibold leading-none"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}
