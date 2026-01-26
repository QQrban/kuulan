'use client';

import { ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/store/auth';
import { AuthDialog } from '@/components/auth/AuthDialog';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <AuthDialog />
    </div>
  );
}
