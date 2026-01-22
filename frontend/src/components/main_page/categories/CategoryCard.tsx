import React from 'react';
import { ArrowRight } from 'lucide-react';

type CategoryCardProps = {
  title: string;
  description: string;
  countText: string;
  ctaText: string;
  icon: React.ReactNode;
  accentColor: string;
  tintColor: string;
  onClick?: () => void;
  className?: string;
};

export function CategoryCard({
  title,
  description,
  countText,
  ctaText,
  icon,
  accentColor,
  tintColor,
  onClick,
  className = '',
}: CategoryCardProps) {
  return (
    <div
      className={`flex h-full w-full max-w-96 sm:max-w-none flex-col rounded-3xl p-5 shadow-md hover:shadow-[0_16px_32px_rgba(17,24,39,0.12)] ${className} border-2 border-white`}
      style={{ backgroundColor: tintColor }}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl shadow-md"
        style={{ backgroundColor: accentColor }}
      >
        <div className="text-white">{icon}</div>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-lg h-13 font-semibold leading-tight text-(--text-main)">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-relaxed text-(--text-muted)">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 text-xs">
        <span className="text-(--text-muted)">{countText}</span>

        <button
          type="button"
          onClick={onClick}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white transition-opacity hover:opacity-90 cursor-pointer"
          style={{ backgroundColor: accentColor }}
        >
          {ctaText}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
