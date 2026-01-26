import React, { SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, X } from 'lucide-react';
import { ButtonWrapper } from '@/components/ui/ButtonWrapper';
import { useAuthDialog } from '@/store/authDialog';
import { useAuth } from '@/store/auth';
import Logo from '@/components/shared/Logo';
import { Link } from '@/i18n/routing';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function MobileMenu({ isOpen, setIsOpen }: Props) {
  const t = useTranslations('header');
  const openDialog = useAuthDialog((s) => s.open);

  const { isAuthenticated } = useAuth();

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity md:hidden ${
        isOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-72 bg-(--header-bg) p-6 pt-4 shadow-[-10px_0_30px_rgba(0,0,0,0.12)] transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile menu"
      >
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-(--brand-1)">
            <Logo showText={false} />
          </span>
          <button
            type="button"
            className="rounded-md p-2 text-(--text-main) transition-colors hover:bg-(--header-bg)"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          >
            <X strokeWidth={3} size={40} className="text-(--brand-1)" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-4 text-base font-medium text-(--text-muted)">
          <Link
            className="transition-colors hover:text-(--text-main) block md:hidden"
            href="/games"
          >
            {t('nav.games')}
          </Link>
          <a className="transition-colors hover:text-(--text-main)" href="#">
            {t('nav.about')}
          </a>
          <a className="transition-colors hover:text-(--text-main)" href="#">
            {t('nav.parents')}
          </a>
          <a className="transition-colors hover:text-(--text-main)" href="#">
            {t('nav.contacts')}
          </a>
        </nav>

        {!isAuthenticated && (
          <div className="mt-8">
            <ButtonWrapper onClick={openDialog} icon={<ArrowRight />}>
              {t('login')}
            </ButtonWrapper>
          </div>
        )}
      </aside>
    </div>
  );
}
