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
import { mockGames } from '@/components/games/mock';

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
type Category = { id: string; name: string; age: number };

export function CategoryPills({ categories }: { categories: Category[] }) {
  const t = useTranslations('games.list');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 mt-8">
      {categories.map((c) => {
        const meta = pillMeta[c.name];
        if (!meta) return null;

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

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full rounded-3xl p-4">
              {mockGames.map((game) => (
                <GameCard
                  bgColor={meta.bgColor}
                  key={game.id}
                  title={game.title}
                  icon={game.icon}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
