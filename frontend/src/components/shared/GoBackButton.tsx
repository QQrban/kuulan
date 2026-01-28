'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function GoBackButton({
  href,
  labelKey = 'shared.back',
}: {
  href: string;
  labelKey?: string;
}) {
  const t = useTranslations();

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-(--brand-1) font-medium"
      aria-label={t(labelKey)}
    >
      <ArrowLeft size={18} strokeWidth={2.5} />
      <span className="text-lg">{t(labelKey)}</span>
    </Link>
  );
}
