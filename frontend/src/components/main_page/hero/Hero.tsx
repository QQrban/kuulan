import HeroBackground from '@/components/main_page/hero/HeroBackground';
import { useLocale, useTranslations } from 'next-intl';
import { Play } from 'lucide-react';
import { ButtonWrapper } from '@/components/ui/ButtonWrapper';
import { AgeBadge } from '@/components/shared/ageBadge';
import Image from 'next/image';
import bear from '@/../public/bear.png';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('main_page.hero');
  return (
    <div className="relative min-h-150 flex flex-col items-center justify-center text-center">
      <HeroBackground />
      <div className="absolute bottom-1 min-[450px]:left-50 w-37.5">
        <Image src={bear} alt="bear" />
      </div>
      <AgeBadge />
      <div className="relative z-10 flex flex-col gap-6 max-w-3xl px-6 mt-6">
        <h1 className="text-4xl sm:text-6xl text-white leading-14 sm:leading-18 max-w-2xl">
          {t.rich('title', {
            yellow: (chunks) => (
              <span className="text-yellow-300">{chunks}</span>
            ),
          })}
        </h1>
        <p className="text-white text-lg sm:text-xl leading-9">
          {t('subtitle')}
        </p>
        <div className="flex justify-center gap-6 flex-col sm:flex-row w-75 sm:w-full mx-auto">
          <ButtonWrapper
            onClick={() => router.push(`/${locale}/games`)}
            variant="white"
            size="white"
            icon={<Play size={200} strokeWidth={3} />}
          >
            {t('start')}
          </ButtonWrapper>
          <ButtonWrapper variant="outline" size="outline">
            {t('more')}
          </ButtonWrapper>
        </div>
      </div>
    </div>
  );
}
