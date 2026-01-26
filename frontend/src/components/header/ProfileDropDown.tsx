'use client';

import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/store/auth';
import noAvatar from '@/../public/avatars/animal-coelho-rabbit-svgrepo-com.svg';
import {
  Gamepad2,
  Heart,
  LogOut,
  Settings,
  Trophy,
  User as UserIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function ProfileDropDown() {
  const { user, logout } = useAuth();
  const t = useTranslations('profile_menu');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="grid place-items-center rounded-full border-2 border-(--brand-2)/60 bg-[linear-gradient(135deg,var(--brand-1),var(--brand-2))] p-1 cursor-pointer">
          <Image src={noAvatar} width={50} height={50} alt="avatar" />
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        alignOffset={2}
        className="w-80 rounded-2xl border border-black/10 p-0 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
      >
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center gap-4 p-5">
            <span className="grid place-items-center rounded-full bg-[linear-gradient(135deg,var(--brand-1),var(--brand-2))] p-1 shrink-0">
              <Image
                src={noAvatar}
                width={45}
                height={45}
                alt="avatar"
                className="rounded-full bg-white"
              />
            </span>

            <div className="min-w-0">
              <div className="text-lg font-extrabold text-(--text-main) truncate">
                <div className="text-lg font-extrabold text-(--text-main)">
                  {user?.username}
                </div>
              </div>
              <div className="text-sm text-(--text-muted) truncate">
                {user?.email ?? ''}
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-0 mx-0" />

        <DropdownMenuGroup className="p-2">
          <DropdownMenuItem
            asChild
            className="h-12 rounded-xl px-4 gap-3 cursor-pointer"
          >
            <Link href="/games" className="flex items-center gap-3 w-full">
              <Gamepad2 className="h-5 w-5 text-(--brand-1)" />
              <span className="text-base">{t('play')}!</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="h-12 rounded-xl px-4 gap-3 cursor-pointer">
            <UserIcon className="h-5 w-5 text-(--accent-green)" />
            <span className="text-base">{t('my_profile')}</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="h-12 rounded-xl px-4 gap-3 cursor-pointer">
            <Heart className="h-5 w-5 text-destructive" />
            <span className="text-base">{t('my_games')}</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="h-12 rounded-xl px-4 gap-3 cursor-pointer">
            <Trophy className="h-5 w-5 text-chart-5" />
            <span className="text-base">{t('achievements')}</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="h-12 rounded-xl px-4 gap-3 cursor-pointer">
            <Settings className="h-5 w-5 text-(--text-muted)" />
            <span className="text-base">{t('settings')}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-0 mx-0" />

        <div className="p-2">
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              logout();
            }}
            className="h-12 rounded-xl px-4 gap-3 cursor-pointer text-destructive"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-base">{t('logout')}</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
