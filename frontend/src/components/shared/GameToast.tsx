'use client';

import { useGameToast } from '@/store/gameToast';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import success from '@/../public/icons/success.svg';
import think from '@/../public/icons/think.svg';
import Image from 'next/image';

export default function GameToast() {
  const toast = useGameToast((s) => s.toast);
  const hide = useGameToast((s) => s.hide);
  const pathname = usePathname();

  useEffect(() => {
    hide();
  }, [pathname, hide]);

  if (!toast?.open) return null;

  const isSuccess = toast.variant === 'success';

  const containerClass = isSuccess
    ? 'border-(--accent-green) bg-(--bg-green) text-(--accent-green)'
    : 'border-[var(--chart-4)] bg-yellow-100 text-[var(--foreground)]';

  const buttonClass = isSuccess
    ? 'bg-white text-green-700'
    : 'bg-white/70 text-[var(--foreground)] border-2 border-[var(--chart-4)]';

  return (
    <div className="fixed inset-x-0 bottom-3 sm:bottom-4 z-50 flex justify-center px-2 sm:px-3">
      <div
        role="status"
        aria-live="polite"
        className={[
          'w-[min(920px,calc(100vw-16px))] sm:w-[min(920px,calc(100vw-24px))]',
          'flex flex-col min-[401px]:flex-row items-center justify-between gap-4 sm:gap-6',
          'rounded-[22px] sm:rounded-[28px] lg:rounded-[36px]',
          'border-4 sm:border-[5px] lg:border-[6px]',
          'shadow-xl',
          'p-4 sm:p-6 lg:p-7',

          containerClass,
        ].join(' ')}
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div>
            {isSuccess ? (
              <Image width={50} height={50} src={success} alt="success" />
            ) : (
              <Image width={50} height={50} src={think} alt="try again" />
            )}
          </div>

          <div>
            <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
              {toast.title}
            </div>
            {toast.subtitle && (
              <div
                className={
                  isSuccess
                    ? 'text-base sm:text-xl md:text-3xl lg:text-3xl font-bold opacity-95'
                    : 'text-sm sm:text-lg md:text-2xl lg:text-2xl font-semibold opacity-90'
                }
              >
                {toast.subtitle}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className={[
            'w-30 min-[535px]:w-60 cursor-pointer hover:-translate-y-0.5',
            'shrink-0',
            'rounded-[18px] sm:rounded-[22px] lg:rounded-[28px]',
            'px-5 py-3 sm:px-7 sm:py-4 md:px-10 md:py-5 lg:px-10 lg:py-6',
            'text-base sm:text-xl md:text-2xl lg:text-4xl font-extrabold',
            'shadow-lg',
            'active:scale-[0.99] transition',
            buttonClass,
          ].join(' ')}
          onClick={() => {
            const fn = toast.onPrimary;
            hide();
            fn?.();
          }}
        >
          {toast.primaryLabel}
        </button>
      </div>
    </div>
  );
}
