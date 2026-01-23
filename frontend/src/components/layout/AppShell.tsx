'use client';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { ReactNode } from 'react';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <AuthDialog />
    </>
  );
}
