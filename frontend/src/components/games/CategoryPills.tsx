import {
  ArrowLeftRight,
  BookOpen,
  Hash,
  Home,
  Move,
  Music,
  Palette,
  PawPrint,
  Puzzle,
  Shapes,
  Smile,
  Volume2,
} from 'lucide-react';
import CategoryPill from './CategoryPill';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import GameCard from '@/components/games/GameCard';
import { Category, Game } from '@/types/games';
import Link from 'next/link';

const pillMeta: Record<
  string,
  { icon: JSX.Element; bgColor: string; borderColor: string }
> = {
  colors: {
    icon: <Palette size={26} strokeWidth={2.5} />,
    bgColor: 'var(--bg-rose)',
    borderColor: 'var(--accent-rose)',
  },
  shapes: {
    icon: <Shapes size={26} strokeWidth={2.5} />,
    bgColor: 'var(--bg-purple)',
    borderColor: 'var(--accent-purple)',
  },
  sounds: {
    icon: <Volume2 size={26} strokeWidth={2.5} />,
    bgColor: 'var(--bg-blue)',
    borderColor: 'var(--accent-blue)',
  },
  movement: {
    icon: <Move size={26} strokeWidth={2.5} />,
    bgColor: 'var(--bg-green)',
    borderColor: 'var(--accent-green)',
  },
  sorting: {
    icon: <ArrowLeftRight size={26} strokeWidth={2.5} />,
    bgColor: 'var(--bg-purple)',
    borderColor: 'var(--accent-purple)',
  },
  puzzles: {
    icon: <Puzzle size={26} strokeWidth={2.5} />,
    bgColor: 'var(--bg-rose)',
    borderColor: 'var(--accent-rose)',
  },
  animals: {
    icon: <PawPrint size={26} strokeWidth={2.5} />,
    bgColor: 'var(--bg-green)',
    borderColor: 'var(--accent-green)',
  },
  everyday: {
    icon: <Home size={26} strokeWidth={2.5} />,
    bgColor: 'var(--bg-blue)',
    borderColor: 'var(--accent-blue)',
  },
  music: {
    icon: <Music size={26} strokeWidth={2.5} />,
    bgColor: 'var(--bg-purple)',
    borderColor: 'var(--accent-purple)',
  },
  emotions: {
    icon: <Smile size={26} strokeWidth={2.5} />,
    bgColor: 'var(--bg-rose)',
    borderColor: 'var(--accent-rose)',
  },
  alphabet: {
    icon: <BookOpen size={26} strokeWidth={2.5} />,
    bgColor: 'var(--bg-yellow)',
    borderColor: 'var(--chart-5)',
  },
  numbers: {
    icon: <Hash size={26} strokeWidth={2.5} />,
    bgColor: 'var(--bg-yellow)',
    borderColor: 'var(--chart-5)',
  },
};

export function CategoryPills({
  categories,
  gamesByCategory,
  age,
}: {
  categories: Category[];
  gamesByCategory: Record<string, Game[]>;
  age: number;
}) {
  const t = useTranslations('games.list');
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-2 mt-8">
      {categories.map((c) => {
        const meta = pillMeta[c.name];
        if (!meta) return null;

        const games = gamesByCategory[c.id] ?? [];
        const topGames = games.slice(0, 4);
        const hasMore = games.length > 4;

        return (
          <div
            key={c.id}
            className="flex flex-col items-center gap-2 w-full max-w-sm"
          >
            <CategoryPill
              label={t(`categories.${c.name}.title`)}
              icon={meta.icon}
              bgColor={meta.bgColor}
              borderColor={meta.borderColor}
            />

            <div className="p-4 flex flex-wrap justify-center gap-4 w-full">
              {topGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${age}/${game.name}/guess_by_shadow`}
                  className="block"
                >
                  <GameCard
                    bgColor={meta.bgColor}
                    title={t(game.titleKey)}
                    icon={`/game_thumbs/${game.iconKey}.svg`}
                  />
                </Link>
              ))}
            </div>

            {hasMore && (
              <Link
                href={`/games/category/${c.id}`}
                className="text-sm font-medium underline text-(--text-muted) hover:text-(--brand-1)"
              >
                {t('see_all', { defaultValue: 'Смотреть все' })}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
