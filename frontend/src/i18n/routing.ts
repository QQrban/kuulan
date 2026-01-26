import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ee', 'ru'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const { Link, useRouter, usePathname, redirect, getPathname } =
  createNavigation(routing);
