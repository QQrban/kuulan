'use client';

import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAuthDialog } from '@/store/authDialog';
import { Lock, Mail, User, X } from 'lucide-react';
import googleIcon from '@/../public/icons/google.svg';
import Image from 'next/image';
import { AuthModeToggle } from '@/components/auth/AuthModeToggle';
import { useTranslations } from 'next-intl';

function Field({
  label,
  icon,
  hint,
  children,
}: {
  label: string;
  icon: ReactNode;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-(--text-main)">{label}</span>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[color-mix(in_oklab,var(--brand-1)_70%,white)]">
          {icon}
        </span>
        {children}
      </div>

      {hint && (
        <span className="text-[13px] text-(--text-muted) leading-snug">
          {hint}
        </span>
      )}
    </label>
  );
}

export function AuthDialog() {
  const t = useTranslations('auth_dialog');

  const isOpen = useAuthDialog((s) => s.isOpen);
  const setOpen = useAuthDialog((s) => s.setOpen);

  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        className="p-5 sm:max-w-120 rounded-3xl border-2
                   bg-[color-mix(in_oklab,var(--brand-1)_6%,white)]
                   border-[color-mix(in_oklab,var(--brand-1)_22%,white)]"
      >
        <DialogClose asChild>
          <button
            type="button"
            aria-label="Close"
            className="group absolute right-2 top-2 z-50 grid h-10 w-10 place-items-center rounded-full bg-white/60 transition cursor-pointer hover:bg-(--brand-1)"
          >
            <X className="h-6 w-6 text-(--brand-1) transition-colors group-hover:text-white" />
          </button>
        </DialogClose>

        <form className="grid gap-4">
          <DialogHeader className="relative">
            <DialogTitle className="text-center text-xl sm:text-2xl font-extrabold tracking-tight text-(--brand-1)">
              {mode === 'login' ? t('title_login') : t('title_register')}
            </DialogTitle>
          </DialogHeader>

          <AuthModeToggle value={mode} onChange={setMode} />

          <div className="grid gap-4">
            <Field label={t('email_label')} icon={<Mail className="h-5 w-5" />}>
              <Input
                type="email"
                placeholder={t('email_placeholder')}
                className="pl-12 h-12 text-sm sm:text-base"
                autoComplete="email"
              />
            </Field>

            {mode === 'register' && (
              <Field
                label={t('username_label')}
                icon={<User className="h-5 w-5" />}
                hint={t('username_hint')}
              >
                <Input
                  type="text"
                  placeholder={t('username_placeholder')}
                  className="pl-12 h-12 text-sm sm:text-base"
                  autoComplete="username"
                />
              </Field>
            )}

            <Field
              label={t('password_label')}
              icon={<Lock className="h-5 w-5" />}
              hint={mode === 'register' ? t('password_hint') : undefined}
            >
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-12 h-12 text-sm sm:text-base"
                autoComplete={
                  mode === 'login' ? 'current-password' : 'new-password'
                }
              />
            </Field>
          </div>

          <Button
            type="submit"
            variant="brand"
            className="w-full py-6 text-sm sm:text-base text-white bg-[linear-gradient(135deg,var(--brand-1),var(--brand-2))] shadow-[0_14px_28px_rgba(160,91,255,0.22)]"
          >
            {mode === 'login' ? t('submit_login') : t('submit_register')}
          </Button>

          <div className="flex items-center gap-3 text-(--text-muted) py-1">
            <div className="h-px flex-1 bg-[color-mix(in_oklab,var(--brand-1)_18%,white)]" />
            <span className="text-sm font-semibold">{t('divider_or')}</span>
            <div className="h-px flex-1 bg-[color-mix(in_oklab,var(--brand-1)_18%,white)]" />
          </div>

          <Button
            type="button"
            variant="white"
            className="w-full py-6 justify-center text-(--text-main) text-sm sm:text-base"
          >
            <span className="mr-2 inline-flex h-5 w-5 shrink-0 items-center justify-center">
              <Image
                src={googleIcon}
                alt="Google"
                width={20}
                height={20}
                className="shrink-0"
              />
            </span>
            {t('google_continue')}
          </Button>

          <button
            type="button"
            className="text-sm font-semibold text-[color-mix(in_oklab,var(--brand-1)_80%,var(--brand-2))] underline underline-offset-4"
          >
            {t('forgot_password')}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
