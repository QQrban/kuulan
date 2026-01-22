import { useTranslations } from 'next-intl';
import { CategoryCard } from '@/components/main_page/categories/CategoryCard';
import { BookOpen, Calculator, Globe, Shapes } from 'lucide-react';

export default function Categories() {
  const t = useTranslations('main_page.categories');

  return (
    <section className="py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 text-center">
        <h2 className="text-5xl tracking-wide">
          {t.rich('title', {
            blue: (chunks) => <span className="text-blue-500">{chunks}</span>,
            purple: (chunks) => (
              <span className="text-(--brand-1)">{chunks}</span>
            ),
          })}
        </h2>

        <p className="mt-5 max-w-2xl text-lg tracking-wide text-(--text-muted)">
          {t('subtitle')}
        </p>

        <div className="mt-14 grid w-full justify-items-center gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            icon={<BookOpen size={26} strokeWidth={2.5} />}
            accentColor="#A855F7"
            tintColor="#F3E8FF"
            title={t('cards.letters.title')}
            description={t('cards.letters.description')}
            countText={t('cards.letters.count', { count: 15 })}
            ctaText={t('cards.letters.cta')}
          />

          <CategoryCard
            icon={<Calculator size={26} strokeWidth={2.5} />}
            accentColor="#EC4899"
            tintColor="#FCE7F3"
            title={t('cards.numbers.title')}
            description={t('cards.numbers.description')}
            countText={t('cards.numbers.count', { count: 12 })}
            ctaText={t('cards.numbers.cta')}
          />

          <CategoryCard
            icon={<Shapes size={26} strokeWidth={2.5} />}
            accentColor="#3B82F6"
            tintColor="#DBEAFE"
            title={t('cards.shapes.title')}
            description={t('cards.shapes.description')}
            countText={t('cards.shapes.count', { count: 10 })}
            ctaText={t('cards.shapes.cta')}
          />

          <CategoryCard
            icon={<Globe size={26} strokeWidth={2.5} />}
            accentColor="#22C55E"
            tintColor="#DCFCE7"
            title={t('cards.world.title')}
            description={t('cards.world.description')}
            countText={t('cards.world.count', { count: 18 })}
            ctaText={t('cards.world.cta')}
          />
        </div>
      </div>
    </section>
  );
}
