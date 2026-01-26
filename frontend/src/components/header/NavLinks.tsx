import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function NavLinks() {
  const t = useTranslations('header');

  return (
    <nav className="flex items-center gap-7 lg:gap-10 text-base font-medium text-(--text-muted) md:flex">
      <Link
        className="transition-colors hover:text-(--text-main)"
        href="/games"
      >
        {t('nav.games')}
      </Link>
      <a className="transition-colors hover:text-(--text-main)" href="#">
        {t('nav.parents')}
      </a>
      <a className="transition-colors hover:text-(--text-main)" href="#">
        {t('nav.contacts')}
      </a>
      <a className="transition-colors hover:text-(--text-main)" href="#">
        {t('nav.about')}
      </a>
    </nav>
  );
}
