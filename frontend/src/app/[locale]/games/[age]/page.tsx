'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CategoryPills } from '@/components/games/CategoryPills';

type Category = { id: string; name: string; age: number };

export default function Page() {
  const params = useParams<{ locale: string; age: string }>();
  const t = useTranslations('games.list');
  const age = params.age;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?age=${age}`,
        { cache: 'no-store' }
      );
      const data = (await res.json()) as Category[];
      setCategories(data);
      setLoading(false);
    };

    void load();
  }, [age]);

  return (
    <div className="mx-auto max-w-6xl px-3 mt-6">
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
        <CategoryPills categories={categories} />
      )}
    </div>
  );
}
