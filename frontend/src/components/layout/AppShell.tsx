'use client';

import { AuthDialog } from '@/components/auth/AuthDialog';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/store/auth';
import { useSession } from 'next-auth/react';

export default function AppShell({ children }: { children: ReactNode }) {
  const initAuth = useAuth((s) => s.initAuth);
  const setAuth = useAuth((s) => s.setAuth);
  const { data: session } = useSession();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (session?.accessToken && session?.user) {
      const user = {
        id: session.user.id || '',
        email: session.user.email || '',
        username: session.user.username || session.user.name || '',
        role: session.user.role || 'FREE',
      };
      setAuth(user, session.accessToken);
    }
  }, [session, setAuth]);

  return (
    <>
      {children}
      <AuthDialog />
    </>
  );
}
