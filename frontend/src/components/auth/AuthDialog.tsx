'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuthDialog } from '@/store/authDialog';
import { AuthModeToggle } from '@/components/auth/AuthModeToggle';
import { LoginDialog } from '@/components/auth/LoginDialog';
import { RegisterDialog } from '@/components/auth/RegisterDialog';
import { Button } from '@/components/ui/button';
import googleIcon from '@/../public/icons/google.svg';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

type AuthMode = 'login' | 'register';

export function AuthDialog() {
  const t = useTranslations('auth_dialog');
  const isOpen = useAuthDialog((s) => s.isOpen);
  const setOpen = useAuthDialog((s) => s.setOpen);

  const [mode, setMode] = useState<AuthMode>('login');

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

        <DialogHeader>
          <DialogTitle className="text-center text-xl sm:text-2xl font-extrabold tracking-tight text-(--brand-1)">
            {mode === 'login' ? t('title_login') : t('title_register')}
          </DialogTitle>
        </DialogHeader>

        <AuthModeToggle value={mode} onChange={setMode} />

        {mode === 'login' ? <LoginDialog /> : <RegisterDialog />}

        <div className="flex items-center gap-3 text-(--text-muted) py-1">
          <div className="h-px flex-1 bg-[color-mix(in_oklab,var(--brand-1)_18%,white)]" />
          <span className="text-sm font-semibold">{t('divider_or')}</span>
          <div className="h-px flex-1 bg-[color-mix(in_oklab,var(--brand-1)_18%,white)]" />
        </div>

        <Button
          type="button"
          variant="white"
          className="w-full py-6 justify-center text-(--text-main) text-sm sm:text-base"
          onClick={() => signIn('google')}
        >
          <span className="mr-2 inline-flex h-5 w-5 shrink-0 items-center justify-center">
            <Image src={googleIcon} alt="Google" width={20} height={20} />
          </span>
          {t('google_continue')}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
