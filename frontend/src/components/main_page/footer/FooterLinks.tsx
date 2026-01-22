import React from 'react';

type FooterLinksProps = {
  title: string;
  ariaLabel: string;
  items: string[];
  getLabel: (key: string) => string;
  getHref?: (key: string) => string;
  className?: string;
};

export default function FooterLinks({
  title,
  ariaLabel,
  items,
  getLabel,
  getHref = () => '#',
  className = '',
}: FooterLinksProps) {
  return (
    <div
      className={`text-white min-w-57 max-w-57 ${className} h-40 text-center min-[480px]:text-start`}
    >
      <div className="font-bold tracking-wide">{title}</div>
      <nav
        className="flex flex-col mt-3 gap-1.5 tracking-wide"
        aria-label={ariaLabel}
      >
        {items.map((key) => (
          <a className="text-sm" key={key} href={getHref(key)}>
            {getLabel(key)}
          </a>
        ))}
      </nav>
    </div>
  );
}
