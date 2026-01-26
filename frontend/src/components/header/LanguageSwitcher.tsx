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

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const currentLang =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  const switchLanguage = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 shrink-0">
          <Image
            src={currentLang.flag}
            alt={currentLang.label}
            width={28}
            height={20}
            className="md:hidden"
          />
          <Image
            src={currentLang.flag}
            alt={currentLang.label}
            width={20}
            height={14}
            className="hidden md:block"
          />
          <span className="hidden lg:inline">{currentLang.label}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`flex items-center gap-2 ${lang.code === currentLocale ? 'bg-accent' : ''}`}
          >
            <Image src={lang.flag} alt={lang.label} width={20} height={14} />
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
