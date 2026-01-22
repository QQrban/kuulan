'use client';

import { useSession } from 'next-auth/react';
import Header from '../../components/header/Header';
import MainPage from '@/components/main_page';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <MainPage />
      </main>
    </div>
  );
}

/*<p>Вы не авторизованы</p>*/
/*<button onClick={() => signIn('google')}>Войти через Google</button>*/
