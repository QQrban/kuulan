'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import MobileMenu from '@/components/header/MobileMenu';
import { ArrowRight, Menu } from 'lucide-react';
import { LanguageSwitcher } from '@/components/header/LanguageSwitcher';
import { ButtonWrapper } from '@/components/ui/ButtonWrapper';
import Logo from '@/components/shared/Logo';
import { useAuthDialog } from '@/store/authDialog';
import { useAuth } from '@/store/auth';
import { ProfileDropDown } from '@/components/header/ProfileDropDown';
import NavLinks from '@/components/header/NavLinks';

export default function Header() {
  const t = useTranslations('header');
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = useAuthDialog((s) => s.open);

  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-(--header-bg) shadow-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2">
          <Logo />

          <div className="hidden md:block">
            <NavLinks />
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <LanguageSwitcher />
                <ProfileDropDown />
              </>
            ) : (
              <>
                <div className="hidden md:block">
                  <LanguageSwitcher />
                </div>
                <div className="hidden md:block">
                  <ButtonWrapper onClick={openDialog} icon={<ArrowRight />}>
                    {t('login')}
                  </ButtonWrapper>
                </div>
                <div className="block md:hidden">
                  <LanguageSwitcher />
                </div>
              </>
            )}
            {!isAuthenticated && (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-(--text-main) transition-colors hover:bg-(--header-bg) md:hidden"
                aria-label="Open menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
              >
                <Menu strokeWidth={3} size={30} className="text-(--brand-1)" />
              </button>
            )}
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
