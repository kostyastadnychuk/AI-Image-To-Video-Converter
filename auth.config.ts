import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        },
        role: {
          type: 'number'
        }
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              role: credentials.role ?? 2
            })
          });

          const user = await res.json();

          if (res.ok && user) {
            return user;
          } else {
            throw new Error('Invalid email or password');
          }
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Invalid email or password');
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      console.log('session : ' + session + ' , session.user : ' + session.user )
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 7 days
  },
  jwt: {
    maxAge: 60 * 60 * 24, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  }
} satisfies NextAuthConfig;

export default authConfig;
