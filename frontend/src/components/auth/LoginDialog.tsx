'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Mail } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from '@/store/auth';
import { useAuthDialog } from '@/store/authDialog';
import InputField from '@/components/auth/InputField';

type LoginForm = {
  email: string;
  password: string;
};

export function LoginDialog() {
  const t = useTranslations('auth_dialog');
  const setAuth = useAuth((s) => s.setAuth);
  const setOpen = useAuthDialog((s) => s.setOpen);
  const locale = useLocale();

  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  const showError = (name: keyof LoginForm) =>
    submitCount > 0 && !!errors[name];

  const onSubmit = async (values: LoginForm) => {
    setServerError('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': locale,
          },
          body: JSON.stringify({
            email: values.email.trim().toLowerCase(),
            password: values.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setServerError(String(data.message));
        return;
      }

      setAuth(data.user, data.token);
      setOpen(false);
    } catch {}
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label={t('email_label')}
        icon={<Mail className="h-5 w-5" />}
        hint={showError('email') ? errors.email?.message : undefined}
        error={showError('email')}
      >
        <Input
          type="email"
          placeholder={t('email_placeholder')}
          {...register('email', {
            required: t('validation_required'),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('validation_invalid_email'),
            },
          })}
        />
      </InputField>

      <InputField
        label={t('password_label')}
        icon={<Lock className="h-5 w-5" />}
        hint={showError('password') ? errors.password?.message : undefined}
        error={showError('password')}
      >
        <Input
          type="password"
          placeholder="••••••••"
          {...register('password', {
            required: t('validation_required'),
          })}
        />
      </InputField>

      {serverError && (
        <div className="text-sm font-semibold text-red-500">{serverError}</div>
      )}

      <Button
        className="w-full py-6 text-sm sm:text-base text-white
                   bg-[linear-gradient(135deg,var(--brand-1),var(--brand-2))]
                   shadow-[0_14px_28px_rgba(160,91,255,0.22)]"
        variant="brand"
        type="submit"
        disabled={isSubmitting}
      >
        {t('submit_login')}
      </Button>
    </form>
  );
}
