import { useTranslations } from 'next-intl';
import { Heart, Mail } from 'lucide-react';
import NavLinks from '@/components/header/NavLinks';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="mt-12 w-full bg-linear-to-br from-(--brand-1) via-(--brand-2) to-blue-400 opacity-90">
      <div className="mx-auto max-w-6xl px-3 pt-1 pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-white/90 [&_a]:text-white/90 [&_a:hover]:text-white">
            <NavLinks />
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-right text-white">
              <p className="font-bold text-sm">{t('contact_us')}</p>
              <a
                href="mailto:kurban.ramazanovv@gmail.com"
                className="mt-1 inline-flex items-center justify-center sm:justify-end gap-2 text-xs text-white/80 hover:text-white transition"
              >
                <Mail className="h-4 w-4" />
                kurban.ramazanovv@gmail.com
              </a>
            </div>
          </div>
        </div>

        <hr className="mt-2 opacity-30" />

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-white/60 text-xs">
            © 2026 Kuulan. {t('rights_reserved')}
          </div>

          <p className="inline-flex items-center gap-1 text-xs text-white/80">
            {t('made_with')} <Heart className="h-3.5 w-3.5 fill-current" />{' '}
            {t('for_kids')}
          </p>
        </div>
      </div>
    </footer>
  );
}
