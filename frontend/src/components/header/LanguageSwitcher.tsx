'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', label: 'English', flag: '/icons/flag-en.svg' },
  { code: 'ru', label: 'Русский', flag: '/icons/flag-ru.svg' },
  { code: 'ee', label: 'Eesti', flag: '/icons/flag-ee.svg' },
];

const LOCALES_RE = /^\/(en|ru|ee)(?=\/|$)/;

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.match(LOCALES_RE)?.[1] ?? 'en';
  const currentLang =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  const switchLanguage = (locale: string) => {
    const nextPath = LOCALES_RE.test(pathname)
      ? pathname.replace(LOCALES_RE, `/${locale}`)
      : `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
    router.push(nextPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 shrink-0">
          <Image
            src={currentLang.flag}
            alt={currentLang.label}
            width={30}
            height={14}
          />
          <span className="hidden lg:inline">{currentLang.label}</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`flex items-center gap-2 ${
              lang.code === currentLocale ? 'bg-accent' : ''
            }`}
          >
            <Image src={lang.flag} alt={lang.label} width={20} height={14} />
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
