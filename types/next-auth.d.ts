import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  type UserSession = DefaultSession['user'] & {
    username: string;
    role: Number;
  };

  interface Session {
    user: UserSession;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
