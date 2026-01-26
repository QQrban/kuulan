import Hero from '@/components/main_page/hero/Hero';
import Skills from '@/components/main_page/skills/Skills';
import Categories from '@/components/main_page/categories/Categories';
import Benefits from '@/components/main_page/benefits/Benefits';
import BottomCTA from '@/components/main_page/bottom_cta/BottomCTA';
import Image from 'next/image';
import kuulan from '@/../public/kuulan.jpg';
import { useTranslations } from 'next-intl';

export default function MainPage() {
  const t = useTranslations('main_page');

  return (
    <div>
      <Hero />
      <Skills />
      <Categories />
      <Benefits />
      <BottomCTA />
      <div className="px-3 flex flex-col items-center mt-14">
        <div className="w-full min-[818px]:w-3xl rounded-4xl overflow-hidden">
          <Image src={kuulan} alt="kuulan cubes on the grass" />
        </div>
        <p className="px-3 text-sm min-[460px]:text-md text-(--text-muted) mt-3">
          {t('slogan_main')}
        </p>
      </div>
    </div>
  );
}
