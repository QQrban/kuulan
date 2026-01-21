'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Button from '../Button';
import logo from '../../../public/kuulan.svg';
import MobileMenu from '@/components/header/MobileMenu';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaArrowRight } from 'react-icons/fa';
import { LanguageSwitcher } from '@/components/header/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('header');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-(--header-bg) shadow-[0_6px_20px_rgba(48,35,73,0.12)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="w-15">
              <Image src={logo} alt="logo" />
            </div>
            <span className="text-3xl font-semibold tracking-tight text-(--brand-1)">
              Kuulan
            </span>
          </div>

          <nav className="hidden items-center gap-7 lg:gap-10 text-base font-medium text-(--text-muted) md:flex">
            <a className="transition-colors hover:text-(--text-main)" href="#">
              {t('nav.games')}
            </a>
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

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <div className="hidden md:block">
              <Button label={t('login')} icon={<FaArrowRight />} />
            </div>
            <div className="block md:hidden">
              <LanguageSwitcher />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-(--text-main) transition-colors hover:bg-(--header-bg) md:hidden"
              aria-label="Open menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(true)}
            >
              <GiHamburgerMenu size={30} className="text-(--brand-1)" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
