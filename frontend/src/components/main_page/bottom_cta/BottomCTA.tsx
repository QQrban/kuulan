import HeroBackground from '@/components/main_page/hero/HeroBackground';
import { useTranslations } from 'next-intl';
import { ButtonWrapper } from '@/components/ui/ButtonWrapper';
import { Play } from 'lucide-react';
import { useAuthDialog } from '@/store/authDialog';

export default function BottomCTA() {
  const t = useTranslations('main_page.bottom_cta');
  const openDialog = useAuthDialog((s) => s.open);

  return (
    <section className="max-w-6xl mx-auto text-center px-3 mt-12">
      <div className="w-full h-100 relative rounded-4xl overflow-hidden flex flex-col items-center justify-center px-3">
        <HeroBackground />
        <div className="flex flex-col gap-8 max-w-4xl">
          <h1 className="text-white text-3xl md:text-5xl leading-13 sm:leading-18">
            {t('title')}
          </h1>
          <p className="text-white text-md md:text-xl leading-6 sm:leading-8">
            {t('subtitle')}
          </p>
          <div>
            <ButtonWrapper
              onClick={() => openDialog()}
              variant="white"
              size="white"
              icon={<Play size={200} strokeWidth={3} />}
            >
              {t('button')}
            </ButtonWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
