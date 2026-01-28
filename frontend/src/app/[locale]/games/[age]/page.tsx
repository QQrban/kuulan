'use client';

import { useEffect, useMemo, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CategoryPills } from '@/components/games/CategoryPills';
import { Category, Game } from '@/types/games';
import GoBackButton from '@/components/shared/GoBackButton';

const VALID_AGES = [2, 3, 4, 5, 6, 7];

export default function Page() {
  const params = useParams<{ locale: string; age: string }>();
  const t = useTranslations('games.list');
  const age = Number(params.age);

  if (isNaN(age) || !VALID_AGES.includes(age)) {
    notFound();
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const [catRes, gamesRes] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?age=${age}`,
          {
            cache: 'no-store',
          }
        ),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/games?age=${age}`, {
          cache: 'no-store',
        }),
      ]);

      const cats = (await catRes.json()) as Category[];
      const gs = (await gamesRes.json()) as Game[];

      setCategories(cats);
      setGames(gs);
      setLoading(false);
    };

    void load();
  }, [age]);

  const gamesByCategory = useMemo(() => {
    const map: Record<string, Game[]> = {};
    for (const g of games) {
      (map[g.categoryId] ??= []).push(g);
    }
    return map;
  }, [games]);

  return (
    <div className="mx-auto max-w-6xl px-3 mt-6">
      <GoBackButton href="/games" />
      <h1 className="text-center text-4xl font-semibold text-(--brand-1)">
        {t.rich('title', {
          blue: (chunks) => <span className="text-blue-500">{chunks}</span>,
          age,
        })}
      </h1>

      <p className="mt-2 text-center text-base text-(--text-muted)">
        {t('description', { age })}
      </p>

      {loading ? (
        <div className="mt-8 text-center text-(--text-muted)">Loading...</div>
      ) : (
        <CategoryPills
          categories={categories}
          gamesByCategory={gamesByCategory}
        />
      )}
    </div>
  );
}
