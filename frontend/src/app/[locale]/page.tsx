'use client';

import { useSession } from 'next-auth/react';
import MainPage from '@/components/main_page';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
  }

  return (
    <div className="min-h-screen">
      <MainPage />
    </div>
  );
}
