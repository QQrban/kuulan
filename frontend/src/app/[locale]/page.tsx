'use client';

import { signIn, useSession } from 'next-auth/react';
import Header from '../../components/header/Header';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p>Вы не авторизованы</p>
        <button onClick={() => signIn('google')}>Войти через Google</button>
      </main>
    </div>
  );
}
