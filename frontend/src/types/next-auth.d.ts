import 'next-auth';

declare module 'next-auth' {
  interface User {
    token?: string;
    role?: string;
    username?: string;
  }

  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      role?: string;
      email?: string;
      name?: string;
      username?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    role?: string;
    userId?: string;
    username?: string;
  }
}
