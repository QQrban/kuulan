import { useTranslations } from 'next-intl';
import { SkillCard } from '@/components/main_page/skills/SkillCard';
import { Brain, Heart, Music2, Palette } from 'lucide-react';

export default function Skills() {
  const t = useTranslations('main_page.skills');
  return (
    <div className="flex flex-col items-center justify-center text-center bg-[#fcf2fb] py-14">
      <h2 className="text-5xl tracking-wide">
        {t.rich('title', {
          purple: (chunks) => (
            <span className="text-(--brand-1)">{chunks}</span>
          ),
          green: (chunks) => <span className="text-(--brand-2)">{chunks}</span>,
        })}
      </h2>
      <p className="mt-5 text-lg max-w-2xl text-(--text-muted) tracking-wide">
        {t('subtitle')}
      </p>
      <section className="mx-auto max-w-6xl px-3 mt-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <SkillCard
            accentColor="var(--brand-1)"
            icon={<Brain size={34} strokeWidth={2.5} />}
            title={t('cards.logic.title')}
            description={t('cards.logic.description')}
          />
          <SkillCard
            accentColor="var(--brand-2)"
            icon={<Heart size={34} strokeWidth={2.5} />}
            title={t('cards.emotional.title')}
            description={t('cards.emotional.description')}
          />
          <SkillCard
            accentColor="var(--color-blue-300)"
            icon={<Palette size={34} strokeWidth={2.5} />}
            title={t('cards.creativity.title')}
            description={t('cards.creativity.description')}
          />
          <SkillCard
            accentColor="var(--yellow-300)"
            icon={<Music2 size={34} strokeWidth={2.5} />}
            title={t('cards.music.title')}
            description={t('cards.music.description')}
          />
        </div>
      </section>
    </div>
  );
}
