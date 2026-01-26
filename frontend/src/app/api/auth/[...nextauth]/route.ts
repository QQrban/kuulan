import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const cookieStore = await cookies();
      const locale = cookieStore.get('NEXT_LOCALE')?.value ?? 'en';

      if (account?.provider === 'google') {
        try {
          const res = await fetch(
            `${process.env.BACKEND_URL}/api/auth/google`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                googleId: account.providerAccountId,
                locale,
              }),
            }
          );

          if (!res.ok) {
            const errorData = await res.json();
            console.log('Backend error:', errorData);
            return false;
          }

          const data = await res.json();

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
  debug: true,
});

export { handler as GET, handler as POST };
