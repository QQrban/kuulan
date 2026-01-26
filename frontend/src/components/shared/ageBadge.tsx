import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function AgeBadge() {
  const t = useTranslations('main_page.hero');

  return (
    <div className="inline-flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 shadow-[0_18px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm">
      <Sparkles
        className="h-7 w-7 text-yellow-400 animate-pulse"
        strokeWidth={1.5}
      />
      <span className="text-md font-extralight text-violet-500 tracking-wide">
        {t('badge')}
      </span>
    </div>
  );
}
