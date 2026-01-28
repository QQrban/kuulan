import AgeCard from '@/components/games/AgeCard';
import twoYears from '../../../../public/child_age/2years.jpg';
import sevenYears from '../../../../public/child_age/7years.jpg';
import sixYears from '../../../../public/child_age/6years.jpg';
import threeYears from '../../../../public/child_age/3years.jpg';
import fourYears from '../../../../public/child_age/4years.jpg';
import fiveYears from '../../../../public/child_age/5years.jpg';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const cards = [
  {
    ageSlug: 2,
    ageKey: 'select_age.card.twoYears.age',
    titleKey: 'select_age.card.twoYears.title',
    image: twoYears,
    borderColor: 'var(--accent-green)',
    accentColor: 'var(--accent-green)',
    bgColor: 'var(--bg-green)',
  },
  {
    ageSlug: 3,
    ageKey: 'select_age.card.threeYears.age',
    titleKey: 'select_age.card.threeYears.title',
    image: threeYears,
    borderColor: 'var(--accent-blue)',
    accentColor: 'var(--accent-blue)',
    bgColor: 'var(--bg-blue)',
  },
  {
    ageSlug: 4,
    ageKey: 'select_age.card.fourYears.age',
    titleKey: 'select_age.card.fourYears.title',
    image: fourYears,
    borderColor: 'var(--accent-purple)',
    accentColor: 'var(--accent-purple)',
    bgColor: 'var(--bg-purple)',
  },
  {
    ageSlug: 5,
    ageKey: 'select_age.card.fiveYears.age',
    titleKey: 'select_age.card.fiveYears.title',
    image: fiveYears,
    borderColor: 'var(--accent-rose)',
    accentColor: 'var(--accent-rose)',
    bgColor: 'var(--bg-rose)',
  },
  {
    ageSlug: 6,
    ageKey: 'select_age.card.sixYears.age',
    titleKey: 'select_age.card.sixYears.title',
    image: sixYears,
    borderColor: 'var(--yellow-300)',
    accentColor: 'var(--chart-4)',
    bgColor: 'var(--bg-yellow)',
  },
  {
    ageSlug: 7,
    ageKey: 'select_age.card.sevenYears.age',
    titleKey: 'select_age.card.sevenYears.title',
    image: sevenYears,
    borderColor: 'var(--accent-green)',
    accentColor: 'var(--accent-green)',
    bgColor: 'var(--bg-green)',
  },
];

export default function GamesPage() {
  const t = useTranslations('games');

  return (
    <div className="mx-auto max-w-6xl px-3 mt-8">
      <h1 className="text-center text-4xl">
        {t.rich('select_age.title', {
          purple: (chunks) => (
            <span className="text-(--brand-1)">{chunks}</span>
          ),
          rose: (chunks) => <span className="text-(--brand-2)">{chunks}</span>,
        })}
      </h1>

      <div className="mt-8 grid gap-6 min-[678px]:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {cards.map((card) => (
          <Link
            key={card.ageKey}
            href={`/games/${card.ageSlug}`}
            className="block"
          >
            <AgeCard
              ageLabel={t(card.ageKey)}
              title={t(card.titleKey)}
              image={card.image}
              borderColor={card.borderColor}
              accentColor={card.accentColor}
              bgColor={card.bgColor}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
