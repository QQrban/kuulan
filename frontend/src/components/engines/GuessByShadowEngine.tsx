'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useGameToast } from '@/store/gameToast';
import GameToast from '@/components/shared/GameToast';

type Item = {
  id: string;
  shadow: string;
  correct: string;
  choices: string[];
  correctWord: string;
};

type Result = 'idle' | 'wrong' | 'correct';

export default function GuessByShadowEngine({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<Result>('idle');
  const [finished, setFinished] = useState(false);

  const toast = useGameToast();

  const t = useTranslations('games.list');

  const item = items[index];

  if (!item) return null;

  const isLast = index === items.length - 1;

  const pick = (choice: string) => {
    if (finished) return;
    if (selected) return;

    setSelected(choice);

    if (choice === item.correct) {
      setResult('correct');
      toast.success({
        title: 'Ура! Правильно!',
        subtitle: `Это ${item.correctWord}!`,
        onPrimary: () => {
          setIndex((i) => i + 1);
          setSelected(null);
          setResult('idle');
        },
      });
    } else {
      setResult('wrong');
      toast.warning({
        title: 'Попробуй ещё раз!',
        subtitle: 'У тебя всё получится!',
        onPrimary: () => {
          setSelected(null);
          setResult('idle');
        },
      });
      window.setTimeout(() => {
        setSelected(null);
        setResult('idle');
        toast.hide();
      }, 2000);
    }
  };

  const buttonClass = (choice: string) => {
    const base =
      'border shadow-md mt-6 rounded-3xl transition cursor-pointer hover:-translate-y-1';

    if (!selected) return base;

    if (result === 'correct') {
      return choice === selected
        ? `${base} outline-3 outline-(--accent-green)`
        : `${base} border-transparent`;
    }

    if (result === 'wrong') {
      if (choice === selected)
        return `${base} outline-3 outline-(--destructive)`;
      return `${base} border-transparent`;
    }

    return base;
  };

  return (
    <div className="relative flex flex-col items-center pt-6 px-3">
      <h1 className="text-3xl text-(--brand-1)">
        {t('games.animal_shadows.title')}
      </h1>
      <span className="mt-2 text-(--text-muted)">
        {t('games.animal_shadows.description')}
      </span>
      <div className="relative border shadow-md mt-2 rounded-3xl flex items-center gap-1 flex-col">
        {result === 'correct' ? (
          <Image width={220} height={200} src={item.correct} alt="shadow" />
        ) : (
          <Image width={220} height={200} src={item.shadow} alt="shadow" />
        )}
        <span className="absolute bottom-5 text-xl font-semibold">
          {result === 'correct' ? item.correctWord : 'Кто это?'}
        </span>
      </div>

      <div className="flex gap-4">
        {item.choices.map((c) => (
          <button
            key={c}
            onClick={() => pick(c)}
            type="button"
            className={buttonClass(c)}
            disabled={finished}
          >
            <Image width={220} height={250} src={c} alt="animal" />
          </button>
        ))}
      </div>
      <GameToast />
    </div>
  );
}
