import Image from 'next/image';
import kuulan from '@/../public/kuulan.jpg';
import { useTranslations } from 'next-intl';
import Logo from '@/components/shared/Logo';
import { Heart, Mail } from 'lucide-react';
import FooterLinks from './FooterLinks';

export default function Footer() {
  const t = useTranslations('main_page');

  const categories = ['letters', 'numbers', 'shapes', 'world'];
  const parents = [
    'about_platform',
    'learning_method',
    'faq',
    'privacy_policy',
  ];

  return (
    <footer className="mt-24 flex flex-col items-center">
      <div className="px-3 flex flex-col items-center">
        <div className="w-full min-[818px]:w-3xl rounded-4xl overflow-hidden">
          <Image src={kuulan} alt="kuulan cubes on the grass"></Image>
        </div>
      </div>
      <p className="px-3 text-sm min-[460px]:text-md text-(--text-muted) mt-3">
        {t('footer.slogan_main')}
      </p>
      <div className="mt-10 w-full bg-linear-to-br from-(--brand-1) via-(--brand-2) to-blue-400 opacity-90 p-3">
        <div className="max-w-6xl mx-auto mt-3 flex gap-8 lg:gap-18 items-center flex-col lg:flex-row">
          <div className="flex lg:flex-col gap-4 max-w-120 lg:max-w-67.5">
            <div className="bg-white flex w-47 h-18 p-2 rounded-4xl">
              <Logo />
            </div>
            <p className="text-white tracking-wide text-sm leading-6 hidden min-[480px]:block">
              {t('footer.description')}
            </p>
          </div>
          <div className="flex w-full justify-center md:justify-between flex-wrap items-center md:items-start">
            <FooterLinks
              title={t('footer.categories')}
              ariaLabel="Categories"
              items={categories}
              getLabel={(category) => t(`categories.cards.${category}.title`)}
            />

            <FooterLinks
              title={t('footer.parents.title')}
              ariaLabel="Parents"
              items={parents}
              getLabel={(item) => t(`footer.parents.${item}`)}
            />

            <div className="text-white self-start min-[480px]:h-40 text-center min-[480px]:text-start">
              <p className="font-bold">{t('footer.contact_us')}</p>
              <a
                href="mailto:kurban.ramazanovv@gmail.com"
                className="mt-2 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
              >
                <Mail className="h-4 w-4" />
                kurban.ramazanovv@gmail.com
              </a>
            </div>
          </div>
        </div>
        <hr className="mt-5 opacity-80 max-w-6xl mx-auto" />
        <div className="max-w-6xl mx-auto mt-3 flex justify-between gap-2 flex-col min-[480px]:flex-row items-center">
          <div className="text-white/50 text-sm">
            © 2026 Kuulan. {t('footer.rights_reserved')}
          </div>
          <p className="inline-flex items-center gap-1 text-sm text-white/80">
            {t('footer.made_with')} <Heart className="h-4 w-4 fill-current" />{' '}
            {t('footer.for_kids')}
          </p>
        </div>
      </div>
    </footer>
  );
}
