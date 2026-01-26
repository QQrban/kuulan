'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Mail, User } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from '@/store/auth';
import { useAuthDialog } from '@/store/authDialog';
import InputField from '@/components/auth/InputField';

type RegisterForm = {
  email: string;
  username?: string;
  password: string;
};

export function RegisterDialog() {
  const t = useTranslations('auth_dialog');
  const setAuth = useAuth((s) => s.setAuth);
  const setOpen = useAuthDialog((s) => s.setOpen);

  const [serverError, setServerError] = useState('');
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<RegisterForm>({
    defaultValues: { email: '', username: '', password: '' },
    mode: 'onSubmit',
  });

  const showError = (name: keyof RegisterForm) =>
    submitCount > 0 && !!errors[name];

  const onSubmit = async (values: RegisterForm) => {
    setServerError('');

    const username = values.username?.trim();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': locale,
          },
          body: JSON.stringify({
            email: values.email.trim().toLowerCase(),
            password: values.password,
            ...(username ? { username } : {}),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message);
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
        label={t('username_label')}
        icon={<User className="h-5 w-5" />}
        hint={
          showError('username') ? errors.username?.message : t('username_hint')
        }
        error={showError('username')}
      >
        <Input
          type="text"
          placeholder={t('username_placeholder')}
          {...register('username', {
            validate: (value) => {
              const v = (value ?? '').trim();
              if (!v) return true;
              if (v.length < 4) return t('validation_username_min');
              if (v.length > 20) return t('validation_username_max');
              if (!/^[\p{Script=Latin}\p{Script=Cyrillic}0-9]+$/u.test(v)) {
                return t('validation_username_invalid');
              }
              return true;
            },
          })}
        />
      </InputField>

      <InputField
        label={t('password_label')}
        icon={<Lock className="h-5 w-5" />}
        hint={
          showError('password') ? errors.password?.message : t('password_hint')
        }
        error={showError('password')}
      >
        <Input
          type="password"
          placeholder="••••••••"
          {...register('password', {
            required: t('validation_required'),
            minLength: {
              value: 8,
              message: t('validation_password_min'),
            },
            maxLength: {
              value: 255,
              message: t('validation_password_max'),
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/,
              message: t('validation_password_weak'),
            },
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
        type="submit"
        disabled={isSubmitting}
      >
        {t('submit_register')}
      </Button>
    </form>
  );
}
