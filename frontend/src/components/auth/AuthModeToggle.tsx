'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LogIn, UserPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

type AuthMode = 'login' | 'register';

type AuthModeToggleProps = {
  value: AuthMode;
  onChange: (v: AuthMode) => void;
};

const itemClass =
  'rounded-full h-12 text-sm min-[450px]:text-lg font-semibold transition cursor-pointer ' +
  'data-[state=on]:text-white data-[state=on]:bg-[linear-gradient(135deg,var(--brand-1),var(--brand-2))] ' +
  'data-[state=on]:shadow-[0_10px_24px_rgba(160,91,255,0.25)] ' +
  'data-[state=off]:bg-transparent data-[state=off]:text-(--text-main)';

export function AuthModeToggle({ value, onChange }: AuthModeToggleProps) {
  const t = useTranslations('auth_dialog');

  return (
    <div className="rounded-full items-center justify-center flex bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => v && onChange(v as AuthMode)}
        className="grid grid-cols-2 gap-1 w-full"
      >
        <ToggleGroupItem value="login" className={itemClass} aria-label="Login">
          <LogIn className="h-5 w-5 mr-2" />
          {t('tab_login')}
        </ToggleGroupItem>

        <ToggleGroupItem
          value="register"
          className={itemClass}
          aria-label="Register"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          {t('tab_register')}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
