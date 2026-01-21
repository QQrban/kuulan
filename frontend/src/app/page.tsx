'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
        <div>
          <p>Привет, {session.user?.name}</p>
          <p>{session.user?.email}</p>
          <button onClick={() => signOut()}>Выйти</button>
        </div>
    );
  }

  return (
      <div>
        <p>Вы не авторизованы</p>
        <button onClick={() => signIn('google')}>Войти через Google</button>
      </div>
  );
}