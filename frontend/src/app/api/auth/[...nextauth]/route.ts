import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log('=== signIn callback ===');
      console.log('Provider:', account?.provider);
      console.log('User:', user);

      if (account?.provider === 'google') {
        try {
          console.log('Sending to backend:', {
            email: user.email,
            name: user.name,
            googleId: account.providerAccountId,
          });

          const res = await fetch(`${process.env.BACKEND_URL}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              googleId: account.providerAccountId,
            }),
          });

          console.log('Backend response status:', res.status);

          if (!res.ok) {
            const errorData = await res.json();
            console.log('Backend error:', errorData);
            return false;
          }

          const data = await res.json();
          console.log('Backend data:', data);

          user.token = data.token;
          user.id = data.user.id;
          user.role = data.user.role;
          user.username = data.user.username;
        } catch (err) {
          console.log('Error:', err);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.role = user.role;
        token.userId = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.role = token.role as string;
      session.user.id = token.userId as string;
      session.user.username = token.username as string;
      return session;
    },
  },
  debug: true, // Включает дополнительные логи
});

export { handler as GET, handler as POST };
