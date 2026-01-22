import Image from 'next/image';
import gameExample from '@/../public/game-example.png';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

export default function Benefits() {
  const t = useTranslations('main_page.benefits');

  const benefitKeys = ['games', 'age', 'voice', 'progress', 'updates'] as const;
  return (
    <section className="mt-5 max-w-6xl mx-auto flex flex-col items-center px-6">
      <div className="flex gap-8 items-center flex-wrap justify-center">
        <div className="min-[380px]:w-96 sm:min-w-145 sm:max-w-145">
          <Image src={gameExample} alt="example game"></Image>
        </div>
        <div>
          <h3 className="text-2xl min-[340px]:text-3xl">
            {t.rich('title', {
              purple: (chunks) => (
                <span className="text-(--brand-1)">{chunks}</span>
              ),
              pink: (chunks) => (
                <span className="text-(--brand-2)">{chunks}</span>
              ),
              muted: (chunks) => (
                <span className="text-(--text-muted)">{chunks}</span>
              ),
            })}
          </h3>
          <ul className="mt-4 space-y-4">
            {benefitKeys.map((key) => (
              <li key={key} className="flex gap-3 items-center">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </span>
                <span className="text-(--text-muted) text-[14px] min-[450px]:text-[17px]">
                  {t(`items.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
